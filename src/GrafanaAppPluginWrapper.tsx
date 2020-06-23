import React from 'react';
import { AppRootProps } from '@grafana/data';
import { Provider } from 'react-redux';
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import Loader from 'components/Loader/Loader';
import { initStore } from 'store/store';
import { Store, AnyAction } from 'redux';
import { Persistor } from 'redux-persist';

interface AppRootState {
  store: Store<any, AnyAction> | null;
  persistor: Persistor | null;
  loading: boolean;
}

class GrafanaAppPluginWrapper extends React.Component<AppRootProps, AppRootState> {
  state: AppRootState = {
    store: null,
    persistor: null,
    loading: true,
  };

  constructor(props: AppRootProps) {
    super(props);
  }

  componentDidMount() {
    // Bloat for Grafana App plugin tabs, which we don't actually use in app itself, hence this wrapper
    this.updateNav();
    // Initialize store
    initStore()
      .then(({ store, persistor }) => {
        this.setState({ store, persistor, loading: false });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
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
    const { store, loading, persistor } = this.state;
    if (loading) {
      return <Loader loaded={false} />;
    }
    if (store === null) {
      return <p>Error initializing state.</p>;
    }
    return (
      <Provider store={store}>
        {/* Seems like redux-persist has really buggy typings 
          // @ts-ignore */}
        <PersistGate persistor={persistor}>
          {loaded => (
            <Loader loaded={loaded}>
              <App {...this.props} />
            </Loader>
          )}
        </PersistGate>
      </Provider>
    );
  }
}

export { GrafanaAppPluginWrapper };
