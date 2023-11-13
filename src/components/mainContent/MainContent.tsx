import "./MainContent_container.scss";
import React, { type PropsWithChildren } from "react";

type MainContentProps = {
	headerHeight: number;
};

function MainContent({ headerHeight, children }: PropsWithChildren<MainContentProps>) {
	return (
		<main className={`MainContent_container`} style={{ marginTop: headerHeight }}>
			{children}
		</main>
	);
}

export default MainContent;
