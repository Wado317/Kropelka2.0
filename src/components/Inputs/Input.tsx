import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {colors} from '../../const/colors';

interface IInput {
  label: string;
  autoCapitize?: boolean;
  placeholder: string;
  value?: string;
  onChangeText?: (value: string) => void;
}

export const UniversalInput = (props: IInput) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.title}>{props.label}</Text>
      <TextInput
        style={styles.input}
        autoCapitalize={props.autoCapitize ? 'none' : 'sentences'}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        value={props.value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    width: 245,
    borderBottomWidth: 3,
    borderColor: colors.danger,
    paddingBottom: 5,
  },
  title: {
    fontSize: 22,
    fontFamily: 'BreeSerif-Regular',
    color: colors.danger,
    marginBottom: 20,
  },
});
