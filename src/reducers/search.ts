import { SearchEntity } from '../components/SearchForm/SearchForm';
import {
  SearchState, SearchAction, CLEAR_SEARCH_HISTORY, QUERY_SEARCH,
  ADD_BOOKMARK, CLEAR_BOOKMARKS, SearchView, OPEN_DETAIL, CLEAR_RESULTS, SearchQuery, SearchResult
} from '../actions/types';

const initialResult = (): SearchResult => ({
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

const initialState: SearchState = {
  view: SearchView.Index,
  history: [],
  bookmarks: [],
  result: initialResult(),
  query: initialQuery(),
  detail: null,
};

const searchReducer = (state = initialState, action: SearchAction): SearchState => {
  switch (action.type) {
    case QUERY_SEARCH: {
      const { query, result } = action.payload;
      const updateSearchHistory = (query: SearchQuery) => {
        return !state.history.some(x => x.pattern === query.pattern &&
                                        x.entityFlags === query.entityFlags) &&
                query.pageNum === 1;
      };
      return {
        ...state,
        // Set latest query to one just queried
        query,
        // Set results
        result,
        // Set view to display results
        view: SearchView.Search,
        // Update search history if query wasn't queried yet
        history: updateSearchHistory(query) ? [query, ...state.history] : state.history,
      };
    }
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
    case OPEN_DETAIL:
      return {
        ...state,
        view: SearchView.Detail,
        // TODO: since we are not saving anything persistently, for now, just plug in first (which may not be present),
        // this also causes bookmarks to work only for last navigated item
        detail: action.payload,
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
