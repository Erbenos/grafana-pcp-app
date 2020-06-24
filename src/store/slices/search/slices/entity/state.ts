import { PmApiIndomEndpointResponse, EntityType } from 'models/endpoints';
import { TrackableStatus } from '../../shared/state';
import { MetricEntity } from 'services/EntityDetailService';

export interface MetricData {
  data: MetricEntity | null;
}

export interface IndomData {
  data: PmApiIndomEndpointResponse | null;
}

export type MetricDataState = MetricData & TrackableStatus;

export type IndomDataState = IndomData & TrackableStatus;

export interface MetricDetailState {
  type: EntityType.Metric;
  metric: MetricDataState;
  indom?: IndomDataState;
}

export interface InstanceDetailState {
  type: EntityType.Instance;
}

export interface InstanceDomainDetailState {
  type: EntityType.InstanceDomain;
  indom: IndomDataState;
}

export type EntityState = MetricDetailState | InstanceDetailState | InstanceDomainDetailState | null;

export const initialState: EntityState = null;
