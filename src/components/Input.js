import React from 'react';

import {StyleSheet, TextInput} from 'react-native';

export function Input({style, ...props}) {
  return <TextInput {...props} style={[styles.text, style]} />;
}

const styles = StyleSheet.create({
  text: {
    backgroundColor: '#e8e8e8',
    width: '100%',
    padding: 20,
    borderRadius: 8,
  },
});
