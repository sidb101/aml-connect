import "./Footer.scss";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import { testIds } from "../../tests/test-utils";

export type FooterBtnT = {
	label: string;
	route: string;
};

export type FooterBtnGroupT = {
	prevBtn?: FooterBtnT;
	nextBtn?: FooterBtnT;
};

type FooterProps = {
	footerBtnGroup?: FooterBtnGroupT;
	element?: ReactNode;
	className?: string;
};

function Footer({ footerBtnGroup, element, className }: FooterProps) {
	const prevBtn = footerBtnGroup?.prevBtn;
	const nextBtn = footerBtnGroup?.nextBtn;

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
