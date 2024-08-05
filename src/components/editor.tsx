import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useRef } from 'react';

const CodeEditor = ({ onChange }: { onChange: (value: string) => void }) => {
	const editorRef = useRef<editor.IStandaloneCodeEditor>();

	let doFormat = true;

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
			doFormat = true;
		});

		editor.onMouseLeave(() => {
			if (doFormat) {
				formatCode();
				doFormat = false;
			}
		});
	};

	const formatCode = () => {
		const unformattedCode = editorRef.current?.getModel()?.getValue();

		const formatted = prettier.format(unformattedCode as string, {
			parser: 'babel',
			plugins: [parser],
			useTabs: true,
			semi: true,
			singleQuote: true,
			tabWidth: 2,
		}).replace(/\n$/, '');

		editorRef.current?.setValue(formatted);
	};

	return (
		<MonacoEditor
			editorDidMount={onEditorMount}
			options={options}
			theme="dark"
			language="javascript"
		/>
	);
};

export default CodeEditor;
