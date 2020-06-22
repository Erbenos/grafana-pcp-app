import { TextQueryParams, TextResponse } from 'models/endpoints';
import { BackendSrv } from '@grafana/runtime';

export class PmSearchApiService {
  backendSrv: BackendSrv;

  constructor(backendSrv: BackendSrv) {
    this.backendSrv = backendSrv;
  }

  // async text(params: TextQueryParams): TextResponse {}
}
