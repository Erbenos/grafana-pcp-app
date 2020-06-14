import { EntityType, TrackableStatus, FetchStatus } from '../../shared/state';

export interface RedisFulltextItemResponse {
  entityId: string;
  name: string;
  type: EntityType;
  indom: string;
  oneline: string | null;
  helptext: string;
}

export interface SearchData {
  items: RedisFulltextItemResponse[];
  pagination: {
    currentPage: number;
    numberOfPages: number;
  };
}

export interface ResultData {
  data: SearchData | null;
}

export type ResultDataState = ResultData & TrackableStatus;

export type ResultState = ResultDataState | null;

export const initialState: ResultState = { status: FetchStatus.INIT, data: null };
