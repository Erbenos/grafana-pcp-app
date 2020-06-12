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
  BookmarkItem,
  SearchQuery,
  QuerySearchAction,
  OpenDetailAction,
  QUERY_SEARCH_PENDING,
  QUERY_SEARCH_ERROR,
  QUERY_SEARCH_SUCCESS,
  EntityType,
  SearchResultData,
  LoadMetricIndomAction,
  LOAD_METRIC_INDOM_INIT,
  LOAD_METRIC_INDOM_PENDING,
  LoadIndomAction,
  LOAD_METRIC_INDOM_ERROR,
  LOAD_INDOM_INIT,
  LOAD_INDOM_PENDING,
  LOAD_INDOM_ERROR,
  LoadMetricAction,
  LOAD_METRIC_INIT,
  LOAD_METRIC_PENDING,
  LOAD_METRIC_SUCCESS,
  LOAD_METRIC_ERROR,
  LOAD_METRIC_INDOM_SUCCESS,
  LOAD_INDOM_SUCCESS,
  OPEN_DETAIL,
} from './types';
import { querySearchEndpoint, indomFetchEndpoint, metricFetchEndpoint } from '../mocks/endpoints';
import { PmApiIndomEndpointResponse, PmApiMetricEndpointMetricResponse } from 'mocks/responses';

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
  dispatch({ type: OPEN_DETAIL });
  switch (type) {
    case EntityType.Metric: {
      dispatch(loadMetric(id)).then(metric => {
        // TODO: maybe fetch only when tab is navigated to?
        if (metric?.indom) {
          dispatch(loadMetricIndom(metric.indom));
        }
      });
      return;
    }
    case EntityType.InstanceDomain: {
      dispatch(loadIndom(id));
    }
  }
};

const loadMetric = (
  id: string
): ThunkAction<Promise<PmApiMetricEndpointMetricResponse | null>, {}, {}, LoadMetricAction> => async (
  dispatch: ThunkDispatch<{}, {}, LoadMetricAction>
): Promise<PmApiMetricEndpointMetricResponse | null> => {
  dispatch({ type: LOAD_METRIC_INIT });
  dispatch({ type: LOAD_METRIC_PENDING });
  try {
    const metric = await metricFetchEndpoint(id);
    dispatch({
      type: LOAD_METRIC_SUCCESS,
      payload: {
        data: metric,
      },
    });
    return metric;
  } catch {
    dispatch({ type: LOAD_METRIC_ERROR });
  }
  return null;
};

const loadMetricIndom = (
  id: string
): ThunkAction<Promise<PmApiIndomEndpointResponse | null>, {}, {}, LoadMetricIndomAction> => async (
  dispatch: ThunkDispatch<{}, {}, LoadMetricIndomAction>
): Promise<PmApiIndomEndpointResponse | null> => {
  dispatch({ type: LOAD_METRIC_INDOM_INIT });
  dispatch({ type: LOAD_METRIC_INDOM_PENDING });
  try {
    const indom = await indomFetchEndpoint(id);
    console.log(indom);
    dispatch({
      type: LOAD_METRIC_INDOM_SUCCESS,
      payload: {
        data: indom,
      },
    });
    return indom;
  } catch {
    dispatch({ type: LOAD_METRIC_INDOM_ERROR });
  }
  return null;
};

const loadIndom = (
  id: string
): ThunkAction<Promise<PmApiIndomEndpointResponse | null>, {}, {}, LoadIndomAction> => async (
  dispatch: ThunkDispatch<{}, {}, LoadIndomAction>
): Promise<PmApiIndomEndpointResponse | null> => {
  dispatch({ type: LOAD_INDOM_INIT });
  dispatch({ type: LOAD_INDOM_PENDING });
  try {
    const indom = await indomFetchEndpoint(id);
    dispatch({
      type: LOAD_INDOM_SUCCESS,
      payload: {
        data: indom,
      },
    });
    return indom;
  } catch {
    dispatch({ type: LOAD_INDOM_ERROR });
  }
  return null;
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
