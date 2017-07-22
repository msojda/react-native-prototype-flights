import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import AirportsList from '../AirportsList';
import mocks from '../../mockedData';

class App extends Component {
  render() {
    return (
      <Container>
        <Content padder>
          <AirportsList airports={mocks.airports} />
        </Content>
      </Container>
    )
  }
}

export default App;