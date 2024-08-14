import { ActionTypes } from "../action-types";
import { Cell, CellType } from "../cell";

export type Direction = 'up' | 'down';

export interface MoveCellAction {
	type: ActionTypes.MOVE_CELL;
	payload: {
		id: string;
		direction: Direction;
	};
}

export interface UpdateCellAction {
	type: ActionTypes.UPDATE_CELL;
	payload: {
		id: string;
		content: string;
	};
}

export interface DeleteCellAction {
	type: ActionTypes.DELETE_CELL;
	payload: {
		id: string;
	};
}

export interface InsertCellBeforeAction {
	type: ActionTypes.INSERT_CELL_BEFORE;
	payload: {
		id: string | null;
		type: CellType;
	};
}

export interface FetchCellsAction {
	type: ActionTypes.FetchCells;
}
export interface FetchCellsSuccessAction {
	type: ActionTypes.FetchCellsSuccess;
	payload: Cell[];
}
export interface FetchCellsFailureAction {
	type: ActionTypes.FetchCellsFailure;
	payload: string;
}

export interface SaveCellsFailureAction {
	type: ActionTypes.SaveCellsFailure;
	payload: string;
}

export type CellAction =
	| MoveCellAction
	| UpdateCellAction
	| DeleteCellAction
	| InsertCellBeforeAction

	| FetchCellsAction
	| FetchCellsSuccessAction
	| FetchCellsFailureAction
	| SaveCellsFailureAction;