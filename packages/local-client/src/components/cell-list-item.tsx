import { Cell } from '../store/cell';
import ActionBar from './action-bar';
import CodeCell from './code-cell';
import TextEditor from './text-editor';

interface CellListItemProps {
	cell: Cell;
}

const CellListItem = ({ cell }: CellListItemProps) => {
	return (
		<div className="cell-list-item">
			<style>
				{`.cell-list-item {
							padding	: 10px;
							border-bottom: 1px solid #333;
						}
						`}
			</style>
			<ActionBar id={cell.id} />
			{cell.type === 'markdown' && <TextEditor cell={cell} />}
			{cell.type === 'code' && <CodeCell cell={cell} />}
		</div>
	);
};

export default CellListItem;
