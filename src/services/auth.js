import Auth0 from 'react-native-auth0';
import { AsyncStorage } from 'react-native';

auth0 = new Auth0({ domain: 'msojda.eu.auth0.com', clientId: 'N0JJfL9NjbFnSwC5qqY24fNKZr2mKKzY' });

function authenticate(username, password) {
  return auth0.auth.passwordRealm({ username, password, realm: "Username-Password-Authentication", scope: "offline_access openid profile email address phone" });
}

async function storeToken(token) {
  await AsyncStorage.setItem('@auth:token', JSON.stringify(token));
}

async function destroyTokenAndRevoke() {
  const { refreshToken } = await getToken();
  auth0.auth.revoke({ refreshToken });
  await destroyToken();
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

export default { authenticate, storeToken, destroyTokenAndRevoke };
