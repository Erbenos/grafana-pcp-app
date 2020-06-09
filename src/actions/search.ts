import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import {
  ClearSeachHistoryAction,
  CLEAR_SEARCH_HISTORY,
  QUERY_SEARCH_INIT,
  AddBookmarkAction,
  ADD_BOOKMARK,
  ClearBookmarksAction,
  CLEAR_BOOKMARKS,
  ClearResultsAction,
  CLEAR_RESULTS,
  OPEN_DETAIL_INIT,
  BookmarkItem,
  SearchQuery,
  QuerySearchAction,
  OpenDetailAction,
  QUERY_SEARCH_PENDING,
  OPEN_DETAIL_PENDING,
  QUERY_SEARCH_ERROR,
  QUERY_SEARCH_SUCCESS,
  SearchResult,
  OPEN_DETAIL_SUCCESS,
  OPEN_DETAIL_ERROR,
} from './types';
import { querySearchEndpoint, detailFetchEndpoint } from '../mocks/endpoints';

const querySearch = (query: SearchQuery): ThunkAction<Promise<void>, {}, {}, QuerySearchAction> => async (
  dispatch: ThunkDispatch<{}, {}, QuerySearchAction>
): Promise<void> => {
  dispatch({
    type: QUERY_SEARCH_INIT,
    payload: query,
  });

  const limit = 5;
  const offset = (query.pageNum - 1) * limit;

  try {
    dispatch({ type: QUERY_SEARCH_PENDING });
    const { pattern, entityFlags } = query;
    const response = await querySearchEndpoint(pattern, entityFlags, limit, offset);
    const result: SearchResult = {
      items: response,
      // TODO: probably should be a part of response
      pagination: {
        currentPage: query.pageNum,
        numberOfPages: 5,
      },
    };
    dispatch({
      type: QUERY_SEARCH_SUCCESS,
      payload: result,
    });
  } catch {
    dispatch({
      type: QUERY_SEARCH_ERROR,
    });
  }
};

const openDetail = (id: string): ThunkAction<Promise<void>, {}, {}, OpenDetailAction> => async (
  dispatch: ThunkDispatch<{}, {}, OpenDetailAction>
): Promise<void> => {
  dispatch({ type: OPEN_DETAIL_INIT });

  try {
    dispatch({ type: OPEN_DETAIL_PENDING });
    const response = await detailFetchEndpoint(id);
    dispatch({
      type: OPEN_DETAIL_SUCCESS,
      payload: response,
    });
  } catch {
    dispatch({ type: OPEN_DETAIL_ERROR });
  }
};

const clearSearchHistory = (): ClearSeachHistoryAction => {
  return { type: CLEAR_SEARCH_HISTORY };
};

const addBookmark = (item: BookmarkItem): AddBookmarkAction => {
  return {
    type: ADD_BOOKMARK,
    payload: item,
  };
};

const clearBookmarks = (): ClearBookmarksAction => {
  return { type: CLEAR_BOOKMARKS };
};

const clearResults = (): ClearResultsAction => {
  return { type: CLEAR_RESULTS };
};

export { querySearch, clearSearchHistory, addBookmark, clearBookmarks, clearResults, openDetail };
