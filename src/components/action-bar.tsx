import useActions from '../hooks/use-actions';

interface ActionBarProps {
	id: string;
}

const ActionBar = ({ id }: ActionBarProps) => {
	const { deleteCell, moveCell } = useActions();

	const css = `
        .action-bar {
            background-color: #eee;
						height: 30px;
						display: flex;
						justify-content: end;
        }
        `;

	return (
		<div className="action-bar">
			<style>{css}</style>
			<button onClick={() => moveCell(id, 'up')}>
				<i className="fas fa-arrow-up"></i>
			</button>
			<button onClick={() => moveCell(id, 'down')}>
				<i className="fas fa-arrow-down"></i>
			</button>
			<button onClick={() => deleteCell(id)}>
				<i className="fas fa-trash"></i>
			</button>
		</div>
	);
};

export default ActionBar;
