import React, {useCallback, useState} from 'react';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';

import {colors} from '../../const/colors';
import {UniversalInput} from '../../components/Inputs/Input';
import {PasswordInput} from '../../components/Inputs/PasswordInput';
import {NavButton} from '../../components/Buttons/NavButton';
import {BackButton} from '../../components/BackButton/BackButton';
import TextValidator from '../../helpers/validators';

import {SafeAreaView, StyleSheet, Text, Vibration, View} from 'react-native';
import {useTranslation} from 'react-i18next';

interface Props {
  children: any;
}

const DismissKeyboard = ({children}: Props) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [password2Error, setPassword2Error] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState(false);

  const {t} = useTranslation();

  // const inputHandler = useCallback(
  //   (handler: any) => (value: string): void => {
  //     handler(value);
  //   },
  //   [],

  // https://owlapi.herokuapp.com/register

  const validate = useCallback((): boolean => {
    let isValid = true;

    if (!TextValidator.isEmail(email)) {
      setEmailError(t('registerScreen.emailValidation'));
      isValid = false;
      Vibration.vibrate();
    } else {
      setEmailError('');
    }

    if (!TextValidator.isCorrectPassword(password)) {
      isValid = false;
      setPasswordError(t('registerScreen.validation'));
    } else {
      passwordError && setPasswordError('');
    }

    if (password !== password2) {
      setPassword2Error(t('registerScreen.repeatValidation'));
      isValid = false;
    } else {
      setPassword2Error('');
    }

    setIsFormValid(isValid);
    return isValid;
  }, [email, password, password2, passwordError, t]);

  const handleRegister = async () => {
    if (!validate()) {
      return;
    }
    try {
      console.warn('udalo sie');
    } catch (error) {}
  };

  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.container}>
        <BackButton />
        <View style={styles.titleContainer}>
          <Text style={styles.headerText}>{t('registerScreen.header')}</Text>
        </View>
        <View style={styles.cloud}>
          <UniversalInput
            label={t('registerScreen.email')}
            placeholder={t('registerScreen.enterEmail')}
            onChangeText={setEmail}
            autoCapitize={true}
          />
          <Text style={styles.errorText}>{emailError}</Text>
          <UniversalInput
            label={t('registerScreen.name')}
            placeholder={t('registerScreen.enterName')}
            onChangeText={setName}
            autoCapitize={false}
          />
          <PasswordInput
            label={t('registerScreen.password')}
            placeholder={t('registerScreen.enterPassword')}
            onChangeText={setPassword}
          />
          <Text style={styles.errorText}>{passwordError}</Text>
          <PasswordInput
            label={t('registerScreen.repeatPassword')}
            placeholder={t('registerScreen.enterRepeatPassword')}
            onChangeText={setPassword2}
          />
          <Text style={styles.errorText}>{password2Error}</Text>
          <View style={styles.buttonContainer}>
            <NavButton
              label={t('registerScreen.createAccount')}
              onPress={validate}
              variant="secondary"
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    padding: 10,
    fontFamily: 'BreeSerif-Regular',
    fontSize: 50,
    color: colors.white,
    textShadowColor: colors.black,
    textShadowOffset: {height: -1, width: 1},
    textShadowRadius: 1,
    marginTop: 30,
  },
  cloud: {
    height: 650,
    width: '100%',
    borderRadius: 50,
    alignItems: 'center',
    padding: 60,
    backgroundColor: colors.white,
    bottom: -30,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
  },
  errorText: {
    color: colors.red,
    fontSize: 10,
  },
});

export default RegisterScreen;
