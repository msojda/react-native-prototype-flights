import React from 'react'
import { Input, Item } from 'native-base';

const TextField = props => {
  const { input, meta: { touched, error, warning }, ...inputProps } = props;

  return (
    <Item error={touched && error !== undefined}>
      <Input
        {...inputProps}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
      />
    </Item>
  );
}

export default TextField;
