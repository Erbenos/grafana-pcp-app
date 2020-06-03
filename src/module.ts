import { AppPlugin } from '@grafana/data';

import { ExampleConfigCtrl } from './legacy/config';
import { GrafanaAppPluginWrapper } from './GrafanaAppPluginWrapper';

// Legacy exports just so that we can activate plugin
export { ExampleConfigCtrl as ConfigCtrl };

export const plugin = new AppPlugin().setRootPage(GrafanaAppPluginWrapper);
