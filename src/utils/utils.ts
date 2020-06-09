import _ from 'lodash';

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

export { _genMatchingName };
