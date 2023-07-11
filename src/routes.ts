/* eslint-disable  @typescript-eslint/naming-convention */
/* eslint-disable spaced-comment */

/*
 * This module would define all the routes used by the application
 * and methods to dynamically create those routes
 */

/**************** SLUGS ****************/
// If you change the slug value, make sure to change the variables which are output of 'useParam()' hook
// in the entire project
export const PROJECT_SLUG = `:projectSlug`;

/********** ROUTE PATTERNS ***********/
export const BASE_ROUTE = "/";

export const PROJECT_BASE_ROUTE = `${BASE_ROUTE}project`;
export const NEW_PROJECT_ROUTE = `${PROJECT_BASE_ROUTE}/new-project`;
export const PROJECT_ROUTE = `${PROJECT_BASE_ROUTE}/${PROJECT_SLUG}`;
export const OVERVIEW_ROUTE = `${PROJECT_ROUTE}/overview`;
export const DATA_HUB_ROUTE = `${PROJECT_ROUTE}/data-hub`;
export const MODEL_CREATION_ROUTE = `${PROJECT_ROUTE}/model-creation`;
export const RESULTS_ROUTE = `${PROJECT_ROUTE}/results`;
export const SEND_TO_HARDWARE_ROUTE = `${PROJECT_ROUTE}/send-to-hardware`;

/*********** DYNAMIC ROUTES ************/
export const projectOverviewRoute = (projectSlug: string) => OVERVIEW_ROUTE.replace(PROJECT_SLUG, projectSlug);
export const dataHubRoute = (projectSlug: string) => DATA_HUB_ROUTE.replace(PROJECT_SLUG, projectSlug);
export const modelCreationRoute = (projectSlug: string) => MODEL_CREATION_ROUTE.replace(PROJECT_SLUG, projectSlug);
export const resultsRoute = (projectSlug: string) => RESULTS_ROUTE.replace(PROJECT_SLUG, projectSlug);
export const sendToHardwareRoute = (projectSlug: string) => SEND_TO_HARDWARE_ROUTE.replace(PROJECT_SLUG, projectSlug);
