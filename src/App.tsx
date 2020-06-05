import React from 'react';
import { AppRootProps } from '@grafana/data';
import 'react-placeholder/lib/reactPlaceholder.css';

import DetailPage from './pages/Detail/DetailPage';
import SearchPage from './pages/Search/SearchPage';
import IndexPage from './pages/Index/IndexPage';
import { AppLayout } from './styles';

import Actions from './components/Actions/Actions';
import Aside from './components/Aside/Aside';
import SearchForm from './components/SearchForm/SearchForm';

enum AppPage {
  Detail, Search, Index
};

interface AppState {
  page: AppPage,
  entityId: string,
};

class App extends React.Component<AppRootProps, AppState> {

  state: AppState = this.initialState;

  get initialState() {
    return {
      page: AppPage.Index,
      entityId: '',
    };
  }

  constructor(props: AppRootProps) {
    super(props);
    this.switchPage = this.switchPage.bind(this);
    this.searchChanged = this.searchChanged.bind(this);
  }

  switchPage(page: AppPage, entityId?: string) {
    const newStateIncrement: any = {};
    newStateIncrement.page = page;
    if (entityId) {
      newStateIncrement.entityId = entityId;
    }
    this.setState({ ...newStateIncrement });
  }

  searchChanged() {
    this.switchPage(AppPage.Search);
  }

  renderPageComponent() {
    const { state, switchPage } = this;
    const { page, entityId } = state;

    switch (page) {
      case AppPage.Detail:
        return (
          <DetailPage entityId={entityId}/>
        );
      case AppPage.Search:
        return (
          <SearchPage detailClicked={(entityId) => switchPage(AppPage.Detail, entityId)}/>
        );
      case AppPage.Index:
        return (
          <IndexPage
            searchClicked={() => switchPage(AppPage.Search)}
            bookmarkClicked={(entityId) => switchPage(AppPage.Detail, entityId)}/>
        );
    };         
  }

  render() {
    const { state, searchChanged } = this;
    const { page } = state;
    return (
      <div className={AppLayout}>
        <SearchForm onSubmit={searchChanged}/>
        <Actions page={page}
                goToIndex={() => this.switchPage(AppPage.Index)}
                backToLatestSearch={() => this.switchPage(AppPage.Search)} />
        <Aside page={page} />
        {this.renderPageComponent()}
      </div>
    );
  }
}

export { App, AppPage };
