import { AppPlugin } from '@grafana/data';

import { ExampleConfigCtrl } from './legacy/config';
import { App } from './pages/App';

// Legacy exports just so that we can activate plugin
export { ExampleConfigCtrl as ConfigCtrl };

export const plugin = new AppPlugin().setRootPage(App);
