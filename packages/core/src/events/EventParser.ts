import { Coder, Idl } from '@project-serum/anchor';
import { web3 } from '@project-serum/anchor';
import * as base64 from 'base64-js';
import { eventDiscriminator } from '.';

const LOG_START_INDEX = 'Program log: '.length;

type Event = {
  name: string;
  data: unknown;
};

class LogScanner {
  constructor(public logs: string[]) {}

  next(): string | null {
    if (this.logs.length === 0) {
      return null;
    }
    const l = this.logs[0];
    this.logs = this.logs.slice(1);
    return l;
  }
}

class ExecutionContext {
  stack: string[];

  constructor(log: string) {
    // Assumes the first log in every transaction is an `invoke` log from the
    // runtime.
    const reg = /^Program (.*) invoke.*$/g.exec(log);
    if (reg) {
      const program = reg[1];
      this.stack = [program];
    }
  }

  program(): string {
    return this.stack[this.stack.length - 1];
  }

  push(newProgram: string) {
    this.stack.push(newProgram);
  }

  pop() {
    this.stack.pop();
  }
}
// Deserialized event.
// Stack frame execution context, allowing one to track what program is
// executing for a given log.
export class EventParser {
  private coder: Coder;
  private programId: web3.PublicKey;
  // Maps base64 encoded event discriminator to event name.
  private discriminators: Map<string, string>;

  constructor(coder: Coder, programId: web3.PublicKey, idl: Idl) {
    this.coder = coder;
    this.programId = programId;
    this.discriminators = new Map<string, string>(
      idl.events === undefined
        ? []
        : idl.events.map(e => [
            base64.fromByteArray(eventDiscriminator(e.name)),
            e.name
          ])
    );
  }

  // Each log given, represents an array of messages emitted by
  // a single transaction, which can execute many different programs across
  // CPI boundaries. However, the subscription is only interested in the
  // events emitted by *this* program. In achieving this, we keep track of the
  // program execution context by parsing each log and looking for a CPI
  // `invoke` call. If one exists, we know a new program is executing. So we
  // push the programId onto a stack and switch the program context. This
  // allows us to track, for a given log, which program was executing during
  // its emission, thereby allowing us to know if a given log event was
  // emitted by *this* program. If it was, then we parse the raw string and
  // emit the event if the string matches the event being subscribed to.
  public parseLogs(logs: string[]): Event[] {
    const logScanner = new LogScanner(logs);
    const execution = new ExecutionContext(logScanner.next() as string);
    let log = logScanner.next();
    const events: Event[] = [];
    while (log !== null) {
      const [event, newProgram, didPop] = this.handleLog(execution, log);
      if (event) {
        events.push(event);
      }
      if (newProgram) {
        execution.push(newProgram);
      }
      if (didPop) {
        execution.pop();
        // Skip the "success" log, which always follows the consumed log.
        logScanner.next();
      }
      log = logScanner.next();
    }
    return events;
  }

  // Main log handler. Returns a three element array of the event, the
  // next program that was invoked for CPI, and a boolean indicating if
  // a program has completed execution (and thus should be popped off the
  // execution stack).
  private handleLog(
    execution: ExecutionContext,
    log: string
  ): [Event | null, string | null, boolean] {
    // Executing program is this program.
    if (execution.program() === this.programId.toString()) {
      try {
        return this.handleProgramLog(log);
      } catch (e) {
        //it may not be a program event, but normal msg! log, just ignore it
        // console.log(`parse event log (${log}) err: ${e}`, log);
        return [null, null, false];
      }
    }
    // Executing program is not this program.
    else {
      return [null, ...this.handleSystemLog(log)];
    }
  }

  // Handles logs from *this* program.
  private handleProgramLog(
    log: string
  ): [Event | null, string | null, boolean] {
    // This is a `msg!` log.
    if (log.startsWith('Program log:')) {
      const logStr = log.slice(LOG_START_INDEX);
      const logArr = Buffer.from(base64.toByteArray(logStr));
      const disc = base64.fromByteArray(logArr.slice(0, 8));
      // Only deserialize if the discriminator implies a proper event.
      let event: Event | null = null;
      const eventName = this.discriminators.get(disc);
      if (eventName !== undefined) {
        event = {
          name: eventName,
          data: this.coder.events.decode(eventName, logArr.slice(8))
        };
      }
      return [event, null, false];
    }
    // System log.
    else {
      return [null, ...this.handleSystemLog(log)];
    }
  }

  // Handles logs when the current program being executing is *not* this.
  private handleSystemLog(log: string): [string | null, boolean] {
    // System component.
    const logStart = log.split(':')[0];
    // Recursive call.
    if (logStart.startsWith(`Program ${this.programId.toString()} invoke`)) {
      return [this.programId.toString(), false];
    }
    // Cpi call.
    else if (logStart.includes('invoke')) {
      return ['cpi', false]; // Any string will do.
    } else {
      // Did the program finish executing?
      if (logStart.match(/^Program (.*) consumed .*$/g) !== null) {
        return [null, true];
      }
      return [null, false];
    }
  }
}
