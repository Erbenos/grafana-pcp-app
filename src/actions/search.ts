import { SET_SEARCH, SetSearchAction, AddSearchHistoryAction, ADD_SEARCH_HISTORY, ClearSeachHistoryAction, CLEAR_SEARCH_HISTORY, QUERY_SEARCH, QuerySearchAction, SearchQuery } from './types';
import _ from 'lodash';

const setSearch = (search: SearchQuery): SetSearchAction => {
  return {
    type: SET_SEARCH,
    payload: search,
  };
};

const addSearchHistory = (search: SearchQuery): AddSearchHistoryAction => {
  return {
    type: ADD_SEARCH_HISTORY,
    payload: search,
  };
};

// TODO: only for dev
const _genMatchingName = (pattern: string) => {
  const randomMetricNames = [
    'statsd.pmda.received',
    'proc.psinfo.age',
    'kernel.cpu.util.user',
    'quota.project.files.time_left',
    'disk.md.read_merge',
    'disk.dm.read',
    'disk.dev.total_bytes',
    'mem.util.mapped',
    'kernel.percpu.interrupts.PIW',
    'hinv.map.dmname',
    'kvm.nmi_injections',
  ];
  return `${_.sample(randomMetricNames)}_${pattern}`;  
};

// TODO: this will be async
const querySearch = (search: SearchQuery): QuerySearchAction => {
  // TODO: fetch data from Redis
  const testData = [...Array(4)].map((x, i) => ({
      entityId: `id-${i}`,
      name: `${_genMatchingName(search.pattern)}`,
    })
  );
  return {
    type: QUERY_SEARCH,
    payload: {
      items: testData,
      pagination: {
        currentPage: search.pageNum ?? 1,
        numberOfPages: 5,
      },
    },
  };
};

const clearSearchHistory = (): ClearSeachHistoryAction => {
  return {
    type: CLEAR_SEARCH_HISTORY,
  };
};

export { setSearch, addSearchHistory, querySearch, clearSearchHistory };
