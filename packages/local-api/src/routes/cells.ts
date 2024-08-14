import express from "express";
import path from "path";
import fs from "fs/promises";

interface Cell {
	id: string;
	content: string;
	type: 'code' | 'markdown';
}

interface LocalApiError {
	code: string;
}
const isLocalApiError = (err: any): err is LocalApiError => {
	return typeof err.code === "string";
};

export const createRouter = (filename: string, dir: string) => {
	const router = express.Router();

	router.use(express.json());

	const fullPath = path.join(dir, filename);

	router.get('/cells', async (req, res) => {

		try {
			const cells = await fs.readFile(fullPath, { encoding: "utf-8" });
			
			res.send(JSON.parse(cells));
		} catch (err) {
			if (isLocalApiError(err)) {
				if (err.code === "ENOENT") {
					await fs.writeFile(fullPath, "[]", "utf-8");
					res.send([]);
				}
			} else {
				throw err;
			}
		}
	});

	router.post('/cells', async (req, res) => {
		const { cells }: { cells: Cell[]; } = req.body;

		await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
		res.sendStatus(200);
	});

	return router;
};