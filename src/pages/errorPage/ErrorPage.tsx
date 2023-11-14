import { Link, useRouteError } from "react-router-dom";
import "./ErrorPage.scss";
import { testIds } from "../../tests/test-utils";
const ErrorPage = () => {
	const routerError: any = useRouteError();
	console.error(routerError);

	return (
		<div className="ErrorPage_container" data-testid={testIds.errorPage}>
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<i>{routerError.statusText || routerError.message}</i>
			</p>
			<p>{routerError.stack}</p>
			<p>
				<Link to={"/"}> Go Back to Home</Link>
			</p>
		</div>
	);
};

export default ErrorPage;
