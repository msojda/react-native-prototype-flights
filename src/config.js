import { Platform } from 'react-native';
import ENV from 'react-native-config';

export default {
  API_URL: (Platform.OS === 'ios') ? ENV.API_URL : ENV.API_URL_ANDROID,
  AUTH0_DOMAIN: ENV.AUTH0_DOMAIN,
  AUTH0_CLIENT_ID: ENV.AUTH0_CLIENT_ID,
  AUTH0_REALM: ENV.AUTH0_REALM || 'Username-Password-Authentication',
  AUTH0_SCOPE: ENV.AUTH0_SCOPE || 'offline_access openid profile email address phone'
};
