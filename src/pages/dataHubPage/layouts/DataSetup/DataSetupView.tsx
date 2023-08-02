import "./DataSetupView.scss";
import React, { type JSX } from "react";
import Accordion from "../../../../components/accordion/Accordion";

export type DataSetupViewT = {
	importDataComponent: JSX.Element | JSX.Element[];
};

const DataSetupView = ({ importDataComponent }: DataSetupViewT) => {
	return (
		<div className={`DataSetupView_container`}>
			<div className={`DataSetupView_leftContainer`}>
				<Accordion
					headerElement={<>Training Dataset</>}
					maxHeight={"200px"}
					bodyElement={
						<>
							Training Body
							<br />
							THis occupies
							<br />
							too many
							<br /> new lines
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							<br />
							Last Line
							<br />
						</>
					}
				/>
				<Accordion
					headerElement={<>Validation Dataset</>}
					bodyElement={<h4>Validation Body</h4>}
					maxHeight={"300px"}
					defaultIsOpen={false}
				/>
				<Accordion
					headerElement={<>Testing Dataset</>}
					bodyElement={<h4>Testing Body</h4>}
					defaultIsOpen={false}
				/>
			</div>
			<div className={`DataSetupView_rightContainer`}>
				<Accordion
					headerElement={<div className={`section-heading-text`}>Add or Merge Data</div>}
					bodyElement={importDataComponent}
				/>
				<Accordion headerElement={<>Label Data</>} bodyElement={<h4>Label Body</h4>} defaultIsOpen={false} />
			</div>
		</div>
	);
};

export default DataSetupView;
