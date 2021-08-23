import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {colors} from '../../const/colors';
import Eye from '../../components/Icons/Eye';

interface IInput {
  label: string;
  autoCapitize?: boolean;
  placeholder: string;
  onChangeText?: (value: string) => void;
}

export const PasswordInput = (props: IInput) => {
  const [enabled, setEnabled] = useState(true);

  const showPassword = () => {
    if (enabled === true) {
      setEnabled(false);
    } else {
      setEnabled(true);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.label}</Text>
      <View style={styles.inputt}>
        <TextInput
          style={styles.input}
          autoCapitalize={props.autoCapitize ? 'none' : 'sentences'}
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          secureTextEntry={enabled}
        />
        <TouchableOpacity style={styles.icon} onPress={showPassword}>
          <Eye />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    flexDirection: 'row',
    width: 245,
    borderBottomWidth: 3,
    borderColor: colors.danger,
    paddingBottom: 5,
  },
  title: {
    fontSize: 20,
    fontFamily: 'BreeSerif-Regular',
    color: colors.danger,
    marginBottom: 20,
  },
  icon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
  },
  inputt: {
    alignItems: 'flex-end',
  },
});
