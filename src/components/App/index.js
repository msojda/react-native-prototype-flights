import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Router, Scene, Actions } from 'react-native-router-flux';
import createSagaMiddleware from 'redux-saga'
import AirportsList from '../AirportsList';
import FlightsList from '../FlightsList';
import Profile from '../Profile';
import Navbar from '../Navbar';
import LoginForm from '../LoginForm';
import mocks from '../../mockedData';
import * as reducers from '../../reducers';
import rootSaga from '../../sagas';
import { logoutUser } from '../../actions';

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
    auth: reducers.auth
  }),
  undefined,
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
          <Scene key="root" hideNavBar>
            <Scene key="public">
              <Scene key="airportsList" component={AirportsList} title="Airports" initial onRight={() => Actions.login()} rightTitle="Login" />
              <Scene key="flightsList" component={() => <FlightsList flights={mocks.flights} />} title="Flights" />
              <Scene key="login" component={LoginForm} title="Login" />
            </Scene>
            <Scene key="authenticated" back={false}>
              <Scene key="profile" initial component={Profile} title="My Profile" onRight={() => store.dispatch(logoutUser())} rightTitle="Logout" initial />
            </Scene>
          </Scene>
        </Router>
      </ApolloProvider>
    )
  }
}

export default App;
