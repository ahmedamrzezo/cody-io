export enum ActionTypes {
	MOVE_CELL = 'move_cell',
	UPDATE_CELL = 'update_cell',
	DELETE_CELL = 'delete_cell',
	INSERT_CELL_BEFORE = 'insert_cell_before',

	BUNDLE_START = 'bundle_start',
	BUNDLE_END = 'bundle_end',

	FetchCells = 'fetch_cells',
	FetchCellsSuccess = 'fetch_cells_success',
	FetchCellsFailure = 'fetch_cells_failure',

	SaveCellsFailure = 'save_cells_failure',
}