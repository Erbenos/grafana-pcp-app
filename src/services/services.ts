import { getDatasourceSettings } from 'utils/utils';
import { getBackendSrv } from '@grafana/runtime';
import PmSearchApiService from './PmSearchApiService';
import PmSeriesApiService from './PmSeriesApiService';
import EntityService from './EntityDetailService';

export interface Services {
  searchService: PmSearchApiService;
  seriesService: PmSeriesApiService;
  entityService: EntityService;
}

export const initServices = async (): Promise<Services> => {
  const settings = await getDatasourceSettings('PCP Redis');
  const backendSrv = getBackendSrv();

  const searchService = new PmSearchApiService(settings, backendSrv);
  const seriesService = new PmSeriesApiService(settings, backendSrv);
  const entityService = new EntityService(searchService, seriesService);
  return { searchService, seriesService, entityService };
};
