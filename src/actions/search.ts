import {
  ClearSeachHistoryAction, CLEAR_SEARCH_HISTORY, QUERY_SEARCH, QuerySearchAction,
  SearchQuery,
  EntityType,
  AddBookmarkAction,
  ADD_BOOKMARK,
  ClearBookmarksAction,
  CLEAR_BOOKMARKS,
  ClearResultsAction,
  CLEAR_RESULTS,
  OPEN_DETAIL,
  BookmarkItem
} from './types';
import _ from 'lodash';
import { _genMatchingName } from 'utils/utils';

// TODO: this will be async fetch
const querySearch = (query: SearchQuery): QuerySearchAction => {
  // TODO: fetch data from Redis
  const testData = [...Array(4)].map((x, i) => ({
      entityId: `id-${i}`,
      name: `${_genMatchingName(query.pattern)}`,
      type: EntityType.Metric,
      indom: '0',
      oneline: 'helptext oneline',
      helptext: 'helptext multiline',
    })
  );
  return {
    type: QUERY_SEARCH,
    payload: {
      query,
      result: {
        items: testData,
        pagination: {
          currentPage: query.pageNum ?? 1,
          numberOfPages: 5,
        },
      },
    },
  };
};

const clearSearchHistory = (): ClearSeachHistoryAction => {
  return {
    type: CLEAR_SEARCH_HISTORY,
  };
};

const addBookmark = (item: BookmarkItem): AddBookmarkAction => {
  return {
    type: ADD_BOOKMARK,
    payload: item,
  };
};

const clearBookmarks = (): ClearBookmarksAction => {
  return {
    type: CLEAR_BOOKMARKS,
  };
};

const clearResults = (): ClearResultsAction => {
  return {
    type: CLEAR_RESULTS,
  };
};

const openDetail = (entityId: string) => {
  // TODO: this will be async fetch
  const testData = {
    entityId: `entityId`,
    name: `${_genMatchingName('')}`,
    type: EntityType.Metric,
    indom: '0',
    oneline: 'helptext oneline',
    helptext: 'helptext multiline',
  };
  return {
    type: OPEN_DETAIL,
    payload: testData,
  };
};

export { querySearch, clearSearchHistory, addBookmark, clearBookmarks, clearResults, openDetail };
