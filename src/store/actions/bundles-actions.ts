import { ActionTypes } from "../action-types";

export interface BundleStartAction {
  type: ActionTypes.BUNDLE_START;
	payload: {
		cellId: string;

	}
}

export interface BundleEndAction {
  type: ActionTypes.BUNDLE_END;
  payload: {
    cellId: string;
    bundle: {
      code: string,
      error: string | null,
    }
  };
}

export type BundleAction =
  | BundleStartAction
  | BundleEndAction;