import * as reducers from '@flights/app/reducers';
import rootSaga from '@flights/app/sagas';
import authService from '@flights/app/services/auth';
import CONFIG from '@flights/app/config';
import createSagaMiddleware from 'redux-saga'
import { reducer as formReducer } from 'redux-form'
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

const networkInterface = createNetworkInterface({
  uri: CONFIG.API_URL,
});

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }
    const token = authService.getAccessToken()
    .then((token) => {
      if(token) {
        req.options.headers.authorization = `Bearer ${token}`;
      }
      next();
    });
  }
}]);

export const client = new ApolloClient({ networkInterface });

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    isLoading: reducers.loading,
    auth: reducers.auth,
    onboarding: reducers.register,
    form: formReducer
  }),
  undefined,
  compose(
    applyMiddleware(client.middleware(), sagaMiddleware),
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
);

sagaMiddleware.run(rootSaga);
