import "./Backdrop.scss";
import type { PropsWithChildren, SyntheticEvent } from "react";
import React from "react";

type BackdropProps = {
	clickHandler?: (event?: SyntheticEvent) => void;
};

function Backdrop({ children, clickHandler }: PropsWithChildren<BackdropProps>) {
	const onBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
		// Check if the clicked element is the same as the event handler element
		if (event.target === event.currentTarget) {
			clickHandler?.(event);
		}
	};

	return (
		<div className="Backdrop" onClick={onBackdropClick}>
			{children}
		</div>
	);
}

export default Backdrop;
