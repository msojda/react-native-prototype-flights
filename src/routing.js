import React from 'react';
import { Button, Text } from 'native-base';
import { StackNavigator } from 'react-navigation';
import AirportsList from '@flights/app/components/AirportsList';
import FlightsList from '@flights/app/components/FlightsList';
import Profile from '@flights/app/components/Profile';
import Navbar from '@flights/app/components/Navbar';
import LoginForm from '@flights/app/components/LoginForm';
import Registration from '@flights/app/components/Registration';
import RegistrationComplete from '@flights/app/components/RegistrationComplete';
import UpdateProfile from '@flights/app/components/UpdateProfile';
import ChangePassword from '@flights/app/components/ChangePassword';
import RemindPassword from '@flights/app/components/RemindPassword';
import mocks from '@flights/app/mockedData';

const Navigator = StackNavigator({
  Airports: {
    screen: AirportsList,
    navigationOptions: ({ navigation }) => ({
      title: 'Airports',
      headerRight: <Button transparent onPress={() => navigation.navigate('Login')}><Text>Login</Text></Button>
    }),
  },
  FlightsList: {
    screen: () => <FlightsList flights={mocks.flights} />,
    navigationOptions: ({ navigation }) => ({
      title: 'Flights',
    }),
  },
  Login: {
    screen: LoginForm,
    navigationOptions: ({ navigation }) => ({
      title: 'Login',
      headerRight: <Button transparent onPress={() => navigation.navigate('Register')}><Text>Register</Text></Button>
    }),
  },
  Register: {
    screen: Registration,
    navigationOptions: ({ navigation }) => ({
      title: 'Register',
    }),
  },
  RegistrationComplete: {
    screen: RegistrationComplete,
    navigationOptions: ({ navigation }) => ({
      title: 'Welcome',
    }),
  },
  RemindPassword: {
    screen: RemindPassword,
    navigationOptions: ({ navigation }) => ({
      title: 'Remind password',
      headerRight: <Button transparent onPress={() => navigation.navigate('Login')}><Text>Login</Text></Button>
    }),
  },
  Profile: {
    screen: Profile,
  },
  UpdateProfile: {
    screen: UpdateProfile,
    navigationOptions: ({ navigation }) => ({
      title: 'Update Profile',
    }),
  },
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: ({ navigation }) => ({
      title: 'ChangePassword',
    }),
  },
});

export default Navigator;
