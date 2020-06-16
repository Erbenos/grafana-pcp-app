import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { PmApiMetricMetricResponse, PmApiIndomEndpointResponse } from 'mocks/responses';
import { LoadMetricAction, LoadMetricIndomAction, LoadIndomAction } from './actions';
import { metricFetchEndpoint, indomFetchEndpoint } from 'mocks/endpoints';
import {
  LOAD_METRIC_INIT,
  LOAD_METRIC_PENDING,
  LOAD_METRIC_SUCCESS,
  LOAD_METRIC_ERROR,
  LOAD_METRIC_INDOM_INIT,
  LOAD_METRIC_INDOM_PENDING,
  LOAD_METRIC_INDOM_SUCCESS,
  LOAD_METRIC_INDOM_ERROR,
  LOAD_INDOM_INIT,
  LOAD_INDOM_PENDING,
  LOAD_INDOM_SUCCESS,
  LOAD_INDOM_ERROR,
} from './types';

export const loadMetric = (
  id: string
): ThunkAction<Promise<PmApiMetricMetricResponse | null>, {}, {}, LoadMetricAction> => async (
  dispatch: ThunkDispatch<{}, {}, LoadMetricAction>
): Promise<PmApiMetricMetricResponse | null> => {
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

export const loadMetricIndom = (
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

export const loadIndom = (
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
