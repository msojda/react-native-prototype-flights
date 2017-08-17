import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { Form, Item, Button, Text, Spinner } from 'native-base';
import { View } from 'react-native';
import TextField from '@flights/app/components/TextField';

let ProfileForm = props => {
  const { handleSubmit, isLoading } = props;

  return (
    <View>
      <Form>
        <Field
          name="firstName"
          component={TextField}
          placeholder="First name"
          autoCorrect={false}
          autoFocus
          returnKeyType='done'
        />
        <Field
          name="lastName"
          component={TextField}
          placeholder="Last name"
          autoCorrect={false}
          returnKeyType='done'
        />
      </Form>

      <Button style={{ marginTop: 10 }} full iconRight onPress={handleSubmit}>
        <Text>Save changes</Text>{isLoading && <Spinner />}
      </Button>
    </View>
  )
}

ProfileForm = reduxForm({
  form: 'ProfileForm'
})(ProfileForm);

export default ProfileForm;
