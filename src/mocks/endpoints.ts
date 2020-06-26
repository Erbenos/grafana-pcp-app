import { searchEntities, detailEntities, indomEntities } from './responses';
import { SearchEntity, TextResponse } from 'models/endpoints/search';
import { PmApiMetricMetricResponse, PmApiIndomEndpointResponse } from 'models/endpoints/pmapi';

export const querySearchEndpoint = (
  pattern: string,
  entityFlags: SearchEntity,
  limit: number,
  offset: number
): Promise<TextResponse> => {
  return new Promise<TextResponse>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        items: searchEntities.slice(0, limit),
        limit,
        offset,
        total: 25,
      });
    }, 1000);
  });
};

// For now, lets assume this always finds the entity and the entity is always metric name
export const metricFetchEndpoint = (metricId: string): Promise<PmApiMetricMetricResponse> => {
  return new Promise<PmApiMetricMetricResponse>((resolve, reject) => {
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
