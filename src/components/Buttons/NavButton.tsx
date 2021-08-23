import React, {useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../const/colors';

type buttonTypes = 'primary' | 'secondary';

interface IButton {
  disabled?: boolean;
  label: string;
  onPress: () => void;
  variant?: buttonTypes;
}

export const NavButton = (props: IButton) => {
  const buttonStyles = useMemo(() => {
    switch (props.variant) {
      case 'primary':
        return primaryButtonStyles;
      case 'secondary':
        return secondaryButtonStyles;
      default:
        return primaryButtonStyles;
    }
  }, [props.variant]);
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        ...buttonStyles.button,
      }}>
      <Text
        style={{
          ...buttonStyles.label,
        }}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
};

const primaryButtonStyles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.danger,
    borderRadius: 30,
    height: 60,
    width: 300,
    marginBottom: 20,
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

const secondaryButtonStyles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.danger,
    paddingHorizontal: 19,
    height: 60,
    width: 300,
    //shadow
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.48,
    shadowRadius: 4.62,

    elevation: 4,
  },
  label: {
    color: colors.danger,
    fontSize: 20,
    fontFamily: 'ConcertOne-Regular',
  },
});
