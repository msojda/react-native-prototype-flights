import Auth0 from 'react-native-auth0';
import { AsyncStorage } from 'react-native';

auth0 = new Auth0({ domain: 'msojda.eu.auth0.com', clientId: 'N0JJfL9NjbFnSwC5qqY24fNKZr2mKKzY' });

function authenticate(username, password) {
  return auth0.auth.passwordRealm({ username, password, realm: "Username-Password-Authentication" });
}

async function storeToken(token) {
  await AsyncStorage.setItem('@auth:token', JSON.stringify(token));
}

async function getToken() {
  const value = await AsyncStorage.getItem('@auth:token');

  if (value !== null) {
    return JSON.parse(value);
  }

  return null;
}

async function destroyToken() {
  await AsyncStorage.removeItem('@auth:token');
}

export default { authenticate, storeToken, destroyToken };
