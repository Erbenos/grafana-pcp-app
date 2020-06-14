export enum FetchStatus {
  INIT,
  PENDING,
  SUCCESS,
  ERROR,
}

export enum EntityType {
  Metric,
  Instance,
  InstanceDomain,
}

export enum SearchEntity {
  None = 0,
  Metrics = 1 << 0,
  InstanceDomains = 1 << 1,
  Instances = 1 << 2,
  All = Metrics | InstanceDomains | Instances,
}

export interface SearchQuery {
  pattern: string;
  entityFlags: SearchEntity;
  pageNum: number;
}

export interface TrackableStatus {
  status: FetchStatus;
}
