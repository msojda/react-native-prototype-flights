import React, { Component } from 'react';
import { Container, Content, Root } from 'native-base';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Router, Scene, Actions } from 'react-native-router-flux';
import createSagaMiddleware from 'redux-saga'
import { reducer as formReducer } from 'redux-form'

import AirportsList from '@flights/app/components/AirportsList';
import FlightsList from '@flights/app/components/FlightsList';
import Profile from '@flights/app/components/Profile';
import Navbar from '@flights/app/components/Navbar';
import LoginForm from '@flights/app/components/LoginForm';
import Registration from '@flights/app/components/Registration';
import RegistrationComplete from '@flights/app/components/RegistrationComplete';
import UpdateProfile from '@flights/app/components/UpdateProfile';
import ChangePassword from '@flights/app/components/ChangePassword';
import RemindPassword from '@flights/app/components/RemindPassword';

import * as reducers from '@flights/app/reducers';
import rootSaga from '@flights/app/sagas';
import { logoutUser } from '@flights/app/actions';
import authService from '@flights/app/services/auth';
import CONFIG from '@flights/app/config';
import mocks from '@flights/app/mockedData';

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

const client = new ApolloClient({ networkInterface });

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
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
                <Scene key="remindPassword" component={RemindPassword} title="Forgotten password" onRight={() => Actions.login()} rightTitle="Login" />
              </Scene>
              <Scene key="authenticated">
                <Scene key="profile" component={Profile} title="My Profile" onRight={() => store.dispatch(logoutUser())} rightTitle="Logout" initial back={false} />
                <Scene key="updateProfile" component={UpdateProfile} title="Update profile" />
                <Scene key="changePassword" component={ChangePassword} title="Change your password" />
              </Scene>
            </Scene>
          </Router>
        </ApolloProvider>
      </Root>
    )
  }
}

export default App;
