import React from 'react';
import { Container, Content, Text, Form, Item, Input, Button, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';

class LoginForm extends React.Component {
  state = { username: '', password: '' };

  onButtonClick() {
    const { username, password } = this.state;
    this.props.dispatch(loginUser(username, password));
  }

  render() {
    const { error, isLoading } = this.props;

    return (
      <Container>
        <Content padder>
          <Form>
            <Item error={(error.length > 0)}>
              <Input
                placeholder="Username"
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                value={this.state.username}
                onChangeText={(text) => this.setState({ username: text })}
              />
            </Item>
            <Item last error={(error.length > 0)}>
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

           {(error.length > 0) && <Text style={styles.error}>{error}</Text>} 

          <Button full style={styles.button} onPress={this.onButtonClick.bind(this)}>
            <Text>Sign in</Text>
          </Button>
          {isLoading && <Spinner />}
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

export default connect(
  state => ({
    error: state.auth.error,
    isLoading: state.auth.isLoading
  })
)(LoginForm);
