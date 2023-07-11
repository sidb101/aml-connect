import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { generalActions } from "../../redux/slices/GeneralSlice";
import { useParams } from "react-router-dom";

export type DataSetupPageT = {
	data?: string;
};

const DataSetupPage = (props: DataSetupPageT) => {
	const dispatch = useAppDispatch();
	const { projectSlug } = useParams();
	const generalState = useAppSelector((state) => state.general);

	useEffect(() => {
		projectSlug
			? dispatch(generalActions.openProject(projectSlug))
			: console.error("projectSlug not present in the URL.");
	}, [projectSlug]);
	return (
		<>
			<h1>DataSetupPage</h1>
		</>
	);
};

export default DataSetupPage;
