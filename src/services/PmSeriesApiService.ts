import {
  SeriesDescQueryParams,
  SeriesDescResponse,
  SeriesQueryQueryParams,
  SeriesQueryResponse,
  SeriesLabelsQueryParams,
  SeriesLabelsResponse,
} from 'models/endpoints';
import { BackendSrv } from '@grafana/runtime';
import { DataSourceInstanceSettings } from '@grafana/data';

class PmSeriesApiService {
  private static requestId = 0;
  baseUrl: string;
  backendSrv: BackendSrv;
  headers = {
    'Content-Type': 'application/json',
  };

  constructor(instanceSettings: DataSourceInstanceSettings, backendSrv: BackendSrv) {
    if (!instanceSettings.url) {
      throw new Error();
    }
    this.baseUrl = instanceSettings.url;
    this.headers = {
      ...this.headers,
      ...(instanceSettings.basicAuth ? { Authorization: instanceSettings.basicAuth } : {}),
    };
    this.backendSrv = backendSrv;
  }

  getRequestId() {
    return (PmSeriesApiService.requestId++).toString();
  }

  async descs(params: SeriesDescQueryParams) {
    const { baseUrl, getRequestId, headers, backendSrv } = this;
    const getParams = new URLSearchParams();
    getParams.append('series', params.series.join(','));
    if (params.client !== undefined) {
      getParams.append('client', params.toString());
    }
    const options = {
      url: `${baseUrl}/series/descs?${getParams.toString()}`,
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
  }

  async query(params: SeriesQueryQueryParams) {
    const { baseUrl, getRequestId, headers, backendSrv } = this;
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
  }

  async labels(params: SeriesLabelsQueryParams) {
    const { baseUrl, getRequestId, headers, backendSrv } = this;
    const getParams = new URLSearchParams();
    if (params.series !== undefined) {
      getParams.append('series', params.series.join(','));
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
  }
}

export default PmSeriesApiService;
