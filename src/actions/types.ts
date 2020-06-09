import { PmApiMetricEndpointMetricResponse } from 'mocks/responses';

export const ADD_BOOKMARK = 'CREATE_BOOKMARK';

export const CLEAR_BOOKMARKS = 'CLEAR_BOOKMARKS';

export const CLEAR_SEARCH_HISTORY = 'CLEAR_SEARCH_HISTORY';

export const OPEN_DETAIL_INIT = 'OPEN_DETAIL_INIT';

export const OPEN_DETAIL_PENDING = 'OPEN_DETAIL_PENDING';

export const OPEN_DETAIL_SUCCESS = 'OPEN_DETAIL_SUCCESS';

export const OPEN_DETAIL_ERROR = 'OPEN_DETAIl_ERROR';

export const QUERY_SEARCH_INIT = 'QUERY_SEARCH_INIT';

export const QUERY_SEARCH_PENDING = 'QUERY_SEARCH_PENDING';

export const QUERY_SEARCH_SUCCESS = 'QUERY_SEARCH_SUCCESS';

export const QUERY_SEARCH_ERROR = 'QUERY_SEARCH_ERROR';

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
  items: SearchItemResponse[];
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
  payload: SearchResult;
}

export interface QuerySearchErrorAction {
  type: typeof QUERY_SEARCH_ERROR;
}

export type QuerySearchAction =
  | QuerySearchInitAction
  | QuerySearchPendingAction
  | QuerySearchSuccessAction
  | QuerySearchErrorAction;

export interface OpenDetailInitAction {
  type: typeof OPEN_DETAIL_INIT;
}

export interface OpenDetailPendingAction {
  type: typeof OPEN_DETAIL_PENDING;
}

export interface OpenDetailSuccessAction {
  type: typeof OPEN_DETAIL_SUCCESS;
  payload: PmApiMetricEndpointMetricResponse;
}

export interface OpenDetailErrorAction {
  type: typeof OPEN_DETAIL_ERROR;
}

export interface ClearResultsAction {
  type: typeof CLEAR_RESULTS;
}

export type OpenDetailAction =
  | OpenDetailInitAction
  | OpenDetailPendingAction
  | OpenDetailSuccessAction
  | OpenDetailErrorAction;

export type SearchAction =
  | ClearBookmarksAction
  | ClearSeachHistoryAction
  | QuerySearchAction
  | OpenDetailAction
  | AddBookmarkAction
  | ClearResultsAction;

export enum EntityType {
  Metric,
  Instance,
  InstanceDomain,
}

export interface SearchItemResponse {
  entityId: string;
  name: string;
  type: EntityType;
  indom: string;
  oneline: string | null;
  helptext: string;
  value: string | null;
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

export interface SearchResult {
  items: SearchItemResponse[];
  pagination: {
    currentPage: number;
    numberOfPages: number;
  };
}

export interface SearchResultState extends SearchResult {
  status: FetchStatus;
}

export interface SearchDetailState {
  status: FetchStatus;
  item: PmApiMetricEndpointMetricResponse | null;
}

export interface SearchState {
  view: SearchView;
  query: SearchQuery;
  history: SearchQuery[];
  result: SearchResultState;
  bookmarks: BookmarkItem[];
  detail: SearchDetailState;
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
