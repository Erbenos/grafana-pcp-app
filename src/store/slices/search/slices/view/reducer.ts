import { Reducer } from 'redux';
import { ViewState } from './state';
import { ViewAction } from './actions';
import { SET_VIEW } from './types';

const initialState: ViewState = ViewState.Index;

const viewReducer: Reducer<ViewState, ViewAction> = (state, action) => {
  if (state === undefined) {
    return initialState;
  }
  switch (action.type) {
    case SET_VIEW:
      return action.payload;
    default:
      return state;
  }
};

export { viewReducer };
