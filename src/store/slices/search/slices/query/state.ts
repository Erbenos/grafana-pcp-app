import { SearchQuery, SearchEntity } from '../../shared/state';

export type QueryState = SearchQuery;

export const initialQuery = (): SearchQuery => ({
  pattern: '',
  entityFlags: SearchEntity.All,
  pageNum: 1,
});

export const initialState: SearchQuery = initialQuery();
