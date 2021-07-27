wasm

---

share rust code with js

## setup

- `cargo install wasm-pack`
- ~~`cargo install wasm-bindgen-cli`~~


## build for nodejs

- `make nodejs`

use code:
- `node test.js`

*shrink wasm size*
- https://rustwasm.github.io/docs/book/game-of-life/code-size.html
- https://github.com/WebAssembly/binaryen

(about 64k -> 36k)

## references
- https://rustwasm.github.io/docs/wasm-pack/
- https://github.com/rustwasm/wasm-pack

- https://rustwasm.github.io/docs/wasm-bindgen/introduction.html
- https://github.com/rustwasm/wasm-bindgen