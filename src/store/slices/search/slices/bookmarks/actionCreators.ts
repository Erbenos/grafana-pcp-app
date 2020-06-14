import { BookmarkItem } from './state';
import { AddBookmarkAction, ClearBookmarksAction } from './actions';
import { ADD_BOOKMARK, CLEAR_BOOKMARKS } from './types';

export const addBookmark = (item: BookmarkItem): AddBookmarkAction => {
  return {
    type: ADD_BOOKMARK,
    payload: item,
  };
};

export const clearBookmarks = (): ClearBookmarksAction => {
  return { type: CLEAR_BOOKMARKS };
};
