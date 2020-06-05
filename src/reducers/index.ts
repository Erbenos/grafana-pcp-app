import { combineReducers } from 'redux';
import { bookmarksReducer } from './bookmarks'; 
import { searchReducer } from './search';

const rootReducer = combineReducers({
  bookmarks: bookmarksReducer,
  search: searchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
