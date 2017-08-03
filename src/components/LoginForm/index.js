import React from 'react';
import { Container, Content, Text, Form, Item, Input, Button } from 'native-base';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';

class LoginForm extends React.Component {
  state = { username: '', password: '', error: '' };

  onButtonClick() {
    const { username, password } = this.state;
    this.props.dispatch(loginUser(username, password));
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

export default connect()(LoginForm);
