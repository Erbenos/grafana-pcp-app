import { EntityType } from '../../shared/state';

export interface BookmarkItem {
  // Is also human readable name
  id: string;
  type: EntityType;
}

export type BookmarksState = BookmarkItem[];
