import { BookmarksState, BookmarksAction, ADD_BOOKMARK, CLEAR_BOOKMARKS } from '../../../actions/types';
import { Reducer } from 'redux';

const initialState: BookmarksState = [];

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
