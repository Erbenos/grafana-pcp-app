import { combineReducers } from 'redux';
import { searchReducer } from './search/search';

const rootReducer = combineReducers({
  search: searchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
