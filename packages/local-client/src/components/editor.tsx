import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useRef } from 'react';

const CodeEditor = ({
	value,
	onChange,
}: {
	value: string;
	onChange: (value: string) => void;
}) => {
	const editorRef = useRef<editor.IStandaloneCodeEditor>();

	const options: editor.IEditorConstructionOptions = {
		wordWrap: 'on',
		minimap: {
			enabled: false,
		},
		automaticLayout: true,
		scrollbar: {
			vertical: 'hidden',
			horizontal: 'hidden',
		},
	};

	const onEditorMount: EditorDidMount = (getValue, editor) => {
		editorRef.current = editor;

		editor.onDidChangeModelContent(() => {
			onChange(getValue());
		});
	};

	const formatCode = () => {
		const unformattedCode = editorRef.current?.getModel()?.getValue();

		const formatted = prettier
			.format(unformattedCode as string, {
				parser: 'babel',
				plugins: [parser],
				useTabs: true,
				semi: true,
				singleQuote: true,
				tabWidth: 2,
			})
			.replace(/\n$/, '');

		editorRef.current?.setValue(formatted);
	};

	return (
		<div className="editor-wrapper">
			<style>
				{`
			.editor-wrapper {
				position: relative;
				height: 100%;
			}
			.format-button {
				position: absolute;
				top: 10px;
				right: 10px;
				opacity: 0.3;
				z-index: 1
			}
			.format-button:hover {
				opacity:1;
			}
			`}
			</style>
			<button
				title="Format code"
				type="button"
				className="format-button"
				onClick={formatCode}>
				<i className="fas fa-broom"></i>
			</button>
			<MonacoEditor
				editorDidMount={onEditorMount}
				value={value}
				options={options}
				theme="dark"
				language="javascript"
			/>
		</div>
	);
};

export default CodeEditor;
