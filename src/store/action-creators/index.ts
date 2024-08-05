import { Dispatch } from "redux";
import { ActionTypes } from "../action-types";
import { Action, DeleteCellAction, Direction, InsertCellBeforeAction, MoveCellAction, UpdateCellAction } from "../actions";
import { CellType } from "../cell";
import bundle from "../../bundler";

export const updateCell = (id: string, content: string): UpdateCellAction => (
	{ type: ActionTypes.UPDATE_CELL, payload: { id, content } }
);

export const moveCell = (id: string, direction: Direction): MoveCellAction => (
	{ type: ActionTypes.MOVE_CELL, payload: { id, direction } }
);

export const deleteCell = (id: string): DeleteCellAction => (
	{ type: ActionTypes.DELETE_CELL, payload: { id } }
);

export const insertCellBefore = (id: string | null, type: CellType): InsertCellBeforeAction => (
	{ type: ActionTypes.INSERT_CELL_BEFORE, payload: { id, type } }
);

export const createBundle = (cellId: string, code: string) => {
	return async (dispatch: Dispatch<Action>) => {
		dispatch({ type: ActionTypes.BUNDLE_START, payload: { cellId } });

		const res = await bundle(code);

		dispatch({ type: ActionTypes.BUNDLE_END, payload: { cellId, bundle: { code: res.code, error: res.err } } });

	};
};