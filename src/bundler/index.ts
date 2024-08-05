
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from '../plugins/unpkg';
import fetchPlugin from '../plugins/fetch-plugin';

let service: esbuild.Service;

export default async function bundle(rawCode: string): Promise<{ code: string, err: string | null; }> {
	if (!service) {
		service = await esbuild.startService({
			wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
			worker: true,
		});
	};

	try {

		const res = await service.build({
			entryPoints: ['index.js'],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
			define: {
				'process.env.NODE_ENV': '"production"',
				global: 'window',
			},
		});

		return { code: res.outputFiles[0].text, err: null };
	} catch (err) {
		if (err instanceof Error) {
			return { code: '', err: err.message };
		} else {
			throw err;
		}
	}
};