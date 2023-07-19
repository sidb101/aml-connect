import "./Footer.scss";
import type { JSX } from "react";

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
					{prevBtn && <button className={`btn-solid Footer-btn`}>{prevBtn.label}</button>}
					{nextBtn && <button className={`btn-solid Footer-btn`}>{nextBtn.label}</button>}
				</div>
			)}
		</>
	);
}

export default Footer;
