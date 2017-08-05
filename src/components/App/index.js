import React, { Component } from 'react';
import { Container, Content, Root } from 'native-base';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Router, Scene, Actions } from 'react-native-router-flux';
import createSagaMiddleware from 'redux-saga'

import AirportsList from '@flights/app/components/AirportsList';
import FlightsList from '@flights/app/components/FlightsList';
import Profile from '@flights/app/components/Profile';
import Navbar from '@flights/app/components/Navbar';
import LoginForm from '@flights/app/components/LoginForm';
import Registration from '@flights/app/components/Registration';
import RegistrationComplete from '@flights/app/components/RegistrationComplete';

import * as reducers from '@flights/app/reducers';
import rootSaga from '@flights/app/sagas';
import { logoutUser } from '@flights/app/actions';
import CONFIG from '@flights/app/config';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: CONFIG.API_URL,
  })
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  combineReducers({
    apollo: client.reducer(),
    isLoading: reducers.loading,
    auth: reducers.auth,
    onboarding: reducers.register
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
      <Root>
      <ApolloProvider client={client} store={store}>
        <Router navBar={Navbar}>
          <Scene key="root" hideNavBar>
            <Scene key="public">
              <Scene key="airportsList" component={AirportsList} title="Airports" initial onRight={() => Actions.login()} rightTitle="Login" />
              <Scene key="flightsList" component={() => <FlightsList flights={mocks.flights} />} title="Flights" />
              <Scene key="login" component={LoginForm} title="Login" />
              <Scene key="register" component={Registration} title="Register" onRight={() => Actions.login()} rightTitle="Login" />
              <Scene key="registrationComplete" component={RegistrationComplete} title="Welcome" back={false} />
            </Scene>
            <Scene key="authenticated" back={false}>
              <Scene key="profile" initial component={Profile} title="My Profile" onRight={() => store.dispatch(logoutUser())} rightTitle="Logout" initial />
            </Scene>
          </Scene>
        </Router>
      </ApolloProvider>
      </Root>
    )
  }
}

export default App;
