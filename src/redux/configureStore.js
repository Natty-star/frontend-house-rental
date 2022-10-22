import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers/index';
import immutableStateInvariantMiddleware from 'redux-immutable-state-invariant';

export default function configureStore(initialState) {
  //add support redux dev tools
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(immutableStateInvariantMiddleware()))
  );
}