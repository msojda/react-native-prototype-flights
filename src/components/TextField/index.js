import React from 'react'
import { Input } from 'native-base';

const TextField = props => {
  const { input, meta, ...inputProps } = props;

  return (
    <Input
      {...inputProps}
      onChangeText={input.onChange}
      onBlur={input.onBlur}
      onFocus={input.onFocus}
      value={input.value}
    />
  );
}

export default TextField;
