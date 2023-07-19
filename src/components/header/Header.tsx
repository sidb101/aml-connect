import "./Header.scss";
import type { JSX } from "react";
import React from "react";

type HeaderT = {
	headerTitle?: string;
	element?: JSX.Element | JSX.Element[];
	className?: string;
};

function Header({ headerTitle = "", element, className = "" }: HeaderT) {
	return (
		<div className={`Header_contentContainer`}>
			<div className={`Header_gridRow1`}>
				<div className={`main-heading-text`}>{headerTitle}</div>
			</div>
			<div className={`Header_gridRow2`}>{element && <div className={`${className}`}>{element}</div>}</div>
		</div>
	);
}

export default Header;
