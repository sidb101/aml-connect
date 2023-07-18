import "./Footer.scss";

type FooterT = {
	prevBtnText: string;
	nextBtnText: string;
};

function Footer(props: FooterT) {
	if (props.prevBtnText !== "" && props.nextBtnText !== "") {
		return FooterWithPrevAndNext(props.prevBtnText, props.nextBtnText);
	} else if (props.prevBtnText !== "") {
		return FooterWithPrevOnly(props.prevBtnText);
	} else if (props.nextBtnText !== "") {
		return FooterWithNextOnly(props.nextBtnText);
	} else {
		return <h1>Something went wrong</h1>;
	}
}

function FooterWithPrevAndNext(prevText: string, nextText: string) {
	return (
		<div className={`footer-content-container Footer-both`}>
			<button className={`btn-solid Footer-btn`}>{prevText}</button>
			<button className={`btn-solid Footer-btn`}>{nextText}</button>
		</div>
	);
}

function FooterWithPrevOnly(prevText: string) {
	return (
		<div className={`footer-content-container Footer-prev-only`}>
			<button className={`btn-solid Footer-btn`}>{prevText}</button>
		</div>
	);
}

function FooterWithNextOnly(nextText: string) {
	return (
		<div className={`footer-content-container Footer-next-only`}>
			<button className={`btn-solid Footer-btn`}>{nextText}</button>
		</div>
	);
}

export default Footer;
