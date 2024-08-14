import { Dispatch, Middleware } from "redux";
import { Action } from "../actions";
import { ActionTypes } from "../action-types";
import { saveCells } from "../action-creators";
import { RootState } from "../reducers";

export const persistMiddleware: Middleware<Dispatch<Action>> = ({ dispatch, getState }: { dispatch: Dispatch<Action>; getState: () => RootState; }) => {
	let timer: any;

	return (next: (action: Action) => void) => {
		return (action: any) => {
			next(action);

			if ([ActionTypes.UPDATE_CELL, ActionTypes.DELETE_CELL, ActionTypes.INSERT_CELL_BEFORE, ActionTypes.MOVE_CELL].includes(action.type)) {
				if (timer) {
					clearTimeout(timer);
				}
				timer = setTimeout(() => {
					saveCells()(dispatch, getState);
				}, 500);
			}
		};
	};

};