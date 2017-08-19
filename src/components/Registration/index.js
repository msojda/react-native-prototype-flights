import React from 'react';
import { Container, Content, Text, Form, Item, Input, Button, Spinner, CheckBox, Body, View, Toast } from 'native-base';
import { connect } from 'react-redux';
import { registerUser } from '@flights/app/actions';

class Registration extends React.Component {
  state = {
    fields: {
      username: {
        value: '',
        isValid: false,
        pristine: true
      },
      password: {
        value: '',
        isValid: false,
        pristine: true
      },
      passwordConfirmation: {
        value: '',
        isValid: false,
        pristine: true
      },
      email: {
        value: '',
        isValid: false,
        pristine: true
      }
    },
    isValid: false,
    acceptTos: false
  };

  validateTos() {
    if (this.state.acceptTos === false) {
      Toast.show({
        text: 'Please accept Terms and Conditions!',
        position: 'top',
        type: 'danger',
        duration: 1500,
        buttonText: 'OK'
      });
    }
  }

  changeFieldValue(field, value) {
    let fields = Object.assign({}, this.state.fields);
    fields[field].value = value;
    fields[field].pristine = false;
    fields[field].isValid = (typeof value === 'boolean' && value === true) || (value.length > 0);
    this.setState({ fields });
  }

  validatePassword() {
    const { password, passwordConfirmation } = this.state.fields;

    if (password.pristine && passwordConfirmation.pristine) {
      return;
    }

    let fields = Object.assign({}, this.state.fields);

    if (passwordConfirmation.value.length === 0 || password.value !== passwordConfirmation.value) {
      fields.passwordConfirmation.isValid = false;
    } else {
      fields.passwordConfirmation.isValid = true;
    }

    this.setState({ fields });
  }

  validateForm() {
    const { fields } = this.state;

    let isValid = true;
    for (let field in fields) {
      if (fields[field].value.length === 0) {
        fields[field].isValid = false;
      }

      if (!fields[field].isValid) {
        isValid = false;
      }
    }

    this.setState({ isValid, fields });

    if (isValid === false) {
      Toast.show({
        text: 'Please complete the form before submission!',
        position: 'top',
        type: 'danger',
        duration: 1500,
        buttonText: 'OK'
      });
    }
  }

  onButtonClick() {
    this.validateTos();
    this.validateForm();

    if (this.state.isValid === true) {
      const { username, password, email } = this.state.fields;
      this.props.dispatch(registerUser(email.value, username.value, password.value));
    }
  }

  render() {
    const { error, isLoading } = this.props;
    const { username, password, passwordConfirmation, email } = this.state.fields;

    {error && Toast.show({
        text: error,
        position: 'top',
        type: 'danger',
        duration: 1500,
        buttonText: 'OK'
      })}

    return (
      <Container>
        <Content padder>
          <Form>
            <Item error={!username.isValid && !username.pristine}>
              <Input
                placeholder="Username"
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                value={username.value}
                onChangeText={(text) => this.changeFieldValue('username', text)}
                autoFocus
                onSubmitEditing={this.onButtonClick.bind(this)}
                returnKeyType='done'
              />
            </Item>
            <Item error={!email.isValid && !email.pristine}>
              <Input
                placeholder="E-mail address"
                keyboardType='email-address'
                autoCapitalize='none'
                autoCorrect={false}
                value={email.value}
                onChangeText={(text) => this.changeFieldValue('email', text)}
                onSubmitEditing={this.onButtonClick.bind(this)}
                returnKeyType='done'
              />
            </Item>
            <Item error={!password.isValid && !password.pristine}>
              <Input
                placeholder="Password"
                secureTextEntry
                autoCapitalize='none'
                autoCorrect={false}
                value={password.value}
                onChangeText={(text) => {
                  this.changeFieldValue('password', text);
                  this.validatePassword();
                }}
                onSubmitEditing={this.onButtonClick.bind(this)}
                returnKeyType='done'
              />
            </Item>
            <Item error={!passwordConfirmation.isValid && !passwordConfirmation.pristine}>
              <Input
                placeholder="Confirm password"
                secureTextEntry
                autoCapitalize='none'
                autoCorrect={false}
                value={passwordConfirmation.value}
                onChangeText={(text) => {
                  this.changeFieldValue('passwordConfirmation', text);
                  this.validatePassword();
                }}
                onSubmitEditing={this.onButtonClick.bind(this)}
                returnKeyType='done'
              />
            </Item>
          </Form>

          <View style={styles.checkboxContainer}>
            <CheckBox style={{ marginRight: 20 }} checked={this.state.acceptTos} onPress={() => this.setState({acceptTos: !this.state.acceptTos})} />
            <Body>
              <Text style={{ fontSize: 12, color: '#888888' }}>Before the account is created we require you to accept our Terms and Conditions.</Text>
            </Body>
          </View>

          <Button style={{ marginTop: 10 }} full iconRight onPress={this.onButtonClick.bind(this)}>
            <Text>Create account</Text>{isLoading && <Spinner />}
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = {
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    paddingLeft: 10
  }
};

export default connect(
  state => ({
    isLoading: state.onboarding.isLoading,
    error: state.onboarding.error
  })
)(Registration);
