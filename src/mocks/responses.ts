import { EntityType, SearchItemResponse } from 'actions/types';

export const entities: Array<SearchItemResponse> = [
  {
    entityId: '489dbe44c0fd4746fed850433b9eab1af5bee1b5',
    name: 'kernel.uname.distro',
    type: EntityType.Metric,
    indom: 'PM_INDOM_NULL',
    oneline: null,
    helptext: `The Linux distribution name, as determined by a number of heuristics.
For example:
+ on Fedora, the contents of /etc/fedora-release
+ on RedHat, the contents of /etc/redhat-release`,
    value: 'Fedora release 32 (Thirty Two)',
  },
  {
    entityId: '0dce1bdbfc415b485ef04c1dedf0c09a3663e25d',
    name: 'kernel.uname.sysname',
    type: EntityType.Metric,
    indom: 'PM_INDOM_NULL',
    oneline: null,
    helptext: `Name of the implementation of the running operating system as reported by the sysname[] value returned from uname(2) or uname -s. Usually "Linux".`,
    value: 'Linux',
  },
  {
    entityId: '73e91dbd17f34634228b87c63bab8a4b90437512',
    name: 'kernel.all.uptime',
    type: EntityType.Metric,
    indom: 'PM_INDOM_NULL',
    oneline: 'time the current kernel has been running',
    helptext: '',
    value: '12143.57',
  },
  {
    entityId: '77c80fa867cc066fca97a6a1e33d9579a3d48f65',
    name: 'network.interface.speed',
    type: EntityType.Metric,
    indom: '60.3',
    oneline: '',
    helptext: `The linespeed on the network interface, as reported by the kernel, scaled from Megabits/second to Megabytes/second. See also network.interface.baudrate for the bytes/second value.`,
    value: null,
  },
  {
    entityId: '946086f939d2db36941aa4cf3d7788e1a7b2790a',
    name: 'mem.freemem',
    type: EntityType.Metric,
    indom: 'PM_INDOM_NULL',
    oneline: 'free system memory metric from /proc/meminfo',
    helptext: '',
    value: '1818208',
  },
];
