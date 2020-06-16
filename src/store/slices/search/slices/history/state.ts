import { SearchQuery } from '../../shared/state';

export const historyMax = 10;

export type HistoryState = SearchQuery[];

export const initialState: HistoryState = [];
