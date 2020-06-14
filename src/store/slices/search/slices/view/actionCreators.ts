import { ViewState } from './state';
import { SetViewAction } from './actions';
import { SET_VIEW } from './types';

export const setView = (view: ViewState): SetViewAction => {
  return { type: SET_VIEW, payload: view };
};
