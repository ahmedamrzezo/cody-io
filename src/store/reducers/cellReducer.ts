import { produce } from "immer";
import { ActionTypes } from "../action-types";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellsReducerState {
	data: {
		[k: string]: Cell;
	};
	loading: boolean;
	error: string | null;
	order: string[];
}

const initialState: CellsReducerState = {
	data: {},
	loading: false,
	error: null,
	order: [],
};

const cellsReducers = produce((state: CellsReducerState = initialState, action: Action): CellsReducerState => {
	switch (action.type) {
		case ActionTypes.MOVE_CELL: {
			const { id, direction } = action.payload;
			const index = state.order.indexOf(id);
			const targetIndex = direction === 'up' ? index - 1 : index + 1;
			if (targetIndex < 0 || targetIndex > state.order.length - 1) {
				return state;
			}
			state.order[index] = state.order[targetIndex];
			state.order[targetIndex] = id;
			return state;
		}
		case ActionTypes.UPDATE_CELL: {
			const { id, content } = action.payload;
			state.data[id].content = content;
			return state;
		}
		case ActionTypes.DELETE_CELL: {
			const { id } = action.payload;
			state.order = state.order.filter(i => i !== id);
			delete state.data[id];
			return state;
		}
		case ActionTypes.INSERT_CELL_BEFORE: {
			const { id, type } = action.payload;
			const newCell: Cell = {
				id: randomId(),
				content: '',
				type,
			};
			state.data[newCell.id] = newCell;
			if (!id) {
				state.order.push(newCell.id);
				return state;
			}
			const index = state.order.indexOf(id);
			state.order.splice(index, 0, newCell.id);
			return state;
		}
		default: {
			return state;
		}
	}
}, initialState);

const randomId = () => {
	return Math.random().toString(36).substring(2, 5);
};

export default cellsReducers;