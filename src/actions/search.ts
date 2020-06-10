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
  OPEN_DETAIL_SUCCESS,
  OPEN_DETAIL_ERROR,
  EntityType,
  MetricData,
  SearchResultData,
} from './types';
import { querySearchEndpoint, detailFetchEndpoint, indomFetchEndpoint } from '../mocks/endpoints';

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
    const result: SearchResultData = {
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

const openDetail = (
  id: string,
  type: EntityType = EntityType.Metric
): ThunkAction<Promise<void>, {}, {}, OpenDetailAction> => async (
  dispatch: ThunkDispatch<{}, {}, OpenDetailAction>
): Promise<void> => {
  dispatch({ type: OPEN_DETAIL_INIT });
  dispatch({ type: OPEN_DETAIL_PENDING });

  try {
    switch (type) {
      case EntityType.Metric: {
        const metric = await detailFetchEndpoint(id);
        const payload: MetricData = {
          type: EntityType.Metric,
          metric,
        };
        if (metric.indom) {
          const indom = await indomFetchEndpoint(metric.indom);
          payload.indom = indom;
        }
        dispatch({
          type: OPEN_DETAIL_SUCCESS,
          payload,
        });
        break;
      }
      default: {
        dispatch({ type: OPEN_DETAIL_ERROR });
      }
    }
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
