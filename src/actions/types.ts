import { PmApiMetricEndpointMetricResponse, PmApiIndomEndpointResponse } from 'mocks/responses';

export const ADD_BOOKMARK = 'ADD_BOOKMARK';

export const CLEAR_BOOKMARKS = 'CLEAR_BOOKMARKS';

export const ADD_HISTORY = 'ADD_HISTORY';

export const CLEAR_HISTORY = 'CLEAR_HISTORY';

export const SET_QUERY = 'SET_QUERY';

export const CLEAR_QUERY = 'CLEAR_QUERY';

export const LOAD_RESULT_INIT = 'LOAD_RESULT_INIT';

export const LOAD_RESULT_PENDING = 'LOAD_RESULT_PENDING';

export const LOAD_RESULT_SUCCESS = 'LOAD_RESULT_SUCCESS';

export const LOAD_RESULT_ERROR = 'LOAD_RESULT_ERROR';

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

export const SET_VIEW = 'SET_VIEW';

export enum ViewState {
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

export interface ClearHistoryAction {
  type: typeof CLEAR_HISTORY;
}

export interface LoadResultInitAction {
  type: typeof LOAD_RESULT_INIT;
}

export interface LoadResultPendingAction {
  type: typeof LOAD_RESULT_PENDING;
}

export interface LoadResultSuccessAction {
  type: typeof LOAD_RESULT_SUCCESS;
  payload: ResultData;
}

export interface LoadResultErrorAction {
  type: typeof LOAD_RESULT_ERROR;
}

export interface ClearQueryAction {
  type: typeof CLEAR_QUERY;
}

export interface SetQueryAction {
  type: typeof SET_QUERY;
  payload: SearchQuery;
}

export type LoadResultAction =
  | LoadResultInitAction
  | LoadResultPendingAction
  | LoadResultSuccessAction
  | LoadResultErrorAction;

export interface SwitchViewAction {
  type: typeof SET_VIEW;
  payload: ViewState;
}

export type ViewAction = SwitchViewAction;

export interface AddHistoryAction {
  type: typeof ADD_HISTORY;
  payload: SearchQuery;
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

export type BookmarksAction = ClearBookmarksAction | AddBookmarkAction;

export type EntityAction = LoadMetricAction | LoadMetricIndomAction | LoadIndomAction;

export type HistoryAction = ClearHistoryAction | AddHistoryAction;

export type QueryAction = ClearQueryAction | SetQueryAction;

export type ResultAction = LoadResultAction;

export type SearchAction =
  | ClearBookmarksAction
  | ClearHistoryAction
  | LoadResultAction
  | EntityAction
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

export interface SearchData {
  items: RedisFulltextItemResponse[];
  pagination: {
    currentPage: number;
    numberOfPages: number;
  };
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

export type EntityState = MetricDetailState | InstanceDetailState | InstanceDomainDetailState | null;

export interface TrackableStatus {
  status: FetchStatus;
}

export type BookmarksState = BookmarkItem[];

export type HistoryState = SearchQuery[];

export type QueryState = SearchQuery;

export interface ResultData {
  data: SearchData | null;
}

export type ResultDataState = ResultData & TrackableStatus;

export type ResultState = ResultDataState | null;

export interface SearchState {
  view: ViewState;
  query: QueryState;
  history: HistoryState;
  result: ResultState;
  bookmarks: BookmarksState;
  entity: EntityState;
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
