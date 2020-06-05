import { SearchEntity } from '../components/SearchForm/SearchForm';
import {
  SearchState, SearchAction, SET_SEARCH,
  ADD_SEARCH_HISTORY, CLEAR_SEARCH_HISTORY, QUERY_SEARCH
} from '../actions/types';

const initialState: SearchState = {
  history: [],
  result: {
    items: [],
    pagination: {
      currentPage: 1,
      numberOfPages: 5,
    }
  },
  query: {
    pattern: '',
    entityFlags: SearchEntity.All, 
  },
};

const searchReducer = (state = initialState, action: SearchAction): SearchState => {
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        query: action.payload,
      };
    case ADD_SEARCH_HISTORY:
      return {
        ...state,
        history: [action.payload, ...state.history],
      };
    case QUERY_SEARCH:
      return {
        ...state,
        result: action.payload,
      };
    case CLEAR_SEARCH_HISTORY:
      return {
        ...state,
        history: []
      };
    default:
      return state;
  }
};

export { searchReducer };
