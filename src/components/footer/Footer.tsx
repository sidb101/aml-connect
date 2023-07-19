import "./Footer.scss";
import type { JSX } from "react";
import { projectOverviewRoute } from "../../routes";
import { testIds } from "../../tests/test-utils";
import { Link } from "react-router-dom";

export type FooterBtnT = {
	label: string;
	route: string;
};

type FooterT = {
	prevBtn?: FooterBtnT;
	nextBtn?: FooterBtnT;
	element?: JSX.Element | JSX.Element[];
};

function Footer({ prevBtn, nextBtn, element }: FooterT) {
	const footerClass =
		prevBtn && nextBtn ? "Footer-both" : prevBtn ? "Footer-prev-only" : nextBtn ? "Footer-next-only" : "";

	return (
		<>
			{element || (
				<div className={`footer-content-container ${footerClass}`}>
					{prevBtn && (
						<Link to={prevBtn.route}>
							<button className={`btn-solid Footer-btn`}>{prevBtn.label}</button>
						</Link>
					)}
					{nextBtn && (
						<Link to={nextBtn.route}>
							<button className={`btn-solid Footer-btn`}>{nextBtn.label}</button>
						</Link>
					)}
				</div>
			)}
		</>
	);
}

export default Footer;
