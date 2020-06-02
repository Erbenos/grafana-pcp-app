// Libraries
import React from 'react';

// Types
import { AppRootProps } from '@grafana/data';
import { Detail, DetailPagePayload } from './Detail';
import { Results } from './Results';
import { Search, SearchPagePayload } from './Search';
import 'react-placeholder/lib/reactPlaceholder.css';

enum AppPage {
  Detail, Results, Search
}

interface AppPageProps {
  navigate: (page: AppPage, pagePayload?: any) => void;
}

interface AppState {
  page: AppPage,
  // fields that passes state to currently active Page - maybe be further 
  pagePayload: Object,
};

class App extends React.Component<AppRootProps, AppState> {

  state = {
    page: AppPage.Search,
    pagePayload: {},
  };

  constructor(props: AppRootProps) {
    super(props);
    this.navigate = this.navigate.bind(this);
  }

  componentDidMount() {
    this.updateNav();
  }

  componentDidUpdate(prevProps: AppRootProps) {
    // Bloat for Grafana App plugin tabs, which we don't actually use
    if (this.props.query !== prevProps.query) {
      if (this.props.query.tab !== prevProps.query.tab) {
        this.updateNav();
      }
    }
  }

  updateNav() {
    // Again, more Grafana bloat
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

  navigate(page: AppPage, pagePayload: SearchPagePayload | DetailPagePayload) {
    this.setState({ page, pagePayload });
  }

  render() {
    const { state } = this;
    const { page, pagePayload } = state;

    const defaultAppPageProps = {
      navigate: this.navigate,
    };

    const props = { ...defaultAppPageProps, ...pagePayload };
    switch (page) {
      case AppPage.Detail:
        return (
          <Detail {...props } />
        );
      case AppPage.Results:
        return (
          <Results {...props} />
        );
      case AppPage.Search:
        return (
          <Search {...props} />
        );
    };         
  }
}

export { App, AppPage, AppPageProps };
