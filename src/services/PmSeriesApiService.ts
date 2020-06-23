import {
  SeriesDescQueryParams,
  SeriesDescResponse,
  SeriesQueryQueryParams,
  SeriesQueryResponse,
  SeriesLabelsQueryParams,
  SeriesLabelsResponse,
} from 'models/endpoints';
import { BackendSrv, getDataSourceSrv, getBackendSrv } from '@grafana/runtime';
import { DataSourceInstanceSettings } from '@grafana/data';

let requestId = 0;

// Should probably be somewhere else
const initializeSeriesService = async () => {
  // Configure PmSeriesApiService
  // Data returned does not match provided Typescript definitions
  const datasource: any = await getDataSourceSrv().get('PCP Redis');
  const uid = datasource?.instanceSettings?.uid;
  const settings = getDataSourceSrv().getDataSourceSettingsByUid(uid);
  if (!settings) {
    throw new Error('Unable to get datasource settings');
  }
  const backendSrv = getBackendSrv();
  const searchService = PmSeriesApiService(settings, backendSrv);
  return searchService;
};

const PmSeriesApiService = (instanceSettings: DataSourceInstanceSettings, backendSrv: BackendSrv) => {
  if (!instanceSettings.url) {
    throw new Error();
  }

  const baseUrl: string = instanceSettings.url;
  const headers = {
    'Content-Type': 'application/json',
    ...(instanceSettings.basicAuth ? { Authorization: instanceSettings.basicAuth } : {}),
  };

  const getRequestId = () => {
    return (requestId++).toString();
  };

  const desc = async (params: SeriesDescQueryParams) => {
    const getParams = new URLSearchParams();
    getParams.append('series', params.series);
    if (params.client !== undefined) {
      getParams.append('client', params.toString());
    }
    const options = {
      url: `${baseUrl}/series/desc?${getParams.toString()}`,
      methods: 'GET',
      showSuccessAlert: false,
      requestId: getRequestId(),
      headers,
    };
    try {
      const response: SeriesDescResponse = await backendSrv.request(options);
      return response;
    } catch (error) {
      throw new Error();
    }
  };

  const query = async (params: SeriesQueryQueryParams) => {
    const getParams = new URLSearchParams();
    getParams.append('expr', params.expr);
    if (params.client !== undefined) {
      getParams.append('client', params.toString());
    }
    const options = {
      url: `${baseUrl}/series/query?${getParams.toString()}`,
      methods: 'GET',
      showSuccessAlert: false,
      requestId: getRequestId(),
      headers,
    };
    try {
      const response: SeriesQueryResponse = await backendSrv.request(options);
      return response;
    } catch (error) {
      throw new Error();
    }
  };

  const labels = async (params: SeriesLabelsQueryParams) => {
    const getParams = new URLSearchParams();
    if (params.series !== undefined) {
      getParams.append('series', params.series);
    }
    if (params.match !== undefined) {
      getParams.append('match', params.match);
    }
    if (params.names !== undefined) {
      getParams.append('names', params.names.join(','));
    }
    if (params.name !== undefined) {
      getParams.append('name', params.name);
    }
    if (params.client !== undefined) {
      getParams.append('client', params.client);
    }
    const options = {
      url: `${baseUrl}/series/labels?${getParams.toString()}`,
      methods: 'GET',
      showSuccessAlert: false,
      requestId: getRequestId(),
      headers,
    };
    try {
      const response: SeriesLabelsResponse = await backendSrv.request(options);
      return response;
    } catch (error) {
      throw new Error();
    }
  };

  return Object.freeze({
    desc,
    query,
    labels,
  });
};

export default PmSeriesApiService;
export { initializeSeriesService };
