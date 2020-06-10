import { RedisFulltextItemResponse, SearchEntity } from 'actions/types';
import {
  searchEntities,
  detailEntities,
  PmApiMetricEndpointMetricResponse,
  PmApiIndomEndpointResponse,
} from './responses';

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
export const detailFetchEndpoint = (metricId: string): Promise<PmApiMetricEndpointMetricResponse> => {
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
      resolve();
    }, 1000);
  });
};
