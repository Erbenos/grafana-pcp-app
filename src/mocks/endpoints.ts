import { SearchItemResponse, SearchEntity } from 'actions/types';
import { entities } from './responses';

export const querySearchEndpoint = (
  pattern: string,
  entityFlags: SearchEntity,
  limit: number,
  offset: number
): Promise<Array<SearchItemResponse>> => {
  return new Promise<Array<SearchItemResponse>>((resolve, reject) => {
    setTimeout(() => {
      resolve(entities.slice(0, 5));
    }, 2000);
  });
};

// For now, lets assume this always finds the entity
export const detailFetchEndpoint = (entityId: string): Promise<SearchItemResponse> => {
  return new Promise<SearchItemResponse>((resolve, reject) => {
    setTimeout(() => {
      resolve(entities.find(x => x.entityId === entityId));
    }, 2000);
  });
};
