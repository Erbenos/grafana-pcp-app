export const ADD_BOOKMARK = 'CREATE_BOOKMARK';

export const CLEAR_BOOKMARKS = 'CLEAR_BOOKMARKS';

export const CLEAR_SEARCH_HISTORY = 'CLEAR_SEARCH_HISTORY';

export const OPEN_DETAIL = 'OPEN_DETAIL';

export const QUERY_SEARCH = 'QUERY_SEARCH';

export const CLEAR_RESULTS = 'CLEAR_RESULTS';

export enum SearchView {
  Detail, Search, Index
};

export interface AddBookmarkAction {
  type: typeof ADD_BOOKMARK,
  payload: BookmarkItem,
};

export interface ClearBookmarksAction {
  type: typeof CLEAR_BOOKMARKS,
};

export interface BookmarksState {
  items: SearchItemResponse[],
};

export interface ClearSeachHistoryAction {
  type: typeof CLEAR_SEARCH_HISTORY,
};

export interface SearchQueryResult {
  result: SearchResult,
  query: SearchQuery,
};

export interface QuerySearchAction {
  type: typeof QUERY_SEARCH,
  payload: SearchQueryResult,
};

export interface OpenDetailAction {
  type: typeof OPEN_DETAIL,
  payload: SearchItemResponse,
};

export interface ClearResultsAction {
  type: typeof CLEAR_RESULTS,
};

export type SearchAction =
  ClearSeachHistoryAction | QuerySearchAction |
  ClearBookmarksAction | AddBookmarkAction |
  OpenDetailAction | ClearResultsAction;

export enum EntityType {
  Metric = 0,
  Instance = 1,
  InstanceDomain = 2,
};

export interface SearchItemResponse {
  entityId: string,
  name: string,
  type: EntityType,
  indom: string,
  oneline: string,
  helptext: string,
};

export interface BookmarkItem {
  entityId: string,
  name: string,
  // TODO: type?
};

export interface SearchResult {
  items: SearchItemResponse[],
  pagination: {
    currentPage: number,
    numberOfPages: number,
  },
};

export interface SearchState {
  view: SearchView,
  query: SearchQuery,
  result: SearchResult,
  history: SearchQuery[],
  bookmarks: BookmarkItem[],
  detail: SearchItemResponse | null,
};

export enum SearchEntity {
  None = 0,
  Metrics = 1 << 0,
  InstanceDomains = 1 << 1,
  Instances = 1 << 2,
  All = Metrics | InstanceDomains | Instances,
};

export interface SearchQuery {
  pattern: string,
  entityFlags: SearchEntity,
  pageNum: number,
};
