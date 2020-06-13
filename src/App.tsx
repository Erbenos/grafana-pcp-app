import React from 'react';
import { AppRootProps } from '@grafana/data';
import { connect } from 'react-redux';
import 'react-placeholder/lib/reactPlaceholder.css';

import DetailPage from './pages/Detail/DetailPage';
import SearchPage from './pages/Search/SearchPage';
import IndexPage from './pages/Index/IndexPage';
import { appLayout } from './styles';

import Actions from './components/Actions/Actions';
import Aside from './components/Aside/Aside';
import SearchForm from './components/SearchForm/SearchForm';
import { ViewState } from './actions/types';
import { RootState } from './reducers/reducers';

const mapStateToProps = (state: RootState) => ({
  view: state.search.view,
});

type AppProps = ReturnType<typeof mapStateToProps> & AppRootProps;

class App extends React.Component<AppProps, {}> {
  constructor(props: AppProps) {
    super(props);
  }

  renderPageComponent() {
    const { view } = this.props;

    switch (view) {
      case ViewState.Detail:
        return <DetailPage />;
      case ViewState.Search:
        return <SearchPage />;
      case ViewState.Index:
        return <IndexPage />;
      default:
        return;
    }
  }

  render() {
    return (
      <div className={appLayout}>
        <SearchForm />
        <Actions />
        <Aside />
        {this.renderPageComponent()}
      </div>
    );
  }
}

export default connect(mapStateToProps, {})(App);
