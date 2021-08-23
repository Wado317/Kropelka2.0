import React, {useCallback, useState} from 'react';

import {colors} from '../../const/colors';
import {UniversalInput} from '../../components/Inputs/Input';
import {NavButton} from '../../components/Buttons/NavButton';
import {BackButton} from '../../components/BackButton/BackButton';
import TextValidator from '../../helpers/validators';

import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
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

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const {t} = useTranslation();

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
      console.warn(email);
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.container}>
        <BackButton />
        <View style={styles.titleContainer}>
          <Text style={styles.headerText}>
            {t('forgotPasswordScreen.header')}
          </Text>
        </View>
        <View style={styles.cloud}>
          <View style={styles.inputContainer}>
            <UniversalInput
              label={t('forgotPasswordScreen.email')}
              placeholder={t('forgotPasswordScreen.enterEmail')}
              onChangeText={setEmail}
              autoCapitize={true}
            />
            <Text style={styles.errorText}>{emailError}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <NavButton
              label={t('forgotPasswordScreen.resetPassword')}
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
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  logo: {
    marginTop: 10,
    height: 80,
    width: 80,
  },
  headerText: {
    padding: 10,
    fontFamily: 'BreeSerif-Regular',
    fontSize: 60,
    color: colors.white,
    textAlign: 'center',
    textShadowColor: colors.black,
    textShadowOffset: {height: -1, width: 1},
    textShadowRadius: 1,
  },
  cloud: {
    height: 600,
    width: '100%',
    borderRadius: 50,
    alignItems: 'center',
    paddingTop: 70,
    backgroundColor: colors.white,
    bottom: -50,
  },
  inputContainer: {
    marginBottom: 20,
    marginTop: 60,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 100,
  },
  forgotPassword: {
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: colors.mediumBlue,
  },
  errorText: {
    color: colors.red,
    fontSize: 12,
  },
});

export default ForgotPasswordScreen;
