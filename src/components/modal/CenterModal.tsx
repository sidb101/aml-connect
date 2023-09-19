import "./CenterModal.scss";
import type { PropsWithChildren, ReactNode, SyntheticEvent } from "react";
import Backdrop from "../backdrop/Backdrop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons/faCircleXmark";

export type ModalT = {
	closeOnBackdropClick?: boolean;
	onClose?: () => void;
	headerElement: ReactNode;
	modalWidth?: string;
	modalHeight?: string;
};

/**
 * This will be a panel fixed at the center of the screen. It would be a closable panel.
 */
const CenterModal = ({
	closeOnBackdropClick = true,
	onClose,
	headerElement,
	children,
	modalWidth,
	modalHeight,
}: PropsWithChildren<ModalT>) => {
	return (
		<>
			<Backdrop />
			<div className={`CenterModal_container`} onClick={closeOnBackdropClick ? onClose : undefined}>
				<div className={`white-panel CenterModal_panel`} style={{ width: modalWidth, height: modalHeight }}>
					<div className={`CenterModal_headerContainer`}>
						<div className={`CenterModal_headerElement`}>{headerElement}</div>
						<div className={`CenterModal_closeBtn`} onClick={onClose}>
							<FontAwesomeIcon icon={faCircleXmark} />
						</div>
					</div>
					<div className={`CenterModal_bodyContainer`}>{children}</div>
				</div>
			</div>
		</>
	);
};

export default CenterModal;
