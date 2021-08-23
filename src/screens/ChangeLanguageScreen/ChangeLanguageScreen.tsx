import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {LANGUAGES} from '../../language/constants';
import {colors} from '../../const/colors';
import {useTranslation} from 'react-i18next';
import useLanguage from '../../language/hooks/useLanguage';
import {BackButton} from '../../components/BackButton/BackButton';

const ChangeLanguageScreen: React.FC = () => {
  const {t} = useTranslation();
  const {currentLanguage, setAppLanguage} = useLanguage();

  return (
    <SafeAreaView style={styles.container}>
      <BackButton />
      <Text style={styles.headerText}>{t('changeLanguageScreen.header')}</Text>
      <ScrollView style={styles.screenStyles}>
        <View>
          {Object.values(LANGUAGES).map(l => (
            <TouchableOpacity
              key={l.label}
              style={[
                styles.langContainer,
                currentLanguage === l.value && styles.langSelected,
              ]}
              onPress={() => setAppLanguage(l.value)}>
              <View style={styles.langFlag}>
                <Image source={l.icon} />
              </View>
              <Text style={styles.langText} key={l.value}>
                {t(l.label)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangeLanguageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.danger,
  },
  screenStyles: {
    padding: 48,
    marginTop: 50,
  },
  langContainer: {
    height: 70,
    flex: 1,
    borderColor: colors.red,
    backgroundColor: colors.white,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 39,
    marginBottom: 14,
    shadowColor: colors.black,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  langSelected: {
    borderColor: colors.green,
    borderWidth: 3,
  },
  langText: {
    fontSize: 20,
    lineHeight: 24,
  },
  langFlag: {
    marginRight: 30,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 24,
  },
  titleContainer: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: 10,
    height: 80,
    width: 80,
  },
  headerText: {
    padding: 10,
    fontFamily: 'BreeSerif-Regular',
    fontSize: 36,
    marginTop: 60,
    color: colors.white,
    textAlign: 'center',
    textShadowColor: colors.black,
    textShadowOffset: {height: -1, width: 1},
    textShadowRadius: 1,
  },
});
