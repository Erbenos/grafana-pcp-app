import { ADD_BOOKMARK, CLEAR_BOOKMARKS, BookmarksAction, BookmarksState } from '../actions/types';

const initialState: BookmarksState = {
  items: [],
};

const bookmarksReducer = (state = initialState, action: BookmarksAction): BookmarksState => {
  switch (action.type) {
    case ADD_BOOKMARK:
      return {
        items: [action.payload, ...state.items],
      }
    case CLEAR_BOOKMARKS:
      return {
        items: []
      }
    default:
      return state;
  }
};

export { bookmarksReducer };
