import { combineReducers } from 'redux';
import { viewReducer } from './view/view';
import { bookmarksReducer } from './bookmarks/bookmarks';
import { entityReducer } from './entity/entity';
import { historyReducer } from './history/history';
import { queryReducer } from './query/query';
import { resultReducer } from './result/result';

const searchReducer = combineReducers({
  bookmarks: bookmarksReducer,
  view: viewReducer,
  entity: entityReducer,
  query: queryReducer,
  history: historyReducer,
  result: resultReducer,
});

export { searchReducer };
