import _ from 'lodash';
import { getDataSourceSrv } from '@grafana/runtime';

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

const getDatasourceSettings = async (name: string) => {
  const datasource: any = await getDataSourceSrv().get(name);
  const uid = datasource?.instanceSettings?.uid;
  const settings = getDataSourceSrv().getDataSourceSettingsByUid(uid);
  if (!settings) {
    throw new Error('Unable to get datasource settings');
  }
  return settings;
};

export { _genMatchingName, getDatasourceSettings };
