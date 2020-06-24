import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { LoadMetricAction, LoadMetricIndomAction, LoadIndomAction } from './actions';
import { indomFetchEndpoint } from 'mocks/endpoints';
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
import { PmApiIndomEndpointResponse } from 'models/endpoints';
import { DispatchExtras } from 'store/store';
import { MetricEntity } from 'services/EntityDetailService';

export const loadMetric = (
  id: string
): ThunkAction<Promise<MetricEntity | null>, {}, DispatchExtras, LoadMetricAction> => async (
  dispatch: ThunkDispatch<{}, {}, LoadMetricAction>,
  {},
  { entityService }
): Promise<MetricEntity | null> => {
  dispatch({ type: LOAD_METRIC_INIT });
  dispatch({ type: LOAD_METRIC_PENDING });
  try {
    const data = await entityService.metric(id);
    if (data !== null) {
      dispatch({
        type: LOAD_METRIC_SUCCESS,
        payload: {
          data,
        },
      });
    } else {
      throw new Error();
    }
    return data;
  } catch {
    dispatch({ type: LOAD_METRIC_ERROR });
  }
  return null;
};

export const loadMetricIndom = (
  id: string
): ThunkAction<Promise<PmApiIndomEndpointResponse | null>, {}, DispatchExtras, LoadMetricIndomAction> => async (
  dispatch: ThunkDispatch<{}, {}, LoadMetricIndomAction>,
  {},
  { seriesService, searchService }
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
): ThunkAction<Promise<PmApiIndomEndpointResponse | null>, {}, DispatchExtras, LoadIndomAction> => async (
  dispatch: ThunkDispatch<{}, {}, LoadIndomAction>,
  {},
  { seriesService, searchService }
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
