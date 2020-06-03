import React from 'react';
import { AppRootProps } from '@grafana/data';

import { App } from './App';

class GrafanaAppPluginWrapper extends React.Component<AppRootProps> {
  constructor(props: AppRootProps) {
    super(props);
  }

  // Bloat for Grafana App plugin tabs, which we don't actually use in app itself, hence this wrapper
  componentDidMount() {
    this.updateNav();
  }

  componentDidUpdate(prevProps: AppRootProps) {
    if (this.props.query !== prevProps.query) {
      if (this.props.query.tab !== prevProps.query.tab) {
        this.updateNav();
      }
    }
  }

  updateNav() {
    const { path, onNavChanged, meta } = this.props;
    const node = {
      text: 'Performance Co-Pilot',
      img: meta.info.logos.large,
      subTitle: 'Full-Text Search',
      url: path,
    };
    onNavChanged({
      node,
      main: node,
    });
  }

  // Render main App component without above bloat
  render() {
    return <App {...this.props}/>;
  }
}

export { GrafanaAppPluginWrapper };
