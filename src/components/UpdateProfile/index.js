import React from 'react';
import {
  Container, Content, Spinner
} from 'native-base';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { graphql, gql } from 'react-apollo';
import ProfileForm from '@flights/app/components/ProfileForm';

class UpdateProfile extends React.Component {
  state = { isLoading: false };

  handleSubmit() {
    const { firstName, lastName, createOrUpdateProfile } = this.props;

    this.setState({ isLoading: true });
    createOrUpdateProfile({ variables: { firstName, lastName } }).then(() => {
      this.props.data.refetch();
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { user, loading } = this.props.data;

    if (loading) {
      return <Spinner />;
    }

    return (
      <Container>
        <Content padder>
          <ProfileForm
            handleSubmit={this.handleSubmit.bind(this)}
            initialValues={user.profile}
            isLoading={this.state.isLoading}
          />
        </Content>
      </Container>
    );
  }
}

const selector = formValueSelector('ProfileForm');

export default compose(
  connect(
    state => ({
      firstName: selector(state, 'firstName'),
      lastName: selector(state, 'lastName')
    })
  ),
  graphql(gql`{
    user {
      profile {
        userId
        firstName
        lastName
      }
    }
  }`),
  graphql(gql`
  mutation($firstName: String!, $lastName: String!) {
    createOrUpdateProfile(firstName: $firstName, lastName: $lastName) {
      userId
      firstName
      lastName
    }
  }
`, { name: 'createOrUpdateProfile' })
)(UpdateProfile);
