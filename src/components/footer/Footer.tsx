import "./Footer.scss";
import type { JSX } from "react";
import { projectOverviewRoute } from "../../routes";
import { testIds } from "../../tests/test-utils";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";

export type FooterBtnT = {
	label: string;
	route: string;
};

type FooterT = {
	prevBtn?: FooterBtnT;
	nextBtn?: FooterBtnT;
	element?: JSX.Element | JSX.Element[];
	className?: string;
};

function Footer({ prevBtn, nextBtn, element, className }: FooterT) {
	const footerClass =
		prevBtn && nextBtn ? "Footer___both" : prevBtn ? "Footer___prevOnly" : nextBtn ? "Footer___nextOnly" : "";

	return (
		<div className={`${className || ""}`}>
			{element || (
				<div className={`Footer_contentContainer ${footerClass}`}>
					{prevBtn && (
						<Link to={prevBtn.route}>
							<button className={`btn-solid Footer_btn`}>
								<FontAwesomeIcon className={`icon-left`} icon={faChevronLeft} />
								{prevBtn.label}
							</button>
						</Link>
					)}
					{nextBtn && (
						<Link to={nextBtn.route}>
							<button className={`btn-solid Footer_btn`}>
								{nextBtn.label}
								<FontAwesomeIcon className={`icon-right`} icon={faChevronRight} />
							</button>
						</Link>
					)}
				</div>
			)}
		</div>
	);
}

export default Footer;
