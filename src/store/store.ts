import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// TODO: use for anything async in actions
const middleware = [thunk];

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(
    applyMiddleware(...middleware)
  ),
);

export { store };
