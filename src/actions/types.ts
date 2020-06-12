import { PmApiMetricEndpointMetricResponse, PmApiIndomEndpointResponse } from 'mocks/responses';

export const ADD_BOOKMARK = 'CREATE_BOOKMARK';

export const CLEAR_BOOKMARKS = 'CLEAR_BOOKMARKS';

export const CLEAR_SEARCH_HISTORY = 'CLEAR_SEARCH_HISTORY';

export const OPEN_DETAIL = 'OPEN_DETAIL';

export const QUERY_SEARCH_INIT = 'QUERY_SEARCH_INIT';

export const QUERY_SEARCH_PENDING = 'QUERY_SEARCH_PENDING';

export const QUERY_SEARCH_SUCCESS = 'QUERY_SEARCH_SUCCESS';

export const QUERY_SEARCH_ERROR = 'QUERY_SEARCH_ERROR';

export const LOAD_METRIC_INIT = 'LOAD_METRIC_INIT';

export const LOAD_METRIC_PENDING = 'LOAD_METRIC_PENDING';

export const LOAD_METRIC_SUCCESS = 'LOAD_METRIC_SUCCESS';

export const LOAD_METRIC_ERROR = 'LOAD_METRIC_ERROR';

export const LOAD_INDOM_INIT = 'LOAD_INDOM_INIT';

export const LOAD_INDOM_PENDING = 'LOAD_INDOM_PENDING';

export const LOAD_INDOM_SUCCESS = 'LOAD_INDOM_SUCCESS';

export const LOAD_INDOM_ERROR = 'LOAD_INDOM_ERROR';

export const LOAD_METRIC_INDOM_INIT = 'LOAD_METRIC_INDOM_INIT';

export const LOAD_METRIC_INDOM_PENDING = 'LOAD_METRIC_INDOM_PENDING';

export const LOAD_METRIC_INDOM_SUCCESS = 'LOAD_METRIC_INDOM_SUCCESS';

export const LOAD_METRIC_INDOM_ERROR = 'LOAD_METRIC_INDOM_ERROR';

export const CLEAR_RESULTS = 'CLEAR_RESULTS';

export enum SearchView {
  Detail,
  Search,
  Index,
}

export interface AddBookmarkAction {
  type: typeof ADD_BOOKMARK;
  payload: BookmarkItem;
}

export interface ClearBookmarksAction {
  type: typeof CLEAR_BOOKMARKS;
}

export interface BookmarksState {
  items: RedisFulltextItemResponse[];
}

export interface ClearSeachHistoryAction {
  type: typeof CLEAR_SEARCH_HISTORY;
}

export interface QuerySearchInitAction {
  type: typeof QUERY_SEARCH_INIT;
  payload: SearchQuery;
}

export interface QuerySearchPendingAction {
  type: typeof QUERY_SEARCH_PENDING;
}

export interface QuerySearchSuccessAction {
  type: typeof QUERY_SEARCH_SUCCESS;
  payload: SearchResultData;
}

export interface QuerySearchErrorAction {
  type: typeof QUERY_SEARCH_ERROR;
}

export type QuerySearchAction =
  | QuerySearchInitAction
  | QuerySearchPendingAction
  | QuerySearchSuccessAction
  | QuerySearchErrorAction;

export interface OpenDetailAction {
  type: typeof OPEN_DETAIL;
}

export interface ClearResultsAction {
  type: typeof CLEAR_RESULTS;
}

export interface LoadMetricInitAction {
  type: typeof LOAD_METRIC_INIT;
}

export interface LoadMetricPendingAction {
  type: typeof LOAD_METRIC_PENDING;
}

export interface LoadMetricSuccessAction {
  type: typeof LOAD_METRIC_SUCCESS;
  payload: MetricData;
}

export interface LoadMetricErrorAction {
  type: typeof LOAD_METRIC_ERROR;
}

export type LoadMetricAction =
  | LoadMetricInitAction
  | LoadMetricPendingAction
  | LoadMetricSuccessAction
  | LoadMetricErrorAction;

export interface LoadMetricIndomInitAction {
  type: typeof LOAD_METRIC_INDOM_INIT;
}

export interface LoadMetricIndomPendingAction {
  type: typeof LOAD_METRIC_INDOM_PENDING;
}

export interface LoadMetricIndomSuccessAction {
  type: typeof LOAD_METRIC_INDOM_SUCCESS;
  payload: IndomData;
}

export interface LoadMetricIndomErrorAction {
  type: typeof LOAD_METRIC_INDOM_ERROR;
}

export type LoadMetricIndomAction =
  | LoadMetricIndomInitAction
  | LoadMetricIndomPendingAction
  | LoadMetricIndomSuccessAction
  | LoadMetricIndomErrorAction;

export interface LoadIndomInitAction {
  type: typeof LOAD_INDOM_INIT;
}

export interface LoadIndomPendingAction {
  type: typeof LOAD_INDOM_PENDING;
}

export interface LoadIndomSuccessAction {
  type: typeof LOAD_INDOM_SUCCESS;
  payload: IndomData;
}

export interface LoadIndomErrorAction {
  type: typeof LOAD_INDOM_ERROR;
}

export type LoadIndomAction =
  | LoadIndomInitAction
  | LoadIndomPendingAction
  | LoadIndomSuccessAction
  | LoadIndomErrorAction;

export type SearchAction =
  | ClearBookmarksAction
  | ClearSeachHistoryAction
  | QuerySearchAction
  | OpenDetailAction
  | LoadIndomAction
  | LoadMetricAction
  | LoadMetricIndomAction
  | AddBookmarkAction
  | ClearResultsAction;

export enum EntityType {
  Metric,
  Instance,
  InstanceDomain,
}

export interface RedisFulltextItemResponse {
  entityId: string;
  name: string;
  type: EntityType;
  indom: string;
  oneline: string | null;
  helptext: string;
}

export interface BookmarkItem {
  // Is also human readable name
  id: string;
  type: EntityType;
}

export enum FetchStatus {
  INIT,
  PENDING,
  SUCCESS,
  ERROR,
}

export interface SearchResultData {
  items: RedisFulltextItemResponse[];
  pagination: {
    currentPage: number;
    numberOfPages: number;
  };
}

export interface SearchResult extends TrackableStatus {
  data: SearchResultData | null;
}

export interface MetricDetailState {
  type: EntityType.Metric;
  metric: MetricDataState;
  indom?: IndomDataState;
}

export interface InstanceDetailState {
  type: EntityType.Instance;
}

export interface InstanceDomainDetailState {
  type: EntityType.InstanceDomain;
  indom: IndomDataState;
}

export type MetricDataState = MetricData & TrackableStatus;

export type IndomDataState = IndomData & TrackableStatus;

export interface MetricData {
  data: PmApiMetricEndpointMetricResponse | null;
}

export interface IndomData {
  data: PmApiIndomEndpointResponse | null;
}

export type DetailState = MetricDetailState | InstanceDetailState | InstanceDomainDetailState | null;

export interface TrackableStatus {
  status: FetchStatus;
}

export interface SearchState {
  view: SearchView;
  query: SearchQuery;
  history: SearchQuery[];
  result: SearchResult;
  bookmarks: BookmarkItem[];
  entity: DetailState;
}

export enum SearchEntity {
  None = 0,
  Metrics = 1 << 0,
  InstanceDomains = 1 << 1,
  Instances = 1 << 2,
  All = Metrics | InstanceDomains | Instances,
}

export interface SearchQuery {
  pattern: string;
  entityFlags: SearchEntity;
  pageNum: number;
}
