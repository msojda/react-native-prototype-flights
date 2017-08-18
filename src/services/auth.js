import Auth0 from 'react-native-auth0';
import { AsyncStorage } from 'react-native';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import CONFIG from '@flights/app/config';

auth0 = new Auth0({ domain: CONFIG.AUTH0_DOMAIN, clientId: CONFIG.AUTH0_CLIENT_ID });

function authenticate(username, password) {
  return auth0.auth.passwordRealm({
    username,
    password,
    realm: CONFIG.AUTH0_REALM,
    scope: CONFIG.AUTH0_SCOPE,
    audience: 'http://localhost:5050/'
  });
}

function register(username, password, email) {
  return auth0.auth.createUser({ username, password, email, connection: CONFIG.AUTH0_REALM });
}

async function storeAccessToken(accessToken) {
  await AsyncStorage.setItem('@auth:accessToken', accessToken);
}

async function storeRefreshToken(refreshToken) {
  await AsyncStorage.setItem('@auth:refreshToken', refreshToken);
}

async function destroyTokenAndRevoke() {
  const refreshToken = await getRefreshToken();
  auth0.auth.revoke({ refreshToken });
  await destroyToken();
}

async function getRefreshToken() {
  return await AsyncStorage.getItem('@auth:refreshToken');
}

async function getAccessToken() {
  const accessToken = await AsyncStorage.getItem('@auth:accessToken');

  if (accessToken !== null) {
    const decoded = jwtDecode(accessToken);
    if (expired(decoded)) {
      const refreshToken = await getRefreshToken();
      const newToken = await refreshAccessToken(refreshToken);
      storeAccessToken(newToken.access_token);

      return newToken.access_token;
    }
  }

  return null;
}

async function destroyToken() {
  await AsyncStorage.removeItem('@auth:accessToken');
  await AsyncStorage.removeItem('@auth:refreshToken');
}

async function getUserProfile(token) {
  return auth0.auth.userInfo({ token });
}

function expired(decodedToken) {
  let expiryDate = new Date(1000 * decodedToken.exp);
  let current = Math.floor(Date.now() / 1000);

  return (decodedToken.exp < current);
}

async function refreshAccessToken(refreshToken) {
  const response = await axios({
    method: 'post',
    url: `https://${CONFIG.AUTH0_DOMAIN}/oauth/token`,
    data: {
      grant_type: 'refresh_token',
      client_id: CONFIG.AUTH0_CLIENT_ID,
      client_secret: CONFIG.AUTH0_CLIENT_SECRET,
      refresh_token: refreshToken
    }
  });

  return response.data;
}

export default {
  authenticate,
  storeAccessToken,
  storeRefreshToken,
  destroyTokenAndRevoke,
  getUserProfile,
  register,
  getAccessToken
};
