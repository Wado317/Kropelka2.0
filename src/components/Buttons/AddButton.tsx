import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../const/colors';

interface IButton {
  disabled?: boolean;
  label: string;
  onPress: () => void;
}

export const AddButton = (props: IButton) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      <Text style={styles.label}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    bottom: -30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.danger,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.white,
    height: 60,
    width: 100,
    //shadow
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.68,
    shadowRadius: 4.62,

    elevation: 4,
  },
  label: {
    color: colors.white,
    fontSize: 20,
    fontFamily: 'ConcertOne-Regular',
  },
});
