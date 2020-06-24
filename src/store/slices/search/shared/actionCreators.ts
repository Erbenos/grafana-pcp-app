import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { loadMetric, loadIndom } from '../slices/entity/actionCreators';
import { SearchQuery } from './state';
import { LoadResultAction } from '../slices/result/actions';
import { HistoryAction } from '../slices/history/actions';
import { SetQueryAction } from '../slices/query/actions';
import { SET_VIEW } from '../slices/view/types';
import { ViewState } from '../slices/view/state';
import { LOAD_RESULT_INIT, LOAD_RESULT_PENDING, LOAD_RESULT_SUCCESS, LOAD_RESULT_ERROR } from '../slices/result/types';
import { SET_QUERY } from '../slices/query/types';
import { ResultData } from '../slices/result/state';
import { ADD_HISTORY } from '../slices/history/types';
import { EntityAction } from '../slices/entity/actions';
import { ViewAction, SetViewAction } from '../slices/view/actions';
import { EntityType } from 'models/endpoints';
import { RootState } from 'store/reducer';
import { DispatchExtras } from 'store/store';
import { querySearchEndpoint } from 'mocks/endpoints';

type QuerySearchAction = LoadResultAction | SetViewAction | HistoryAction | SetQueryAction;

export const querySearch = (
  query: SearchQuery
): ThunkAction<Promise<void>, RootState, DispatchExtras, QuerySearchAction> => async (
  dispatch: ThunkDispatch<{}, {}, QuerySearchAction>,
  getState,
  { searchService }
): Promise<void> => {
  dispatch({
    type: SET_VIEW,
    payload: ViewState.Search,
  });
  dispatch({
    type: LOAD_RESULT_INIT,
  });

  const limit = 6;
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
      data: response,
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
    const { history } = getState().search;
    if (!history.some(record => record.pattern === query.pattern && record.entityFlags === query.entityFlags)) {
      dispatch({
        type: ADD_HISTORY,
        payload: query,
      });
    }
  }
};

type OpenDetailAction = EntityAction | ViewAction;

export const openDetail = (
  id: string,
  type: EntityType
): ThunkAction<Promise<void>, {}, DispatchExtras, OpenDetailAction> => async (
  dispatch: ThunkDispatch<{}, DispatchExtras, OpenDetailAction>,
  {},
  extras
): Promise<void> => {
  dispatch({
    type: SET_VIEW,
    payload: ViewState.Detail,
  });
  switch (type) {
    case EntityType.Metric: {
      dispatch(loadMetric(id));
      // .then(metric => {
      //   // TODO: maybe fetch only when tab is navigated to?
      //   if (metric?.indom) {
      //     dispatch(loadMetricIndom(metric.indom));
      //   }
      // });
      return;
    }
    case EntityType.InstanceDomain: {
      dispatch(loadIndom(id));
      return;
    }
  }
};
