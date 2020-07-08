import _ from 'lodash';
import { getDataSourceSrv } from '@grafana/runtime';
import { TimeoutError } from 'models/errors/errors';

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

// Use only when you trust HTML source!
const stripHtml = (html: string) => {
  const el = document.createElement('div');
  el.innerHTML = html;
  return el.textContent || el.innerText || '';
};

const getDatasourceSettings = async (name: string) => {
  const datasource: any = await getDataSourceSrv().get(name);
  const uid = datasource?.instanceSettings?.uid;
  const settings = getDataSourceSrv().getDataSourceSettingsByUid(uid);
  if (!settings) {
    throw new Error('Unable to get datasource settings');
  }
  return settings;
};

const timeout = async function timeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>(async (resolve, reject) => {
    // This produces uncatchable error for some reason.
    setTimeout(() => {
      reject(new TimeoutError('Request timeout'));
    }, ms);
    try {
      const result = await promise;
      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

export { _genMatchingName, getDatasourceSettings, timeout, stripHtml };
