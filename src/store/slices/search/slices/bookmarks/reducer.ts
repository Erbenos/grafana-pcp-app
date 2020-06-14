import { Reducer } from 'redux';
import { BookmarksState, initialState } from './state';
import { BookmarksAction } from './actions';
import { ADD_BOOKMARK, CLEAR_BOOKMARKS } from './types';

const bookmarksReducer: Reducer<BookmarksState, BookmarksAction> = (state, action) => {
  if (state === undefined) {
    return initialState;
  }
  switch (action.type) {
    case ADD_BOOKMARK:
      return [action.payload, ...state];
    case CLEAR_BOOKMARKS:
      return [];
    default:
      return state;
  }
};

export { bookmarksReducer };
