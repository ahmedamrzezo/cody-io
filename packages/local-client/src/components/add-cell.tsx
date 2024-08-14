import useActions from '../hooks/use-actions';

interface AddCellProps {
	cellId: string | null;
}

const AddCell = ({ cellId }: AddCellProps) => {
	const { insertCellBefore } = useActions();

	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<button onClick={() => insertCellBefore(cellId, 'markdown')}>Text</button>
			<button onClick={() => insertCellBefore(cellId, 'code')}>Code</button>
		</div>
	);
};

export default AddCell;
