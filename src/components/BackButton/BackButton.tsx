import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../const/colors';
import {useNavigation} from '@react-navigation/native';

export const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.container} onPress={navigation.goBack}>
      <Svg width="23" height="30" viewBox="0 0 15 20">
        <Path
          fill="none"
          stroke={colors.black}
          strokeWidth="2"
          d="M14.17 18.915L1.702 9.862 14.17.809"
        />
      </Svg>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 25,
    top: 45,
    padding: 10,
    zIndex: 9999,
  },
});
