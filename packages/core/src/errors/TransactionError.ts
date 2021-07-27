export class TransactionError extends Error {
  code: number;
  txId: string;
  constructor(msg: string, name: string, code: number, txId: string) {
    super(msg);
    this.name = name;
    this.code = code;
    this.txId = txId;
  }
}
