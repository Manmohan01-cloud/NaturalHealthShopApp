import React from 'react';
import { TextInput } from 'react-native';

const TextInputComponent = ({
  placeholder,
  value,
  onChange,
  style,
  secureTextEntry = false,
}) => {
  return (
    <TextInput
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      style={style}
      placeholderTextColor="#6e6e6e"
    />
  );
};

export default TextInputComponent;