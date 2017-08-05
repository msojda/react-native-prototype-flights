import React from 'react';
import { 
  Container, Content
} from 'native-base';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import ProfileForm from '@flights/app/components/ProfileForm';

class UpdateProfile extends React.Component {
  handleSubmit() {
    const { email, username } = this.props;

    console.log(email, username);
  }

  render() {
    const { initialValues } = this.props;

    return (
      <Container>
        <Content padder>
          <ProfileForm handleSubmit={this.handleSubmit.bind(this)} initialValues={initialValues} />
        </Content>
      </Container>
    );
  }
}

const selector = formValueSelector('ProfileForm');

export default connect(
  state => ({
    email: selector(state, 'email'),
    username: selector(state, 'username'),
    initialValues: {
      email: state.auth.profile.email,
      username: state.auth.profile.nickname
    }
  })
)(UpdateProfile);
