import React from 'react'
import { Field, reduxForm } from 'redux-form';
import { Form, Item, Button, Text } from 'native-base';
import { View } from 'react-native';
import TextField from '@flights/app/components/TextField';

let ProfileForm = props => {
  const { handleSubmit } = props;

  return (
    <View>
      <Form>
        <Item>
          <Field
            name="username"
            component={TextField}
            placeholder="Username"
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            autoFocus
            returnKeyType='done'
          />
        </Item>
        <Item>
          <Field
            name="email"
            component={TextField}
            placeholder="E-mail address"
            keyboardType='email-address'
            autoCapitalize='none'
            autoCorrect={false}
            returnKeyType='done'
          />
        </Item>
      </Form>

      <Button style={{ marginTop: 10 }} full iconRight onPress={handleSubmit}>
        <Text>Save changes</Text>
      </Button>
    </View>
  )
}

ProfileForm = reduxForm({
  form: 'ProfileForm'
})(ProfileForm);

export default ProfileForm;
