import { RootState } from 'store/reducer';
import { AppRootProps } from '@grafana/data';
import React from 'react';
import { ViewState } from 'store/slices/search/slices/view/state';
import DetailPage from 'pages/Detail/DetailPage';
import SearchPage from 'pages/Search/SearchPage';
import IndexPage from 'pages/Index/IndexPage';
import { appLayout } from 'styles';
import Aside from 'partials/Aside/Aside';
import { connect } from 'react-redux';
import SearchForm from 'partials/SearchForm/SearchForm';
import Actions from 'partials/Actions/Actions';

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
