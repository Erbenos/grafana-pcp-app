import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { LoadMetricAction, LoadIndomAction } from './actions';
import { indomFetchEndpoint } from 'mocks/endpoints';
import {
  LOAD_METRIC_INIT,
  LOAD_METRIC_PENDING,
  LOAD_METRIC_SUCCESS,
  LOAD_METRIC_ERROR,
  LOAD_INDOM_INIT,
  LOAD_INDOM_PENDING,
  LOAD_INDOM_SUCCESS,
  LOAD_INDOM_ERROR,
} from './types';
import { Services } from 'services/services';

export const loadMetric = (id: string): ThunkAction<Promise<void>, {}, Services, LoadMetricAction> => async (
  dispatch: ThunkDispatch<{}, {}, LoadMetricAction>,
  {},
  { entityService }
): Promise<void> => {
  dispatch({ type: LOAD_METRIC_INIT });
  dispatch({ type: LOAD_METRIC_PENDING });
  try {
    const data = await entityService.metric(id);
    dispatch({
      type: LOAD_METRIC_SUCCESS,
      payload: {
        data,
      },
    });
  } catch (e) {
    dispatch({ type: LOAD_METRIC_ERROR });
  }
};

export const loadIndom = (id: string): ThunkAction<Promise<void>, {}, Services, LoadIndomAction> => async (
  dispatch: ThunkDispatch<{}, {}, LoadIndomAction>,
  {},
  {}
): Promise<void> => {
  dispatch({ type: LOAD_INDOM_INIT });
  dispatch({ type: LOAD_INDOM_PENDING });
  try {
    const data = await indomFetchEndpoint(id);
    dispatch({
      type: LOAD_INDOM_SUCCESS,
      payload: {
        data,
      },
    });
  } catch {
    dispatch({ type: LOAD_INDOM_ERROR });
  }
};
