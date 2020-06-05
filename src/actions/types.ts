export const ADD_BOOKMARK = 'CREATE_BOOKMARK';

export const CLEAR_BOOKMARKS = 'CLEAR_BOOKMARKS';

export interface AddBookmarkAction {
  type: typeof ADD_BOOKMARK,
  payload: string,
};

export interface ClearBookmarksAction {
  type: typeof CLEAR_BOOKMARKS,
};

export interface BookmarksState {
  items: string[],
};

export type BookmarksAction = AddBookmarkAction | ClearBookmarksAction;

export const SET_SEARCH = 'SET_SEARCH';

export const ADD_SEARCH_HISTORY = 'ADD_SEARCH_HISTORY';

export const CLEAR_SEARCH_HISTORY = 'CLEAR_SEARCH_HISTORY';

export const QUERY_SEARCH = 'QUERY_SEARCH';

export interface AddSearchHistoryAction {
  type: typeof ADD_SEARCH_HISTORY,
  payload: SearchQuery,
};

export interface ClearSeachHistoryAction {
  type: typeof CLEAR_SEARCH_HISTORY,
};

export interface QuerySearchAction {
  type: typeof QUERY_SEARCH,
  // TODO: insert response from fulltext search endpoint with pagination info
  payload: SearchResult,
};

export interface SetSearchAction {
  type: typeof SET_SEARCH,
  payload: SearchQuery,
};

export type SearchAction = AddSearchHistoryAction | ClearSeachHistoryAction | SetSearchAction | QuerySearchAction;

// TODO: model of full-text api response
export interface SearchItemResponse {
  entityId: string,
  name: string,
};

export interface SearchResult {
  items: SearchItemResponse[],
  pagination: {
    currentPage: number,
    numberOfPages: number,
  },
};

export interface SearchState {
  query: SearchQuery,
  result: SearchResult,
  history: SearchQuery[],
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
  pageNum?: number,
};
