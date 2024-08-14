import { Command } from "commander";
import { serve } from "@cody-io/local-api";
import path from "path";

interface LocalApiError {
	code: string;
}

const isProduction = process.env.NODE_ENV === "production";
const useProxy = !isProduction;

export const serveCommand = new Command()
	.command("serve [filename]")
	.description("Starts the local API server")
	.option("-p, --port <number>", "Port to listen on", "4050")
	.action(async (filename = 'cody-notes.js', options: { port: string; }) => {

		const isLocalApiError = (err: any): err is LocalApiError => {
			return typeof err.code === "string";
		};

		try {
			const dir = path.join(process.cwd(), path.dirname(filename));
			await serve(+options.port, path.basename(filename), dir, useProxy);
			console.log(`Opened ${filename} on port ${options.port}, Navigate to http://localhost:${options.port}/`);
		} catch (err: any) {
			if (isLocalApiError(err)) {
				if (err.code === "EADDRINUSE") {
					console.error("Port is in use. Try running on a different port.");
				}
			} else if (err instanceof Error) {
				console.log("Heres the problem", err.message);
			}
			process.exit(1);

		}
	});

