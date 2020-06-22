export enum EntityType {
  Metric,
  Instance,
  InstanceDomain,
}

export interface TextQueryParams {
  query: string;
  highlight?: boolean;
  offset?: number;
  limit?: number;
  field?: TextItemResponseField[];
  return?: TextItemResponseField[];
  type?: EntityType[];
}

export enum TextItemResponseField {
  type = 'type',
  name = 'name',
  indom = 'indom',
  oneline = 'oneline',
  helptext = 'helptext',
}

export interface TextItemResponse {
  id: string; // docId from redisearch
  /* All the ones below may be omited when they are filtered out by ?return param, or whey they lack any value (helptexts for example) */
  name?: string; // name field
  type?: number; // type field (we always have only single type value on any record
  indom?: string; // indom field
  oneline?: string; // oneline field
  helptext?: string; // helptext field
}

export interface TextResponse {
  items: TextItemResponse[];
  limit: number;
  offset: number;
  total: number; // Redisearch returns total number of matching records even if results themselves are limited
}

export interface PmApiLabelsResponse {
  [key: string]: string;
}

export interface PmApiMetricMetricResponse {
  name: string;
  series: string;
  pmid: string;
  type: string;
  indom?: string;
  sem: string;
  units: string;
  labels: PmApiLabelsResponse;
  'text-oneline': string;
  'text-help': string;
}

export interface PmApiMetricEndpointResponse {
  context: number;
  metrics: PmApiMetricMetricResponse[];
}

export interface PmApiIndomEndpointInstanceResponse {
  instance: number;
  name: string;
  labels: PmApiLabelsResponse;
}

export interface PmApiIndomEndpointResponse {
  context: number;
  indom: string;
  labels: PmApiLabelsResponse;
  'text-oneline': string;
  'text-help': string;
  instances: PmApiIndomEndpointInstanceResponse[];
}
