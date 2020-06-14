import {
  searchEntities,
  detailEntities,
  PmApiMetricEndpointMetricResponse,
  PmApiIndomEndpointResponse,
  indomEntities,
} from './responses';
import { SearchEntity } from 'store/slices/search/shared/state';
import { RedisFulltextItemResponse } from 'store/slices/search/slices/result/state';

export const querySearchEndpoint = (
  pattern: string,
  entityFlags: SearchEntity,
  limit: number,
  offset: number
): Promise<RedisFulltextItemResponse[]> => {
  return new Promise<RedisFulltextItemResponse[]>((resolve, reject) => {
    setTimeout(() => {
      resolve(searchEntities.slice(0, 5));
    }, 1000);
  });
};

// For now, lets assume this always finds the entity and the entity is always metric name
export const metricFetchEndpoint = (metricId: string): Promise<PmApiMetricEndpointMetricResponse> => {
  return new Promise<PmApiMetricEndpointMetricResponse>((resolve, reject) => {
    setTimeout(() => {
      resolve(detailEntities.find(x => x.metrics.some(m => m.name === metricId))?.metrics[0]);
    }, 1000);
  });
};

// Separate endpoint, will be fetched lazily
export const indomFetchEndpoint = (indom: string): Promise<PmApiIndomEndpointResponse> => {
  return new Promise<PmApiIndomEndpointResponse>((resolve, reject) => {
    setTimeout(() => {
      resolve(indomEntities.find(x => x.indom === indom));
    }, 1000);
  });
};
