import { produce } from "immer";
import { ActionTypes } from "../action-types";
import { Action } from "../actions";

interface BundlesState {
	[id: string]: {
		loading: boolean;
		code: string;
		error: string | null;
	};
}

const initialState: BundlesState = {};

const bundlesReducer = produce((state: BundlesState = initialState, action: Action): BundlesState => {
	switch (action.type) {
		case ActionTypes.BUNDLE_START: {
			const { cellId } = action.payload;
			state[cellId] = {
				loading: true,
				code: '',
				error: null,
			};
			return state;
		}
		case ActionTypes.BUNDLE_END: {
			const { cellId, bundle } = action.payload;
			state[cellId] = {
				loading: false,
				code: bundle.code,
				error: bundle.error,
			};
			return state;
		}
		default: {
			return state;
		}
	}
}, initialState);

export default bundlesReducer;