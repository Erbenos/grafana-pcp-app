import { SearchEntity } from 'store/slices/search/shared/state';

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
  type?: SearchEntity;
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

export interface SeriesDescQueryParams {
  series: string[]; // list of series identifiers
  client?: string; // Request identifier sent back with response
}

export interface SeriesDescItemResponse {
  series: string;
  source: string;
  pmid: string;
  indom: string;
  semantics: string;
  type: string;
  units: string;
}

export type SeriesDescResponse = SeriesDescItemResponse[];

export interface SeriesQueryQueryParams {
  expr: string; // Query string in [pmseries](https://pcp.io/man/man1/pmseries.1.html) format
  client?: string; // Request identifier sent back with response
}

export interface SeriesQueryItemResponse {
  series: string;
  instance: string;
  timestamp: number;
  value: string;
}

export type SeriesQueryResponse = string[] | SeriesQueryItemResponse[];

export interface SeriesLabelsQueryParams {
  series?: string[]; // Comma-separated list of series identifiers
  match?: string; // Glob pattern string to match on all labels
  name?: string; // Find all known label values for given name
  names?: string[]; // Comma-separated list of label names
  client?: string; // Request identifier sent back with response
}

export interface SeriesLabelsItemResponse {
  series: string;
  labels: {
    [key: string]: string | number | boolean;
  };
}

export interface SeriesLabelsLabelValuesItemResponse {
  [key: string]: Array<string | number | boolean>;
}

export type SeriesLabelsResponse = string[] | SeriesLabelsItemResponse[] | SeriesLabelsLabelValuesItemResponse;

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
