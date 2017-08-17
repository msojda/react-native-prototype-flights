import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Form, Item, Button, Text, Spinner, Toast } from 'native-base';
import { View } from 'react-native';
import TextField from '@flights/app/components/TextField';

const validate = values => {
  const errors = {};

  if (values.newPassword !== values.confirmNewPassword) {
    errors.confirmNewPassword = 'Passwords do not match';
  }

  return errors;
}

const submit = values => {
  const errors = validate(values);

  if (Object.keys(errors).length > 0) {
    Toast.show({
      text: 'Password and confirmation do not match!',
      position: 'top',
      type: 'danger',
      duration: 1500,
      buttonText: 'OK'
    });

    throw new SubmissionError({
      confirmNewPassword: errors.confirmNewPassword,
      _error: 'Password and confirmation do not match!'
    })
  }
}

let PasswordForm = props => {
  const { handleSubmit, isLoading, onSuccess } = props;

  return (
    <View>
      <Form>
        <Field
          name="newPassword"
          component={TextField}
          placeholder="New password"
          secureTextEntry
          autoCapitalize='none'
          autoCorrect={false}
          autoFocus
          returnKeyType='done'
        />
        <Field
          name="confirmNewPassword"
          component={TextField}
          placeholder="Confirm new password"
          secureTextEntry
          autoCapitalize='none'
          autoCorrect={false}
          returnKeyType='done'
        />
      </Form>

      <Button
        style={{ marginTop: 10 }}
        full
        iconRight
        onPress={handleSubmit((values) => {
          submit(values);
          onSuccess(values);
        })}
      >
        <Text>Change</Text>{isLoading && <Spinner />}
      </Button>
    </View>
  )
}

PasswordForm = reduxForm({
  form: 'PasswordForm',
})(PasswordForm);

export default PasswordForm;
