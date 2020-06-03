import React from 'react';
import { AppRootProps } from '@grafana/data';
import 'react-placeholder/lib/reactPlaceholder.css';

import { DetailPage } from './pages/Detail/DetailPage';
import { SearchPage } from './pages/Search/SearchPage';
import { IndexPage } from './pages/Index/IndexPage';
import { AppLayout } from './pages/styles';

import { Actions } from './components/Actions/Actions';
import { Aside } from './components/Aside/Aside';
import { SearchForm, SearchEntity, SearchOpt } from './components/SearchForm/SearchForm';

enum AppPage {
  Detail, Search, Index
}

interface AppState {
  page: AppPage,
  entityId: string,
  searchOpt: SearchOpt,
};

class App extends React.Component<AppRootProps, AppState> {

  state: AppState = this.initialState;

  get initialState() {
    return {
      page: AppPage.Index,
      entityId: '',
      searchOpt: {
        pattern: '',
        entityFlags: SearchEntity.All,
      },
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

  searchChanged(searchOpt: SearchOpt) {
    this.setState({ searchOpt });
    this.switchPage(AppPage.Search);
  }

  renderPageComponent() {
    const { state, switchPage } = this;
    const { page, entityId, searchOpt } = state;
    
    switch (page) {
      case AppPage.Detail:
        return (
          <DetailPage entityId={entityId}/>
        );
      case AppPage.Search:
        return (
          <SearchPage searchOpt={searchOpt} detailClicked={(entityId) => switchPage(AppPage.Detail, entityId)}/>
        );
      case AppPage.Index:
        return (
          <IndexPage/>
        );
    };         
  }

  render() {
    const { state, searchChanged } = this;
    const { page, searchOpt } = state;
    return (
      <div className={AppLayout}>
        <SearchForm onSubmit={searchChanged}/>
        <Actions searchOpt={searchOpt}
                page={page}
                goToIndex={() => this.switchPage(AppPage.Index)}
                backToLatestSearch={() => this.switchPage(AppPage.Search)} />
        <Aside page={page} />
        {this.renderPageComponent()}
      </div>
    );
  }
}

export { App, AppPage };
