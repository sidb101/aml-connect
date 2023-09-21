import "./Footer.scss";
import type { JSX } from "react";
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
							<button className={`btn btn-solid Footer_btn`} data-testid={testIds.prevBtn}>
								<FontAwesomeIcon className={`Footer_iconLeft`} icon={faChevronLeft} />
								{prevBtn.label}
							</button>
						</Link>
					)}
					{nextBtn && (
						<Link to={nextBtn.route}>
							<button className={`btn btn-solid Footer_btn`} data-testid={testIds.nextBtn}>
								{nextBtn.label}
								<FontAwesomeIcon className={`Footer_iconRight`} icon={faChevronRight} />
							</button>
						</Link>
					)}
				</div>
			)}
		</div>
	);
}

export default Footer;
