import { ClearHistoryAction } from './actions';
import { CLEAR_HISTORY } from './types';

export const clearSearchHistory = (): ClearHistoryAction => {
  return { type: CLEAR_HISTORY };
};
