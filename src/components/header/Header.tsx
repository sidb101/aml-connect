import "./Header.scss";
import type { PropsWithChildren } from "react";
import React from "react";

type HeaderT = {
	headerTitle?: string;
	className?: string;
};

function Header({ headerTitle = "", className = "", children }: PropsWithChildren<HeaderT>) {
	return (
		<div
			className={
				children
					? `Header_contentContainer--with-btns ${className}`
					: `Header_contentContainer--no-btns ${className}`
			}
		>
			<div className={`main-heading-text`}>{headerTitle}</div>
			{children && <div className={`Header_btnContainer`}>{children}</div>}
		</div>
	);
}

export default Header;
