# Change Log

All notable changes to this project will be documented in this file.

### 01.06.2020

Did mostly troubleshooting various Grafana issues (inability to use symlink for plugin path on Fedora 32, SELinux issues with Docker, inability to use @emotion/styled-components). Wrote some starting boilerplate that will be improved upon.

### 02.06.2020

After spending some time trying to get `react-router-dom` to work, I wasn't able to convince it to give me correct props upon &lt;Link&gt; navigation, after small discussion with Andreas we decided that for now, the best course of action would be to give up on permalinks and do some simple component toggling instead of implementing some kind of router. So I did just that, even though passing around state without some sort of state-management was a little painful, additionally each page is also responsible for rendering full layout without any partials. I do expect this to change in upcoming days. Right now, we are at the point where the app-plugin is as clickable/walkable as images/wireframes I made up for project proposal. See: https://i.imgur.com/a78Risn.png, https://i.imgur.com/m3S86LL.png, https://i.imgur.com/FT9BK2B.png .

### 03.06.2020

Today was spent separating UI into more elemental partials that each manage its own state. This reduced code complexity for each page. Also I feel much better about the code, even though it doesn't use any state management lib, there is some structure and is much more easily modifiable than it was yesterday.

### 05.06.2020

Since the state was all over the place I incorporated Redux into the app - while there is additional boilerplate, not all state not-local to component state is in Redux, it does feel like at least some mutations are better understandable at least. Will continue on improving this aspect.

### 07.06.2020

Moved all shared state into Redux, culling many actions which were needless. Next will do some thinking/tinkering about how async data (all request related logic) will be managed.

### 08.06.2020

Created some sample mocks for query search and fetch detail endpoints which return sample of something thats closer to real life data than React placehodler were. These mocks are implemented into relevant methods, therefore its now possible to 'search' and 'fetch' these samples. Added loading indicators for simulated delays. Will do more output formatting with more end-result-like data soon.

### 09.06.2020

Updated mocks with sample responses from /pmapi/metric, integrated some of Grafana code convention, integrated with app veyor. Started splitting details page into entity type specific subpages, improved rendering. There are some issues with Grafana's Prettier setup, since vscode's prettier doesn't seem to respect all the rules in .prettierrc.js .

### 10.06.2020

Improved typing and structure on Redux store, added mock for /pmapi/indom response, added some boilerplate for other detail pages. Less productive day.

### 12.06.2020

Loading mock instance domain for metric, updated root store structure even further for easier state management and fetch status tracking, this structure will be used by other detail pages as well. Will need to come up with better file structure though as some files are getting quite big and repetitive.

### 13.06.2020

Refactored reducer structure - introduced separated reducers for each slice of Redux state. Made appropriate edits to actions.

### 14.06.2020

Put all store slice specific code separately - no giant action/(types|search).ts anymore :)

### 15.06.2020

Done detail page for Instance Domain, persistance of bookmarks and search history in localStorage and abstracted loading related graphics to separate component. `redux-persist` seems to have some typescript typing issues so it proved somewhat troublesome / frustrating to get it working.

### 16.06.2020

Did some RediSearch analysis for backend handling logic [doc](https://gist.github.com/Erbenos/d44af5817dfe9d114d6f796210e4f3dc), possible response and request models for new /pmapi/search endpoint. Made bookmarks removable one by one, updated some 'fetching' logic to handle newly drafted response model and limited maximum number of records in search history.

### 17.06.2020

Added support for entity (currently metric only) preview - graph for numeric types, table for string type. For now using `pcp-vector-datasource` (so works only when `grafana-pcp` is installed), I didn't figure how to allow selection of datasource from select UI.

### 22.06.2020

Moved some type defs around, little boilerplate in preparation for backend calls. Today did some tinkering with other PCP related stuff/issues and was figuring out stuff for upcoming days.

### 23.06.2020

Some boilerplate in preparation for querying real endpoints provided by pmwebapi. Needed to figure out how to share initializable services in whole application, in the end made do with services being accessible in Redux action creators scope. Feels like service related structure is not ideal but will work for now.

### 24.06.2020

Fetching metrics series directly from Redis datasource, new series-related UI and updated code of services. This commit broke details of some metrics, since now, I attempt to load data for metric details directly from Redis (by using configuration provided to 'PCP Redis' datasource in Grafana datasource settings) and not all mock metrics have series records. Help text is missing from series pmwebapi endpoints so I monkey patched it. Also now I am unable to decide which dashboard I should use to display metric preview since single metric can have series of variable types.

### 25.06.2020

Added timeouthandling for all service related request making methods, abstracted away some typedefs into separate files and abstracted possible app configuration settings into separate file.
