export type CellType = 'code' | 'markdown';

export interface Cell {
	id: string;
	content: string;
	type: CellType;

}