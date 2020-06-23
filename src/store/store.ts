import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

import rootReducer from './reducer';
import PmSearchApiService, { initializeSearchService } from 'services/PmSearchApiService';
import PmSeriesApiService, { initializeSeriesService } from 'services/PmSeriesApiService';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface DispatchExtras {
  searchService: ReturnType<typeof PmSearchApiService>;
  seriesService: ReturnType<typeof PmSeriesApiService>;
}

const initializeServices = async () => {
  const searchService = await initializeSearchService();
  const seriesService = await initializeSeriesService();
  return { searchService, seriesService };
};

const initStore = async () => {
  const services = await initializeServices();
  const middleware = thunk.withExtraArgument(services);
  const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(middleware)));
  const persistor = persistStore(store);
  return { store, persistor };
};

export { initStore };
