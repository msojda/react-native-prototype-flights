import React from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { Form, Item, Button, Text, Spinner, Toast } from 'native-base';
import { View } from 'react-native';
import TextField from '@flights/app/components/TextField';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Please enter your e-mail address.';
  }

  return errors;
}

let RemindPasswordForm = props => {
  const { handleSubmit, isLoading, onSuccess } = props;

  return (
    <View>
      <Form>
        <Field
          name="email"
          component={TextField}
          placeholder="E-mail address"
          autoCapitalize='none'
          autoCorrect={false}
          autoFocus
          returnKeyType='done'
        />
      </Form>

      <Button
        style={{ marginTop: 10 }}
        full
        iconRight
        onPress={handleSubmit((values) => {
          onSuccess(values);
        })}
      >
        <Text>Send</Text>{isLoading && <Spinner />}
      </Button>
    </View>
  )
}

RemindPasswordForm = reduxForm({
  form: 'RemindPasswordForm',
  validate
})(RemindPasswordForm);

export default RemindPasswordForm;
