import { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { useParams } from "react-router-dom";
import { generalActions } from "../../redux/slices/GeneralSlice";

export type ResultsPageT = {
	data?: string;
};

const ResultsPage = (props: ResultsPageT) => {
	const dispatch = useAppDispatch();
	const { projectSlug } = useParams();

	useEffect(() => {
		projectSlug
			? dispatch(generalActions.openProject(projectSlug))
			: console.error("projectSlug not present in the URL.");
	}, [projectSlug]);
	return (
		<>
			<h1>ResultsPage</h1>
		</>
	);
};

export default ResultsPage;
