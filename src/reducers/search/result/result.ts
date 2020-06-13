import {
  ResultAction,
  ResultState,
  LOAD_RESULT_INIT,
  LOAD_RESULT_PENDING,
  LOAD_RESULT_ERROR,
  LOAD_RESULT_SUCCESS,
  FetchStatus,
} from '../../../actions/types';
import { Reducer } from 'redux';

const initialState: ResultState = { status: FetchStatus.INIT, data: null };

const resultReducer: Reducer<ResultState, ResultAction> = (state, action) => {
  if (state === undefined) {
    return initialState;
  }
  switch (action.type) {
    case LOAD_RESULT_INIT:
      return {
        status: FetchStatus.INIT,
        data: null,
      };
    case LOAD_RESULT_PENDING:
      if (state) {
        return {
          ...state,
          status: FetchStatus.PENDING,
        };
      }
      break;
    case LOAD_RESULT_SUCCESS:
      if (state) {
        return {
          status: FetchStatus.SUCCESS,
          data: action.payload.data,
        };
      }
      break;
    case LOAD_RESULT_ERROR:
      if (state) {
        return {
          status: FetchStatus.ERROR,
          data: null,
        };
      }
      break;
    default:
      return state;
  }
  return state;
};

export { resultReducer };
