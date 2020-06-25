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
import { DispatchExtras } from 'store/store';
import { MetricEntity } from 'models/entities/metric';
import { IndomEntity } from 'models/entities/indom';

export const loadMetric = (
  id: string
): ThunkAction<Promise<MetricEntity | null>, {}, DispatchExtras, LoadMetricAction> => async (
  dispatch: ThunkDispatch<{}, {}, LoadMetricAction>,
  {},
  { entityService }
): Promise<MetricEntity | null> => {
  dispatch({ type: LOAD_METRIC_INIT });
  dispatch({ type: LOAD_METRIC_PENDING });
  const data = await entityService.metric(id);
  if (data === null) {
    dispatch({ type: LOAD_METRIC_ERROR });
  } else {
    dispatch({
      type: LOAD_METRIC_SUCCESS,
      payload: {
        data,
      },
    });
  }
  return data;
};

export const loadIndom = (
  id: string
): ThunkAction<Promise<IndomEntity | null>, {}, DispatchExtras, LoadIndomAction> => async (
  dispatch: ThunkDispatch<{}, {}, LoadIndomAction>,
  {},
  {}
): Promise<IndomEntity | null> => {
  dispatch({ type: LOAD_INDOM_INIT });
  dispatch({ type: LOAD_INDOM_PENDING });
  const indom = await indomFetchEndpoint(id);
  if (indom === null) {
    dispatch({ type: LOAD_INDOM_ERROR });
  } else {
    dispatch({
      type: LOAD_INDOM_SUCCESS,
      payload: {
        data: indom,
      },
    });
  }
  return indom;
};
