import { AppPlugin } from '@grafana/data';

import { ExampleConfigCtrl } from './legacy/config';
import { FulltextSearchPage } from './pages/FulltextSearchPage';

// Legacy exports just so that we can activate plugin
export { ExampleConfigCtrl as ConfigCtrl };

export const plugin = new AppPlugin().setRootPage(FulltextSearchPage);
