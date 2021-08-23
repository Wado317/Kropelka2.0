import React, {useRef} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {colors} from '../../const/colors';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../const/routes';

const HomeScreen = () => {
  const navigation = useNavigation();

  const goToIntroScreen = () => {
    setTimeout(function () {
      navigation.navigate(Routes.WelcomeScreen);
    }, 4000);
  };
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      delay: 1000,
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };
  fadeIn();
  goToIntroScreen();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Animated.Image
          style={[
            styles.image,
            {
              opacity: fadeAnim,
            },
          ]}
          source={require('../../../assets/images/blood-test.png')}
        />
        <Animated.Text
          style={[
            styles.header,
            {
              opacity: fadeAnim,
            },
          ]}>
          KROPELKA
        </Animated.Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  main: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: 130,
    height: 130,
    marginTop: 130,
  },
  header: {
    fontFamily: 'ConcertOne-Regular',
    textShadowColor: colors.black,
    textShadowOffset: {width: 2.5, height: 2.5},
    padding: 5,
    textShadowRadius: 2,
    color: colors.danger,
    fontSize: 72,
    marginTop: 200,
  },
});
