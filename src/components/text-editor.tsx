import MDEditor from '@uiw/react-md-editor';
import { useEffect, useRef, useState } from 'react';
import './text-editor.css';
import { Cell } from '../store';
import useActions from '../hooks/use-actions';

interface TextEditorProps {
	cell: Cell;
}

const TextEditor = ({ cell }: TextEditorProps) => {
	const divRef = useRef<HTMLDivElement | null>(null);
	const [editing, setEditing] = useState(false);

	const { updateCell } = useActions();

	useEffect(() => {
		const listener = (event: MouseEvent) => {
			if (
				divRef.current &&
				event.target &&
				divRef.current.contains(event.target as Node)
			) {
				return;
			}
			setEditing(false);
		};

		if (editing) {
			document.addEventListener('click', listener, { capture: true });
		}

		return () => {
			document.removeEventListener('click', listener, { capture: true });
		};
	}, [editing]);

	if (editing) {
		return (
			<div className="text-editor" ref={divRef}>
				<MDEditor
					value={cell.content}
					onChange={(value) => updateCell(cell.id, value || '')}
				/>
			</div>
		);
	}
	return (
		<div onClick={() => setEditing(true)}>
			<MDEditor.Markdown source={cell.content || '# Click to edit'} />
		</div>
	);
};

export default TextEditor;
