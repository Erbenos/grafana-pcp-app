import { EntityType } from 'models/endpoints';

export interface BookmarkItem {
  // Is also human readable name
  id: string;
  type: EntityType;
}

export type BookmarksState = BookmarkItem[];

export const initialState: BookmarksState = [];
