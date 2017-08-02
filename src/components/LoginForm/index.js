import React from 'react';
import { Container, Content, Text, Form, Item, Input, Button } from 'native-base';

class LoginForm extends React.Component {
  state = { username: '', password: '' };

  onButtonClick() {
    console.log(this.state);
  }

  render() {
    return (
      <Container>
        <Content padder>
          <Form>
            <Item>
              <Input
                placeholder="Username"
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                value={this.state.username}
                onChangeText={(text) => this.setState({username: text})}
              />
            </Item>
            <Item last>
              <Input
                placeholder="Password"
                secureTextEntry
                autoCapitalize='none'
                autoCorrect={false}
                value={this.state.password}
                onChangeText={(text) => this.setState({password: text})}
              />
            </Item>
          </Form>

          <Button style={styles.button} onPress={this.onButtonClick.bind(this)}>
            <Text>Sign in</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = {
  button: {
    margin: 20
  }
};

export default LoginForm;
