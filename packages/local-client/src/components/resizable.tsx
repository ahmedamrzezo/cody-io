import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.css';
import { useEffect, useState } from 'react';

interface ResizableProps {
	direction: 'horizontal' | 'vertical';
	children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({
	direction,
	children,
}: ResizableProps) => {
	const [innerHeight, setInnerHeight] = useState(window.innerHeight);
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);
	const [width, setWidth] = useState(Math.floor(window.innerWidth * 0.75));

	let resizableBoxProps: ResizableBoxProps;

	useEffect(() => {
		let timer: any;
		const listener = () => {
			if (timer) {
				clearTimeout(timer);
			}

			timer = setTimeout(() => {
				setInnerHeight(window.innerHeight);
				setInnerWidth(window.innerWidth);
				if (window.innerWidth * 0.75 < innerWidth) {
					setWidth(Math.floor(window.innerWidth * 0.75));
				}
			}, 100);
		};
		window.addEventListener('resize', listener);

		return () => {
			window.removeEventListener('resize', listener);
		};
	}, []);

	if (direction === 'horizontal') {
		resizableBoxProps = {
			height: Infinity,
			width,
			className: 'resizable-horizontal',
			onResizeStop: (e, data) => {
				setWidth(data.size.width);
			},
			minConstraints: [Math.floor(innerWidth * 0.2), Infinity],
			maxConstraints: [Math.floor(innerWidth * 0.75), Infinity],
			resizeHandles: ['e'],
		};
	} else {
		resizableBoxProps = {
			height: 300,
			width: Infinity,
			minConstraints: [Infinity, 24],
			maxConstraints: [Infinity, Math.floor(innerHeight * 0.9)],
			resizeHandles: ['s'],
		};
	}
	return <ResizableBox {...resizableBoxProps}>{children}</ResizableBox>;
};

export default Resizable;
