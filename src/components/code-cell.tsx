import { useEffect } from 'react';
import CodeEditor from './editor';
import Preview from './preview';
import Resizable from './resizable';
import './code-cell.css';
import { Cell } from '../store';
import useActions from '../hooks/use-actions';
import useTypedSelector from '../hooks/use-typed-selector';
import Loading from './loading';

interface CodeCellProps {
	cell: Cell;
}

const CodeCell = ({ cell }: CodeCellProps) => {
	const { updateCell, createBundle } = useActions();
	const bundle = useTypedSelector((state) => state.bundles[cell.id]);

	useEffect(() => {
		if (!bundle) {
			createBundle(cell.id, cell.content);
			return;
		}

		const timeout = setTimeout(async () => {
			createBundle(cell.id, cell.content);
		}, 1000);

		return () => {
			clearTimeout(timeout);
		};
	}, [cell.id, cell.content, createBundle]);

	return (
		<Resizable direction="vertical">
			<div className="code-cell">
				<Resizable direction="horizontal">
					<div className="code-editor">
						<CodeEditor onChange={(value) => updateCell(cell.id, value)} />
					</div>
				</Resizable>
				{!bundle || bundle.loading ? (
					<Loading />
				) : (
					<Preview code={bundle.code} />
				)}
			</div>
		</Resizable>
	);
};

export default CodeCell;
