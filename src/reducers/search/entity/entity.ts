import {
  EntityAction,
  EntityState,
  EntityType,
  FetchStatus,
  LOAD_METRIC_INIT,
  LOAD_METRIC_SUCCESS,
  LOAD_METRIC_PENDING,
  LOAD_INDOM_INIT,
  LOAD_METRIC_INDOM_INIT,
  LOAD_METRIC_INDOM_PENDING,
  LOAD_INDOM_PENDING,
  LOAD_INDOM_SUCCESS,
  LOAD_INDOM_ERROR,
  LOAD_METRIC_ERROR,
  LOAD_METRIC_INDOM_SUCCESS,
  LOAD_METRIC_INDOM_ERROR,
} from '../../../actions/types';
import { Reducer } from 'redux';

const initialState: EntityState = null;

const entityReducer: Reducer<EntityState, EntityAction> = (state, action) => {
  if (state === undefined) {
    return initialState;
  }
  switch (action.type) {
    case LOAD_METRIC_INIT:
      return {
        type: EntityType.Metric,
        metric: {
          status: FetchStatus.INIT,
          data: null,
        },
      };
    case LOAD_METRIC_PENDING:
      if (state?.type === EntityType.Metric) {
        return {
          ...state,
          metric: {
            ...state.metric,
            status: FetchStatus.PENDING,
          },
        };
      }
      break;
    case LOAD_METRIC_SUCCESS:
      if (state?.type === EntityType.Metric) {
        return {
          ...state,
          metric: {
            status: FetchStatus.SUCCESS,
            data: action.payload.data,
          },
        };
      }
      break;
    case LOAD_METRIC_ERROR:
      if (state?.type === EntityType.Metric) {
        return {
          ...state,
          metric: {
            status: FetchStatus.ERROR,
            data: null,
          },
        };
      }
      break;
    case LOAD_METRIC_INDOM_INIT:
      if (state?.type === EntityType.Metric) {
        return {
          ...state,
          indom: {
            status: FetchStatus.INIT,
            data: null,
          },
        };
      }
      break;
    case LOAD_METRIC_INDOM_PENDING:
      if (state?.type === EntityType.Metric && state.indom) {
        return {
          ...state,
          indom: {
            ...state.indom,
            status: FetchStatus.PENDING,
          },
        };
      }
      break;
    case LOAD_METRIC_INDOM_SUCCESS:
      if (state?.type === EntityType.Metric && state.indom) {
        return {
          ...state,
          indom: {
            status: FetchStatus.SUCCESS,
            data: action.payload.data,
          },
        };
      }
      break;
    case LOAD_METRIC_INDOM_ERROR:
      if (state?.type === EntityType.Metric && state.indom) {
        return {
          ...state,
          indom: {
            status: FetchStatus.ERROR,
            data: null,
          },
        };
      }
      break;
    case LOAD_INDOM_INIT:
      return {
        type: EntityType.InstanceDomain,
        indom: {
          status: FetchStatus.INIT,
          data: null,
        },
      };
    case LOAD_INDOM_PENDING:
      if (state?.type === EntityType.InstanceDomain) {
        return {
          ...state,
          indom: {
            ...state.indom,
            status: FetchStatus.PENDING,
          },
        };
      }
      break;
    case LOAD_INDOM_SUCCESS:
      if (state?.type === EntityType.InstanceDomain) {
        return {
          ...state,
          indom: {
            status: FetchStatus.SUCCESS,
            data: action.payload.data,
          },
        };
      }
      break;
    case LOAD_INDOM_ERROR:
      if (state?.type === EntityType.InstanceDomain) {
        return {
          ...state,
          indom: {
            status: FetchStatus.ERROR,
            data: null,
          },
        };
      }
      break;
  }
  return state;
};

export { entityReducer };
