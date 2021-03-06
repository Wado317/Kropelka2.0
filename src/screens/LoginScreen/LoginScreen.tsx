import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {colors} from '../../const/colors';
import {UniversalInput} from '../../components/Inputs/Input';
import {PasswordInput} from '../../components/Inputs/PasswordInput';
import {NavButton} from '../../components/Buttons/NavButton';
import {BackButton} from '../../components/BackButton/BackButton';
import {Routes} from '../../const/routes';
import TextValidator from '../../helpers/validators';

import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';

interface Props {
  children: any;
}

const DismissKeyboard = ({children}: Props) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const LoginScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const navigation = useNavigation();
  const {t} = useTranslation();

  const goToForgotPasswordScreen = () => {
    navigation.navigate(Routes.ForgotPasswordScreen);
  };

  // const inputHandler = useCallback(
  //   (handler: any) => (value: string): void => {
  //     handler(value);
  //   },
  //   [],
  // );

  const validate = useCallback((): any => {
    if (!TextValidator.isEmail(email)) {
      setEmailError('Niepoprawny adres email');
    } else {
      setEmailError('');
    }
    return;
  }, [email]);

  const handleLogin = async () => {
    if (!validate()) {
      return;
    }
    try {
      console.warn(password, email);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.container}>
        <BackButton />
        <View style={styles.titleContainer}>
          <Text style={styles.headerText}>{t('loginScreen.header')}</Text>
        </View>
        <View style={styles.cloud}>
          <View style={styles.inputContainer}>
            <UniversalInput
              label={t('loginScreen.email')}
              placeholder={t('loginScreen.enterEmail')}
              onChangeText={setEmail}
              autoCapitize={true}
            />
            <Text style={styles.errorText}>{emailError}</Text>
            <PasswordInput
              label={t('loginScreen.password')}
              placeholder={t('loginScreen.enterPassword')}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={goToForgotPasswordScreen}>
              <Text style={styles.forgotPasswordText}>
                {t('loginScreen.forgotPassword')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <NavButton
              label={t('loginScreen.logIn')}
              onPress={validate}
              variant="primary"
            />
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.danger,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    padding: 10,
    fontFamily: 'BreeSerif-Regular',
    fontSize: 60,
    color: colors.white,
    textShadowColor: colors.black,
    textShadowOffset: {height: -1, width: 1},
    textShadowRadius: 1,
  },
  cloud: {
    flex: 0,
    width: '100%',
    height: 600,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: colors.white,
    bottom: -50,
    borderRadius: 50,
  },
  inputContainer: {
    marginBottom: 20,
    marginTop: 60,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
  },
  forgotPassword: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: colors.danger,
  },
  errorText: {
    color: colors.red,
    fontSize: 10,
  },
});

export default LoginScreen;
