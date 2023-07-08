/* eslint-disable  @typescript-eslint/naming-convention */

/*
 * This module would define all the routes used by the application
 * and methods to dynamically create those routes
 */

export const BASE_ROUTE = "/";
export const PROJECT_BASE_ROUTE = `${BASE_ROUTE}project`;

export const PROJECT_SLUG = `:projectSlug`;
export const PROJECT_ROUTE = `${PROJECT_BASE_ROUTE}/${PROJECT_SLUG}/`;
export const OVERVIEW_ROUTE = PROJECT_ROUTE + "overview/";
export const DATA_HUB_ROUTE = PROJECT_ROUTE + "data-hub/";
export const MODEL_CREATION_ROUTE = PROJECT_ROUTE + "model-creation/";
export const RESULTS_ROUTE = PROJECT_ROUTE + "results/";
export const SEND_TO_HARDWARE_ROUTE = PROJECT_ROUTE + "send-to-hardware/";

export const projectOverviewRoute = (projectSlug: string) => OVERVIEW_ROUTE.replace(PROJECT_SLUG, projectSlug);
