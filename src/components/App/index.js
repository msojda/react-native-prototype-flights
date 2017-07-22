import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import AirportsList from '../AirportsList';

const client = new ApolloClient({
    networkInterface: createNetworkInterface({
        uri: 'http://10.0.2.2:5050/graphql',
      })
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Container>
          <Content padder>
            <AirportsList />
          </Content>
        </Container>
      </ApolloProvider>
    )
  }
}

export default App;