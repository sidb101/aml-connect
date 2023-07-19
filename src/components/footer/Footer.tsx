import "./Footer.scss";

export type FooterBtnT = {
	label: string;
	route: string;
};

type FooterT = {
	prevBtn?: FooterBtnT;
	nextBtn?: FooterBtnT;
};

function Footer(props: FooterT) {
	let footerClass: string;

	if (props.prevBtn && props.nextBtn) {
		footerClass = "Footer-both";
	} else if (props.prevBtn) {
		footerClass = "Footer-prev-only";
	} else if (props.nextBtn) {
		footerClass = "Footer-next-only";
	} else {
		footerClass = "";
	}

	return (
		<div className={`footer-content-container ${footerClass}`}>
			{props.prevBtn && <button className={`btn-solid Footer-btn`}>{props.prevBtn.label}</button>}
			{props.nextBtn && <button className={`btn-solid Footer-btn`}>{props.nextBtn.label}</button>}
		</div>
	);
}

export default Footer;
