import React from 'react';
import { Root } from 'native-base';
import { ApolloProvider } from 'react-apollo';
import { store, client as apolloClient } from '@flights/app/store';
import { logoutUser } from '@flights/app/actions';
import Routing from '@flights/app/routing';

const App = () =>
  (
    <Root>
      <ApolloProvider client={apolloClient} store={store}>
        <Routing onUserLogout={() => store.dispatch(logoutUser())} />
      </ApolloProvider>
    </Root>
  );

export default App;
