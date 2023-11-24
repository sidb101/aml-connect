import "./View.scss";
import { type ReactNode, useEffect, useRef, useState } from "react";

type ViewProps = {
	header?: ReactNode;
	main?: ReactNode;
	footer?: ReactNode;
};

function View({ header, main, footer }: ViewProps) {
	const [headerHeight, setHeaderHeight] = useState(0);
	const [footerHeight, setFooterHeight] = useState(0);
	const headerRef = useRef<HTMLHeadingElement>(null);
	const footerRef = useRef<HTMLElement>(null);

	const updateHeights = () => {
		setHeaderHeight(headerRef.current ? headerRef.current.offsetHeight : 0);
		setFooterHeight(footerRef.current ? footerRef.current.offsetHeight : 0);
	};

	useEffect(() => {
		updateHeights();
		window.addEventListener("resize", updateHeights);

		return () => {
			window.removeEventListener("resize", updateHeights);
		};
	}, []);

	useEffect(() => {
		updateHeights();
	}, [header, footer]);

	return (
		<div className="xlight-panel View_overallContainer">
			{header && (
				<header ref={headerRef} className="View_headerContainer">
					{header}
				</header>
			)}
			{main && (
				<main
					id="main"
					className="View_mainContainer"
					style={{
						marginTop: headerHeight,
						marginBottom: footerHeight,
						paddingTop: headerHeight ? 0 : 20,
						paddingBottom: footerHeight ? 0 : 20,
					}}
				>
					{main}
				</main>
			)}
			{footer && (
				<footer ref={footerRef} className="View_footerContainer">
					{footer}
				</footer>
			)}
		</div>
	);
}

export default View;
