import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  SearchQuery,
  EntityType,
  LoadMetricAction,
  LOAD_METRIC_INIT,
  LOAD_METRIC_PENDING,
  LOAD_METRIC_SUCCESS,
  LOAD_METRIC_ERROR,
  LoadMetricIndomAction,
  LOAD_METRIC_INDOM_INIT,
  LOAD_METRIC_INDOM_PENDING,
  LOAD_METRIC_INDOM_SUCCESS,
  LOAD_METRIC_INDOM_ERROR,
  LoadIndomAction,
  LOAD_INDOM_INIT,
  LOAD_INDOM_PENDING,
  LOAD_INDOM_SUCCESS,
  LOAD_INDOM_ERROR,
  BookmarkItem,
  AddBookmarkAction,
  ADD_BOOKMARK,
  ClearBookmarksAction,
  CLEAR_BOOKMARKS,
  ClearResultsAction,
  CLEAR_RESULTS,
  CLEAR_HISTORY,
  ClearHistoryAction,
  LoadResultAction,
  LOAD_RESULT_INIT,
  LOAD_RESULT_PENDING,
  ResultData,
  LOAD_RESULT_SUCCESS,
  LOAD_RESULT_ERROR,
  SET_VIEW,
  ViewState,
  SwitchViewAction,
  ADD_HISTORY,
  HistoryAction,
  ViewAction,
  EntityAction,
  SET_QUERY,
  SetQueryAction,
} from './types';
import { metricFetchEndpoint, indomFetchEndpoint, querySearchEndpoint } from '../mocks/endpoints';
import { PmApiMetricEndpointMetricResponse, PmApiIndomEndpointResponse } from '../mocks/responses';
import { store } from 'store/store';

const querySearch = (
  query: SearchQuery
): ThunkAction<Promise<void>, {}, {}, LoadResultAction | SwitchViewAction | HistoryAction | SetQueryAction> => async (
  dispatch: ThunkDispatch<{}, {}, LoadResultAction | SwitchViewAction | HistoryAction | SetQueryAction>
): Promise<void> => {
  dispatch({
    type: SET_VIEW,
    payload: ViewState.Search,
  });
  dispatch({
    type: LOAD_RESULT_INIT,
  });

  const limit = 5;
  const offset = (query.pageNum - 1) * limit;

  dispatch({
    type: SET_QUERY,
    payload: query,
  });

  try {
    dispatch({
      type: LOAD_RESULT_PENDING,
    });
    const { pattern, entityFlags } = query;
    const response = await querySearchEndpoint(pattern, entityFlags, limit, offset);
    const result: ResultData = {
      data: {
        items: response,
        // TODO: probably should be a part of response
        pagination: {
          currentPage: query.pageNum,
          numberOfPages: 5,
        },
      },
    };
    dispatch({
      type: LOAD_RESULT_SUCCESS,
      payload: result,
    });
  } catch {
    dispatch({
      type: LOAD_RESULT_ERROR,
    });
    return;
  }

  // Now check if we should update search history
  if (query.pageNum === 1) {
    const { history } = store.getState().search;
    if (!history.some(record => record.pattern === query.pattern && record.entityFlags === query.entityFlags)) {
      dispatch({
        type: ADD_HISTORY,
        payload: query,
      });
    }
  }
};

const openDetail = (
  id: string,
  type: EntityType = EntityType.Metric
): ThunkAction<Promise<void>, {}, {}, EntityAction | ViewAction> => async (
  dispatch: ThunkDispatch<{}, {}, EntityAction | ViewAction>
): Promise<void> => {
  dispatch({
    type: SET_VIEW,
    payload: ViewState.Detail,
  });
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

const openIndex = (): SwitchViewAction => {
  return { type: SET_VIEW, payload: ViewState.Index };
};

const clearSearchHistory = (): ClearHistoryAction => {
  return { type: CLEAR_HISTORY };
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

export { querySearch, clearSearchHistory, openIndex, addBookmark, clearBookmarks, clearResults, openDetail };
