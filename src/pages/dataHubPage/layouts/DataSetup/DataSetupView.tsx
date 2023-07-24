import "./DataSetupView.scss";
import React from "react";
import Accordion from "../../../../components/accordion/Accordion";

export type DataSetupViewT = {
	data?: string;
};

const DataSetupView = (props: DataSetupViewT) => {
	return (
		<div className={`DataSetupView_container`}>
			<div className={`DataSetupView_leftContainer`}>
				<Accordion headerElement={<>Training Dataset</>} bodyElement={<h4>Training Body</h4>} />
				<Accordion
					headerElement={<>Validation Dataset</>}
					bodyElement={<h4>Validation Body</h4>}
					defaultIsOpen={false}
				/>
				<Accordion
					headerElement={<>Testing Dataset</>}
					bodyElement={<h4>Testing Body</h4>}
					defaultIsOpen={false}
				/>
			</div>
			<div className={`DataSetupView_rightContainer`}>
				<Accordion headerElement={<>Add or Merge Data</>} bodyElement={<h4>Data Body</h4>} />
				<Accordion headerElement={<>Label Data</>} bodyElement={<h4>Label Body</h4>} defaultIsOpen={false} />
			</div>
		</div>
	);
};

export default DataSetupView;
