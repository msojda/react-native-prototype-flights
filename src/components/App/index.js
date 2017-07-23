import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import { Router, Scene } from 'react-native-router-flux';
import AirportsList from '../AirportsList';
import FlightsList from '../FlightsList';
import Navbar from '../Navbar';
import mocks from '../../mockedData';

const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: 'http://45.32.184.7:5050/graphql',
      })
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router navBar={Navbar}>
          <Scene key="root">
            <Scene key="airportsList" component={AirportsList} title="Airports" initial={true} />
            <Scene key="flightsList" component={()=><FlightsList flights={mocks.flights} />} title="Flights" />
          </Scene>
        </Router>
      </ApolloProvider>
    )
  }
}

export default App;