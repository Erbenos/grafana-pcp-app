import { SearchEntity } from '../components/SearchForm/SearchForm';
import {
  SearchState,
  SearchAction,
  CLEAR_SEARCH_HISTORY,
  ADD_BOOKMARK,
  CLEAR_BOOKMARKS,
  SearchView,
  CLEAR_RESULTS,
  SearchQuery,
  FetchStatus,
  QUERY_SEARCH_PENDING,
  QUERY_SEARCH_SUCCESS,
  QUERY_SEARCH_INIT,
  QUERY_SEARCH_ERROR,
  EntityType,
  SearchResult,
  DetailState,
  LOAD_INDOM_PENDING,
  LOAD_METRIC_INDOM_INIT,
  LOAD_METRIC_INIT,
  LOAD_INDOM_INIT,
  LOAD_INDOM_SUCCESS,
  LOAD_INDOM_ERROR,
  LOAD_METRIC_INDOM_PENDING,
  LOAD_METRIC_INDOM_SUCCESS,
  LOAD_METRIC_INDOM_ERROR,
  LOAD_METRIC_PENDING,
  LOAD_METRIC_SUCCESS,
  LOAD_METRIC_ERROR,
  OPEN_DETAIL,
} from '../actions/types';

const initialResult = (): SearchResult => ({
  status: FetchStatus.INIT,
  data: null,
});

const initialQuery = (): SearchQuery => ({
  pattern: '',
  entityFlags: SearchEntity.All,
  pageNum: 1,
});

const initialEntity = (): DetailState => null;

const initialState: SearchState = {
  view: SearchView.Index,
  history: [],
  bookmarks: [],
  result: initialResult(),
  query: initialQuery(),
  entity: initialEntity(),
};

const searchReducer = (state = initialState, action: SearchAction): SearchState => {
  switch (action.type) {
    case QUERY_SEARCH_INIT: {
      const query = action.payload;
      const updateSearchHistory = (query: SearchQuery) => {
        return (
          !state.history.some(x => x.pattern === query.pattern && x.entityFlags === query.entityFlags) &&
          query.pageNum === 1
        );
      };
      return {
        ...state,
        query,
        view: SearchView.Search,
        history: updateSearchHistory(query) ? [query, ...state.history] : state.history,
        // TODO: do we really want to reset detail?
        entity: initialEntity(),
      };
    }
    case QUERY_SEARCH_PENDING:
      return {
        ...state,
        result: {
          ...state.result,
          status: FetchStatus.PENDING,
        },
      };
    case QUERY_SEARCH_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        result: {
          data,
          status: FetchStatus.SUCCESS,
        },
      };
    }
    case QUERY_SEARCH_ERROR: {
      return {
        ...state,
        result: {
          ...initialResult(),
          status: FetchStatus.ERROR,
        },
      };
    }
    case CLEAR_SEARCH_HISTORY:
      return {
        ...state,
        history: [],
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
      };
    case LOAD_INDOM_INIT:
      return {
        ...state,
        entity: {
          type: EntityType.InstanceDomain,
          indom: {
            status: FetchStatus.INIT,
            data: null,
          },
        },
      };
    case LOAD_INDOM_PENDING:
      if (state.entity && state.entity.type === EntityType.InstanceDomain) {
        return {
          ...state,
          entity: {
            ...state.entity,
            indom: {
              ...state.entity.indom,
              status: FetchStatus.PENDING,
            },
          },
        };
      }
      return state;
    case LOAD_INDOM_SUCCESS:
      if (state.entity && state.entity.type === EntityType.InstanceDomain) {
        return {
          ...state,
          entity: {
            ...state.entity,
            indom: {
              status: FetchStatus.SUCCESS,
              data: action.payload.data,
            },
          },
        };
      }
      return state;
    case LOAD_INDOM_ERROR:
      if (state.entity && state.entity.type === EntityType.InstanceDomain) {
        return {
          ...state,
          entity: {
            ...state.entity,
            indom: {
              status: FetchStatus.ERROR,
              data: null,
            },
          },
        };
      }
      return state;
    case LOAD_METRIC_INDOM_INIT:
      if (state.entity && state.entity.type === EntityType.Metric) {
        return {
          ...state,
          entity: {
            ...state.entity,
            indom: {
              status: FetchStatus.INIT,
              data: null,
            },
          },
        };
      }
      return state;
    case LOAD_METRIC_INDOM_PENDING:
      if (state.entity && state.entity.type === EntityType.Metric && state.entity.indom) {
        return {
          ...state,
          entity: {
            ...state.entity,
            indom: {
              ...state.entity.indom,
              status: FetchStatus.PENDING,
            },
          },
        };
      }
      return state;
    case LOAD_METRIC_INDOM_SUCCESS:
      if (state.entity && state.entity.type === EntityType.Metric && state.entity.indom) {
        return {
          ...state,
          entity: {
            ...state.entity,
            indom: {
              status: FetchStatus.SUCCESS,
              data: action.payload.data,
            },
          },
        };
      }
      return state;
    case LOAD_METRIC_INDOM_ERROR:
      if (state.entity && state.entity.type === EntityType.Metric && state.entity.indom) {
        return {
          ...state,
          entity: {
            ...state.entity,
            indom: {
              status: FetchStatus.ERROR,
              data: null,
            },
          },
        };
      }
      return state;
    case LOAD_METRIC_INIT:
      return {
        ...state,
        entity: {
          type: EntityType.Metric,
          metric: {
            status: FetchStatus.INIT,
            data: null,
          },
        },
      };
    case LOAD_METRIC_PENDING:
      if (state.entity && state.entity.type === EntityType.Metric) {
        return {
          ...state,
          entity: {
            ...state.entity,
            metric: {
              ...state.entity.metric,
              status: FetchStatus.PENDING,
            },
          },
        };
      }
      return state;
    case LOAD_METRIC_SUCCESS:
      if (state.entity && state.entity.type === EntityType.Metric) {
        return {
          ...state,
          entity: {
            ...state.entity,
            metric: {
              status: FetchStatus.SUCCESS,
              data: action.payload.data,
            },
          },
        };
      }
      return state;
    case LOAD_METRIC_ERROR:
      if (state.entity && state.entity.type === EntityType.Metric) {
        return {
          ...state,
          entity: {
            ...state.entity,
            metric: {
              status: FetchStatus.ERROR,
              data: null,
            },
          },
        };
      }
      return {
        ...state,
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
