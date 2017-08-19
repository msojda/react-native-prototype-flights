import React from 'react';
import { Container, Content, Text, Form, Item, Input, Button, Spinner, CheckBox, Body, View, Toast, H2, H1, Card, CardItem } from 'native-base';

const RegistrationComplete = ({ navigation }) => {
  return (
    <Container style={{ flex: 1, backgroundColor: '#455a64' }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'flex-end', paddingLeft: 30 }}>
          <H1 style={{ fontWeight: 'bold', backgroundColor: 'transparent', color: 'white' }}>Hey there,</H1>
          <H2 style={{ backgroundColor: 'transparent', color: 'white' }}>welcome to the app</H2>
        </View>
        <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'flex-end' }}>
          <Button full onPress={() => navigation.navigate('Login')}>
            <Text>Login</Text>
          </Button>
        </View>
      </View>
    </Container>
  );
}

export default RegistrationComplete;
