import "./View.scss";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type ViewProps = {
	header?: ReactNode;
	main?: ReactNode;
	footer?: ReactNode;
};

function View({ header, main, footer }: ViewProps) {
	const [headerHeight, setHeaderHeight] = useState(0);
	const [footerHeight, setFooterHeight] = useState(0);

	// Function to measure and update header and footer heights
	const updateHeights = () => {
		const headerElement = document.getElementById("header");
		const footerElement = document.getElementById("footer");
		setHeaderHeight(headerElement ? headerElement.offsetHeight : 0);
		setFooterHeight(footerElement ? footerElement.offsetHeight : 0);
	};

	useEffect(() => {
		// Call the function on mount and on window resize
		updateHeights();
		window.addEventListener("resize", updateHeights);

		// Cleanup listener
		return () => window.removeEventListener("resize", updateHeights);
	}, []); // Empty dependency array ensures effect runs once on mount

	useEffect(() => {
		// Update heights when header or footer props change
		updateHeights();
	}, [header, footer]); // Dependency array with header and footer props

	return (
		<div className={`xlight-panel View_overallContainer`}>
			{header && (
				<header id="header" className={`View_headerContainer`}>
					{header}
				</header>
			)}
			{main && (
				<main
					className={`View_mainContainer`}
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
				<footer id="footer" className={`View_footerContainer`}>
					{footer}
				</footer>
			)}
		</div>
	);
}

export default View;
