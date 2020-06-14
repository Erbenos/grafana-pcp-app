import { Reducer } from 'redux';
import { HistoryState } from './state';
import { HistoryAction } from './actions';
import { ADD_HISTORY, CLEAR_HISTORY } from './types';

const initialState: HistoryState = [];

const historyReducer: Reducer<HistoryState, HistoryAction> = (state, action) => {
  if (state === undefined) {
    return initialState;
  }
  switch (action.type) {
    case ADD_HISTORY:
      return [action.payload, ...state];
    case CLEAR_HISTORY:
      return [];
    default:
      return state;
  }
};

export { historyReducer };
