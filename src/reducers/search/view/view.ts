import { ViewState, ViewAction, SET_VIEW } from '../../../actions/types';
import { Reducer } from 'redux';

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
