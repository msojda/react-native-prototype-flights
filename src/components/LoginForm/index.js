import React from 'react';
import { Container, Content, Text, Form, Item, Input, Button } from 'native-base';
import Auth0 from 'react-native-auth0';

class LoginForm extends React.Component {
  state = { username: '', password: '', error: '' };

  constructor(props) {
    super(props);

    this.auth = new Auth0({ domain: 'msojda.eu.auth0.com', clientId: 'N0JJfL9NjbFnSwC5qqY24fNKZr2mKKzY' });
  }

  async onButtonClick() {
    const { username, password } = this.state;

    try {
      const creds = await this.auth.auth.passwordRealm({ username, password, realm: "Username-Password-Authentication" });
      this.setState({ username: '', password: '', error: '' });
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Form>
            <Item error={(this.state.error.length > 0)}>
              <Input
                placeholder="Username"
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                value={this.state.username}
                onChangeText={(text) => this.setState({ username: text })}
              />
            </Item>
            <Item last error={(this.state.error.length > 0)}>
              <Input
                placeholder="Password"
                secureTextEntry
                autoCapitalize='none'
                autoCorrect={false}
                value={this.state.password}
                onChangeText={(text) => this.setState({ password: text })}
              />
            </Item>
          </Form>

          {(this.state.error.length > 0) && <Text style={styles.error}>{this.state.error}</Text>}

          <Button full style={styles.button} onPress={this.onButtonClick.bind(this)}>
            <Text>Sign in</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = {
  button: {
    marginTop: 20
  },
  error: {
    color: 'red',
    marginTop: 20,
    fontSize: 12
  }
};

export default LoginForm;
