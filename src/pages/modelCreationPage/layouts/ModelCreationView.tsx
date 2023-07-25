import "./ModelCreationView.scss";
import React, { useState } from "react";
import Footer from "../../../components/footer/Footer";
import { dataVizRoute, resultsRoute } from "../../../routes";
import Header from "../../../components/header/Header";
import { invoke } from "@tauri-apps/api/tauri";

export type ModelCreationViewT = {
	title: string;
	projectSlug: string;
};

const ModelCreationView = (props: ModelCreationViewT) => {
	const [components, setComponents] = useState<string>("");

	async function getComponents() {
		if (!components) {
			setComponents(await invoke("get_elements"));
		}
	}

	function clearComponents() {
		setComponents("");
	}

	return (
		<>
			<Header headerTitle={`${props.title}`} />
			<div className={`body-content-container-no-header-btns`}>
				<div>
					{components ? (
						<button className={`btn btn-outline`} onClick={clearComponents}>
							Clear
						</button>
					) : (
						<button className={`btn btn-outline`} onClick={getComponents}>
							Get components
						</button>
					)}
					<div>
						{components && (
							<pre className={`regular-text`}>{JSON.stringify(JSON.parse(components), null, 4)}</pre>
						)}
					</div>
				</div>
			</div>
			<Footer
				prevBtn={{ label: "Data Hub", route: dataVizRoute(props.projectSlug) }}
				nextBtn={{ label: "Results", route: resultsRoute(props.projectSlug) }}
			/>
		</>
	);
};

export default ModelCreationView;
