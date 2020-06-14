import { Reducer } from 'redux';
import { SearchQuery, SearchEntity } from '../../shared/state';
import { QueryState } from './state';
import { QueryAction } from './actions';
import { SET_QUERY, CLEAR_QUERY } from './types';

const initialQuery = (): SearchQuery => ({
  pattern: '',
  entityFlags: SearchEntity.All,
  pageNum: 1,
});

const initialState: SearchQuery = initialQuery();

const queryReducer: Reducer<QueryState, QueryAction> = (state, action) => {
  if (state === undefined) {
    return initialState;
  }
  switch (action.type) {
    case SET_QUERY:
      return action.payload;
    case CLEAR_QUERY:
      return initialQuery();
    default:
      return state;
  }
};

export { queryReducer };
