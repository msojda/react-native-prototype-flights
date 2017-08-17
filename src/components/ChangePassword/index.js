import React from 'react';
import {
  Container, Content, Spinner, Toast
} from 'native-base';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { graphql, gql } from 'react-apollo';
import { reset } from 'redux-form';
import PasswordForm from '@flights/app/components/PasswordForm';

class ChangePassword extends React.Component {
  state = { isLoading: false };

  handleSubmit({ newPassword }) {
    const { changeUserPassword } = this.props;

    this.setState({ isLoading: true });
    changeUserPassword({ variables: { newPassword } }).then(() => {
      this.props.dispatch(reset('PasswordForm'));
      this.setState({ isLoading: false });
      Toast.show({
        text: 'Password changed!',
        position: 'top',
        type: 'success',
        duration: 1500,
        buttonText: 'OK'
      });
    });
  }

  render() {
    return (
      <Container>
        <Content padder>
          <PasswordForm
            isLoading={this.state.isLoading}
            onSuccess={this.handleSubmit.bind(this)}
          />
        </Content>
      </Container>
    );
  }
}

export default compose(
  connect(),
  graphql(gql`
  mutation($newPassword: String!) {
    changeUserPassword(newPassword: $newPassword) {
      userId
    }
  }
`, { name: 'changeUserPassword' })
)(ChangePassword);
