import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../../const/colors';
import {useNavigation} from '@react-navigation/native';
import {Routes} from '../../const/routes';
import {NavButton} from '../../components/Buttons/NavButton';
import ChangeLanguageIcon from '../../language/components/ChangeLanguageIcon';
import {useTranslation} from 'react-i18next';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const {t} = useTranslation();

  const goToLoginScreen = () => {
    navigation.navigate(Routes.HomeScreen);
  };

  const goToRegisterScreen = () => {
    navigation.navigate(Routes.RegisterScreen);
  };

  const goToChangeLanguageScreen = () => {
    navigation.navigate(Routes.ChangeLanguageScreen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <Image
          source={require('../../../assets/images/heart.png')}
          style={styles.logo}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{t('welcomeScreen.welcome')}</Text>
          <Text style={styles.text}>{t('welcomeScreen.welcome1')}</Text>
          <Text style={styles.text}>{t('welcomeScreen.welcome2')}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <ChangeLanguageIcon onPress={goToChangeLanguageScreen} />
          <NavButton
            label={t('welcomeScreen.register')}
            onPress={goToRegisterScreen}
          />
          <NavButton
            label={t('welcomeScreen.logIn')}
            onPress={goToLoginScreen}
            variant={'secondary'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  logo: {
    position: 'absolute',
    top: 10,
    height: 130,
    width: 150,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    color: colors.danger,
    fontSize: 25,
    fontFamily: 'BreeSerif-Regular',
  },
  textContainer: {
    backgroundColor: colors.lightGrey,
    borderColor: colors.danger,
    borderWidth: 1,
    borderRadius: 35,
    marginHorizontal: 40,
    paddingHorizontal: 15,
    paddingVertical: 25,
    marginBottom: 50,
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
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
  },
});
