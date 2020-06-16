import { PmApiMetricMetricResponse, PmApiIndomEndpointResponse } from 'mocks/responses';
import { TrackableStatus, EntityType } from '../../shared/state';

export interface MetricData {
  data: PmApiMetricMetricResponse | null;
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
