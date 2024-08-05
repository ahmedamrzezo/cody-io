import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
	name: 'filecache'
});

const fetchPlugin = (input: string) => {
	return {
		name: 'fetch-plugin',
		setup(build: esbuild.PluginBuild) {
			build.onLoad({ filter: /(^index\.js$)/ }, () => {
				return {
					loader: 'jsx',
					contents: input,
				};
			});

			build.onLoad({ filter: /.*/ }, async (args: any) => {
				const cached = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

				if (cached) {
					return cached;
				}
				return null;
			});


			build.onLoad({ filter: /.css$/ }, async (args: any) => {
				const { data, request } = await axios.get(args.path);

				const escaped = data
					.replace(/\n/g, '')
					.replace(/"/g, '\\"')
					.replace(/\n/g, "\\'");

				const contents =
					`
						const style = document.createElement('style');
						style.innerText = '${escaped}';
						document.head.appendChild(style);
					`;

				const obj: esbuild.OnLoadResult = {
					loader: 'jsx',
					contents,
					resolveDir: new URL('./', request.responseURL).pathname
				};

				await fileCache.setItem(args.path, obj);
				return obj;
			});
			build.onLoad({ filter: /.*/ }, async (args: any) => {
				const { data, request } = await axios.get(args.path);

				const obj: esbuild.OnLoadResult = {
					loader: 'jsx',
					contents: data,
					resolveDir: new URL('./', request.responseURL).pathname
				};

				await fileCache.setItem(args.path, obj);
				return obj;
			});

		}
	};
};

export default fetchPlugin;