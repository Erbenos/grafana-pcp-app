export enum SearchEntity {
  None = 0,
  Metrics = 1 << 0,
  InstanceDomains = 1 << 1,
  Instances = 1 << 2,
  All = Metrics | InstanceDomains | Instances,
}

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