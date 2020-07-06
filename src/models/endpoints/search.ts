export enum SearchEntity {
  None = 0,
  Metrics = 1 << 0,
  InstanceDomains = 1 << 1,
  Instances = 1 << 2,
  All = Metrics | InstanceDomains | Instances,
}

export enum EntityType {
  Metric = 'metric',
  Instance = 'instance',
  InstanceDomain = 'indom',
}

export interface AutocompleteQueryParams {
  query: string;
}

export type AutocompleteSuggestion = string;

export type AutocompleteResponse = AutocompleteSuggestion[];

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
  docid: string; // docId from redisearch
  /* All the ones below may be omited when they are filtered out by ?return param, or whey they lack any value (helptexts for example) */
  count: number;
  score: number;
  name: string; // name field
  type: EntityType; // type field (we always have only single type value on any record
  indom: string; // indom field
  oneline: string; // oneline field
  helptext: string; // helptext field
}

export interface TextResponse {
  elapsed: number;
  results: TextItemResponse[];
  total: number; // Redisearch returns total number of matching records even if results themselves are limited
  // TODO: make sure that they are included in the response
  limit: number;
  offset: number;
}
