import { SearchEntity } from '../components/SearchForm/SearchForm';
import {
  SearchState, SearchAction, CLEAR_SEARCH_HISTORY,
  ADD_BOOKMARK, CLEAR_BOOKMARKS, SearchView, CLEAR_RESULTS, SearchQuery, FetchStatus, QUERY_SEARCH_PENDING, QUERY_SEARCH_SUCCESS, OPEN_DETAIL_PENDING, OPEN_DETAIL_SUCCESS, OPEN_DETAIL_ERROR, QUERY_SEARCH_INIT, OPEN_DETAIL_INIT, SearchResultState, SearchDetailState, QUERY_SEARCH_ERROR
} from '../actions/types';

const initialResult = (): SearchResultState => ({
  status: FetchStatus.INIT,
  items: [],
  pagination: {
    currentPage: 1,
    numberOfPages: 5,
  }
});

const initialQuery = (): SearchQuery => ({
  pattern: '',
  entityFlags: SearchEntity.All,
  pageNum: 1,
});

const initialDetail = (): SearchDetailState => ({
  status: FetchStatus.INIT,
  item: null,
});

const initialState: SearchState = {
  view: SearchView.Index,
  history: [],
  bookmarks: [],
  result: initialResult(),
  query: initialQuery(),
  detail: initialDetail(),
};

const searchReducer = (state = initialState, action: SearchAction): SearchState => {
  switch (action.type) {
    case QUERY_SEARCH_INIT: {
      const query = action.payload;
      const updateSearchHistory = (query: SearchQuery) => {
        return !state.history.some(x => x.pattern === query.pattern &&
                                        x.entityFlags === query.entityFlags) &&
                query.pageNum === 1;
      };
      return {
        ...state,
        query,
        view: SearchView.Search,
        history: updateSearchHistory(query) ? [query, ...state.history] : state.history,
        // TODO: do we really want to reset detail?
        detail: initialDetail(),
      };
    };
    case QUERY_SEARCH_PENDING:
      return {
        ...state,
        result: {
          ...state.result,
          status: FetchStatus.PENDING,
        },
      };
    case QUERY_SEARCH_SUCCESS: {
      const result = action.payload;
      return {
        ...state,
        result: {
          ...result,
          status: FetchStatus.SUCCESS,
        },
      };
    };
    case QUERY_SEARCH_ERROR: {
      return {
        ...state,
        result: {
          ...initialResult(),
          status: FetchStatus.ERROR,
        },
      };
    };
    case CLEAR_SEARCH_HISTORY:
      return {
        ...state,
        history: []
      };
    case ADD_BOOKMARK:
      return {
        ...state,
        bookmarks: [action.payload, ...state.bookmarks],
      };
    case CLEAR_BOOKMARKS:
      return {
        ...state,
        bookmarks: [],
      };
    case OPEN_DETAIL_INIT:
      return {
        ...state,
        view: SearchView.Detail,
      };
    case OPEN_DETAIL_PENDING:
      return {
        ...state,
        detail: {
          ...state.detail,
          status: FetchStatus.PENDING,
        },
      };
    case OPEN_DETAIL_SUCCESS: {
      const item = action.payload;
      return {
        ...state,
        detail: {
          item,
          status: FetchStatus.SUCCESS,
        },
      };
    };
    case OPEN_DETAIL_ERROR:
      return {
        ...state,
        detail: {
          ...state.detail,
          status: FetchStatus.ERROR,
        },
      };
    case CLEAR_RESULTS:
      return {
        ...state,
        result: initialResult(),
        query: initialQuery(),
        view: SearchView.Index,
      };
    default:
      return state;
  }
};

export { searchReducer };
