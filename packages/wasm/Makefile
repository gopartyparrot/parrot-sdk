nodejs: #install: cargo install wasm-pack
	wasm-pack build --target nodejs --out-dir lib --release --out-name wasm
	cd lib && rm .gitignore README.md 
optSize: #install wasm-opt: https://github.com/WebAssembly/binaryen/releases
	cd lib && wasm-opt -Oz --output wasm_bg.wasm wasm_bg.wasm 
