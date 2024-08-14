import { useEffect } from 'react';
import useActions from '../hooks/use-actions';
import useTypedSelector from '../hooks/use-typed-selector';
import AddCell from './add-cell';
import CellListItem from './cell-list-item';

const CellList = () => {
	const cells = useTypedSelector(({ cells }) =>
		cells.order.map((id) => cells.data[id]),
	);

	const { fetchCells, saveCells } = useActions();

	useEffect(() => {
		fetchCells();
	}, []);

	return (
		<>
			<div className="cell-list">
				<style>
					{`.cell-list {
							display: flex;
							flex-direction: column;
							height: 100%;
							width: 100%;
							overflow: auto;
							row-gap: 30px;
							margin-bottom: 30px;
						}
						`}
				</style>
				{cells.map((cell) => (
					<CellListItem key={cell.id} cell={cell} />
				))}
			</div>
			<AddCell cellId={null} />
		</>
	);
};

export default CellList;
