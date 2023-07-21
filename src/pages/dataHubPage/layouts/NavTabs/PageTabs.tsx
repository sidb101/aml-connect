import "./PageTabs.scss";
import { Link } from "react-router-dom";

export type PageTabsT = {
	pageTabs: PageTabT[];
	selectedTabIndex?: number;
};

export type PageTabT = {
	label: string;
	route: string;
};

/**
 * Method to get the index of selected page tab, based on given pathname and page tabs.
 */
export const getSelectedTabIndex = (pageTabs: PageTabT[], pathname: string): number => {
	return pageTabs.findIndex((pageTab) => pageTab.route === pathname);
};

const PageTabs = ({ pageTabs, selectedTabIndex = -1 }: PageTabsT) => {
	return (
		<div className={`white-panel section-subheading-text grey-text PageTabs_container`}>
			{pageTabs.map((pageTab, index) => (
				<Link to={pageTab.route} key={index}>
					<div className={`PageTabs_tab ${selectedTabIndex == index && "PageTabs_tab___active"}`}>
						<div className={`PageTabs_numCircle`}>{index + 1}</div>
						<div className={`PageTabs_tabLabel`}>{pageTab.label}</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export default PageTabs;
