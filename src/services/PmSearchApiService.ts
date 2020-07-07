import { BackendSrv } from '@grafana/runtime';
import { DataSourceInstanceSettings } from '@grafana/data';
import { timeout } from 'utils/utils';
import { TextQueryParams, TextResponse, AutocompleteQueryParams, AutocompleteResponse } from 'models/endpoints/search';
import Config from 'config/config';

class PmSearchApiService {
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
    return (PmSearchApiService.requestId++).toString();
  }

  async autocomplete(params: AutocompleteQueryParams): Promise<AutocompleteResponse | null> {
    const { headers, getRequestId, baseUrl, backendSrv } = this;
    const getParams = new URLSearchParams();
    getParams.append('query', params.query);
    if (params.limit !== undefined) {
      getParams.append('limit', params.limit.toString());
    }
    const options = {
      url: `${baseUrl}/search/suggest?${getParams.toString()}`,
      methods: 'GET',
      showSuccessAlert: false,
      requestId: getRequestId(),
      headers,
    };
    try {
      const response: AutocompleteResponse = await timeout(backendSrv.request(options), Config.REQUEST_TIMEOUT);
      return response;
    } catch {
      return null;
    }
  }

  async text(params: TextQueryParams): Promise<TextResponse | null> {
    const { headers, getRequestId, baseUrl, backendSrv } = this;
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
      url: `${baseUrl}/search/text?${getParams.toString()}`,
      methods: 'GET',
      showSuccessAlert: false,
      requestId: getRequestId(),
      headers,
    };
    try {
      // TODO: replace monkey patched limit/offset
      const response: Omit<TextResponse, 'limit' | 'offset'> = await timeout(
        backendSrv.request(options),
        Config.REQUEST_TIMEOUT
      );
      return {
        ...response,
        limit: params.limit ? params.limit : 0,
        offset: params.offset ? params.offset : 0,
      };
    } catch {
      return null;
    }
  }
}

export default PmSearchApiService;
