import React, { FormEvent, useEffect, useRef, useState } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg';
import fetchPlugin from './plugins/fetch-plugin';

function App() {
	const ref = useRef<esbuild.Service>();
	const [input, setInput] = useState('');
	const [code, setCode] = useState('');

	const startService = async () => {
		ref.current = await esbuild.startService({
			wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
			worker: true,
		});
	};

	useEffect(() => {
		startService();
	}, []);

	const transpile = async (ev: FormEvent<HTMLFormElement>) => {
		ev.preventDefault();

		if (!ref.current) return;

		console.log(ref.current);
		const res = await ref.current.build({
			entryPoints: ['index.js'],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin(), fetchPlugin(input)],
			define: {
				'process.env.NODE_ENV': '"production"',
				global: 'window',
			},
		});

		console.log(res);
		setCode(res.outputFiles[0].text);
	};

	return (
		<React.Fragment>
			<form onSubmit={transpile}>
				<textarea
					defaultValue={'const App = () => <h1>Hi there</h1>; console.log(App)'}
					onChange={(e) => setInput(e.target.value)}></textarea>

				<button type="submit">Submit</button>
			</form>
			<pre>{code}</pre>
		</React.Fragment>
	);
}

export default App;
