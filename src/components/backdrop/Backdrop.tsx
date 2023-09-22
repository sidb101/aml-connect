import "./Backdrop.scss";
import type { SyntheticEvent } from "react";

export type BackdropT = {
	clickHandler?: (event?: SyntheticEvent) => void;
};

const Backdrop = ({ clickHandler }: BackdropT) => {
	return <div className={`Backdrop`} onClick={clickHandler}></div>;
};

export default Backdrop;
