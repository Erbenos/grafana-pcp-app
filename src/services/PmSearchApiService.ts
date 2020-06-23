import { TextQueryParams, TextResponse } from 'models/endpoints';
import { BackendSrv, getDataSourceSrv, getBackendSrv } from '@grafana/runtime';
import { DataSourceInstanceSettings } from '@grafana/data';

let requestId = 0;

// Should probably be somewhere else
const initializeSearchService = async () => {
  // Configure PmSearchApiService
  // Data returned does not match provided Typescript definitions
  const datasource: any = await getDataSourceSrv().get('PCP Redis');
  const uid = datasource?.instanceSettings?.uid;
  const settings = getDataSourceSrv().getDataSourceSettingsByUid(uid);
  if (!settings) {
    throw new Error('Unable to get datasource settings');
  }
  const backendSrv = getBackendSrv();
  const searchService = PmSearchApiService(settings, backendSrv);
  return searchService;
};

const PmSearchApiService = (instanceSettings: DataSourceInstanceSettings, backendSrv: BackendSrv) => {
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

  const text = async (params: TextQueryParams) => {
    const getParams = new URLSearchParams();
    getParams.append('query', params.query);
    if (params.highlight !== undefined) {
      getParams.append('highlight', params.highlight.valueOf().toString());
    }
    if (params.offset !== undefined) {
      getParams.append('offset', params.offset.toString());
    }
    if (params.limit !== undefined) {
      getParams.append('limit', params.limit.toString());
    }
    if (params.field !== undefined) {
      getParams.append('field', params.field.join(','));
    }
    if (params.return !== undefined) {
      getParams.append('return', params.return.join(','));
    }
    if (params.type !== undefined) {
      getParams.append('type', params.type.toString());
    }
    const options = {
      url: `${baseUrl}/query/text?${getParams.toString()}`,
      methods: 'GET',
      showSuccessAlert: false,
      requestId: getRequestId(),
      headers,
    };
    try {
      const response: TextResponse = await backendSrv.request(options);
      return response;
    } catch (error) {
      throw new Error();
    }
  };

  return Object.freeze({
    text,
  });
};

export default PmSearchApiService;
export { initializeSearchService };
