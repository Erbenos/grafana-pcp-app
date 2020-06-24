import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

import rootReducer from './reducer';
import PmSearchApiService from 'services/PmSearchApiService';
import PmSeriesApiService from 'services/PmSeriesApiService';
import EntityDetailService from 'services/EntityDetailService';
import { getBackendSrv } from '@grafana/runtime';
import { getDatasourceSettings } from 'utils/utils';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface DispatchExtras {
  searchService: PmSearchApiService;
  seriesService: PmSeriesApiService;
  entityService: EntityDetailService;
}

const getServices = async () => {
  const settings = await getDatasourceSettings('PCP Redis');
  const backendSrv = getBackendSrv();

  const searchService = new PmSearchApiService(settings, backendSrv);
  const seriesService = new PmSeriesApiService(settings, backendSrv);
  const entityService = new EntityDetailService(searchService, seriesService);
  return { searchService, seriesService, entityService };
};

const initStore = async () => {
  const services = await getServices();
  const middleware = thunk.withExtraArgument(services);
  const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(middleware)));
  const persistor = persistStore(store);
  return { store, persistor };
};

export { initStore };
