import { TrackableStatus, FetchStatus } from '../../shared/state';
import { PmApiSearchResponse } from 'mocks/responses';

export interface ResultData {
  data: PmApiSearchResponse | null;
}

export type ResultDataState = ResultData & TrackableStatus;

export type ResultState = ResultDataState | null;

export const initialState: ResultState = { status: FetchStatus.INIT, data: null };
