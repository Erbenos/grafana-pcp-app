import { ADD_BOOKMARK, CLEAR_BOOKMARKS, REMOVE_BOOKMARK } from './types';
import { BookmarkItem } from './state';

export interface AddBookmarkAction {
  type: typeof ADD_BOOKMARK;
  payload: BookmarkItem;
}

export interface RemoveBookmarkAction {
  type: typeof REMOVE_BOOKMARK;
  payload: BookmarkItem;
}

export interface ClearBookmarksAction {
  type: typeof CLEAR_BOOKMARKS;
}

export type BookmarksAction = ClearBookmarksAction | AddBookmarkAction | RemoveBookmarkAction;
