import React from 'react';
import {
  Container, Content, Spinner, Toast
} from 'native-base';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { graphql, gql } from 'react-apollo';
import { reset } from 'redux-form';
import RemindPasswordForm from '@flights/app/components/RemindPasswordForm';

class RemindPassword extends React.Component {
  state = { isLoading: false };

  handleSubmit({ email }) {
    const { remindUserPassword } = this.props;

    this.setState({ isLoading: true });
    remindUserPassword({ variables: { email } }).then(() => {
      this.props.dispatch(reset('RemindPasswordForm'));
      this.setState({ isLoading: false });
      Toast.show({
        text: 'Please check your e-mail.',
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
          <RemindPasswordForm
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
  mutation($email: String!) {
    remindUserPassword(email: $email) {
      message
    }
  }
`, { name: 'remindUserPassword' })
)(RemindPassword);
