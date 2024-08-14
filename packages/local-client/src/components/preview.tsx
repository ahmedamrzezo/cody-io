import { useEffect, useRef } from 'react';
import './preview.css';

interface PreviewProps {
	code: string;
	err: string | null;
}

const html = `
	<html>
		<head></head>
		<body>
			<div id="app"></div>
			<script>
				const handleError = (e) => {
					console.error(e);
					const root = document.getElementById('app');
					root.innerHTML = '<div style="color: red">' + e + '</div>';
				};

				window.addEventListener('error', (ev) => {
					ev.preventDefault();
					handleError(ev.error);
				});

				window.addEventListener('message', (ev) => {
					try {
						eval(ev.data);
					} catch (e) {
						handleError(e);
					}
				}, false);
			</script>
		</body>
	</html>`;

const Preview: React.FC<PreviewProps> = ({ code, err }: PreviewProps) => {
	const iframeRef = useRef<any>(null);

	useEffect(() => {
		iframeRef.current.srcdoc = html;
		setTimeout(() => {
			iframeRef.current.contentWindow.postMessage(code, '*');
		}, 50);
	}, [code]);

	return (
		<div className="preview-wrapper">
			<iframe
				ref={iframeRef}
				title="preview"
				sandbox="allow-scripts"
				srcDoc={html}
			/>
			{err && <div className="preview-error">{err}</div>}
		</div>
	);
};

export default Preview;
