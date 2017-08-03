import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Router, Scene, Actions } from 'react-native-router-flux';
import createSagaMiddleware from 'redux-saga'
import AirportsList from '../AirportsList';
import FlightsList from '../FlightsList';
import Navbar from '../Navbar';
import LoginForm from '../LoginForm';
import mocks from '../../mockedData';
import * as reducers from '../../reducers';
import rootSaga from '../../sagas';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:5050/graphql',
  })
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    isLoading: reducers.loading,
    isAuthenticated: reducers.auth
  }),
  {},
  compose(
    applyMiddleware(client.middleware(), sagaMiddleware),
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
);

sagaMiddleware.run(rootSaga);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client} store={store}>
        <Router navBar={Navbar}>
          <Scene key="root">
            <Scene key="airportsList" component={AirportsList} title="Airports" initial={true} onRight={() => Actions.login()} rightTitle="Login" />
            <Scene key="flightsList" component={() => <FlightsList flights={mocks.flights} />} title="Flights" />
            <Scene key="login" component={LoginForm} title="Login" />
          </Scene>
        </Router>
      </ApolloProvider>
    )
  }
}

export default App;
