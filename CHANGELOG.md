# Change Log

All notable changes to this project will be documented in this file.

# 01.06.2020

Did mostly troubleshooting various Grafana issues (inability to use symlink for plugin path on Fedora 32, SELinux issues with Docker, inability to use @emotion/styled-components). Wrote some starting boilerplate that will be improved upon.

# 02.06.2020

After spending some time trying to me `react-router-dom` to work, I wasn't able to convince it to give me correct props upon &lt;Link&gt; navigation, after small discussion with Andreas we decided that for now best course of action would be to give up on permalinks and do some simple component toggling instead of implementing some kind of router. So I did just that, even tho passing around state without some sort of state-management was a little painful - each page is also responsible for rendering full layout without any partials. I do expect this to change in upocming days. Right now, we are at the point where the app-plugin is as clickable/walkable as images/wireframes I made up for project proposal. See: https://i.imgur.com/a78Risn.png, https://i.imgur.com/m3S86LL.png, https://i.imgur.com/FT9BK2B.png .
