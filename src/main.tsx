import "./main.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { appStore } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider store={appStore}>
			<App />
		</Provider>
	</React.StrictMode>
);
