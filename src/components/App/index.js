import React from 'react';
import { Root } from 'native-base';
import { ApolloProvider } from 'react-apollo';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import { store, client as apolloClient } from '@flights/app/store';
import Routing from '@flights/app/routing';

let MainView = ({ dispatch, nav }) =>
  <Routing navigation={addNavigationHelpers({
    dispatch: dispatch,
    state: nav,
  })} />

MainView = connect(state => ({ nav: state.nav }))(MainView);

const App = () =>
  (
    <Root>
      <ApolloProvider client={apolloClient} store={store}>
        <MainView />
      </ApolloProvider>
    </Root>
  );

export default App;
