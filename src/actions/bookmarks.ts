import { ADD_BOOKMARK, CLEAR_BOOKMARKS, AddBookmarkAction, ClearBookmarksAction } from './types';

const addBookmark = (entityId: string): AddBookmarkAction => {
  return {
    type: ADD_BOOKMARK,
    payload: entityId,
  };
};

const clearBookmarks = (): ClearBookmarksAction => {
  return {
    type: CLEAR_BOOKMARKS,
  };
};

export { addBookmark, clearBookmarks };
