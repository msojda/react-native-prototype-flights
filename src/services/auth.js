import Auth0 from 'react-native-auth0';
import { AsyncStorage } from 'react-native';
import CONFIG from '@flights/app/config';

auth0 = new Auth0({ domain: CONFIG.AUTH0_DOMAIN, clientId: CONFIG.AUTH0_CLIENT_ID });

function authenticate(username, password) {
  return auth0.auth.passwordRealm({ username, password, realm: CONFIG.AUTH0_REALM, scope: CONFIG.AUTH0_SCOPE });
}

function register(username, password, email) {
  return auth0.auth.createUser({ username, password, email, connection: CONFIG.AUTH0_REALM });
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

async function getUserProfile(token) {
  return auth0.auth.userInfo({ token });
}

export default { 
  authenticate, 
  storeToken, 
  destroyTokenAndRevoke, 
  getUserProfile, 
  register
};
