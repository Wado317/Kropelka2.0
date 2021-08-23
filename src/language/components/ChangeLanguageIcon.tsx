import React from 'react';
import {TouchableOpacity, StyleSheet, Image} from 'react-native';

import {LANGUAGES} from '../constants';
import {colors} from '../../const/colors';
import useLanguage from '../hooks/useLanguage';

type Props = {
  onPress: () => void;
};

const ChangeLanguageIcon: React.FC<Props> = ({onPress}) => {
  const {currentLanguage} = useLanguage();
  const LanguageIcon = LANGUAGES[currentLanguage]?.icon;

  return LanguageIcon ? (
    <TouchableOpacity onPress={onPress} style={styles.langIcon}>
      <Image source={LanguageIcon} style={{height: 28, width: 28}} />
    </TouchableOpacity>
  ) : null;
};

export default ChangeLanguageIcon;

const styles = StyleSheet.create({
  langIcon: {
    borderRadius: 14,
    borderColor: colors.black,
    borderWidth: 1,
    alignSelf: 'center',
    marginBottom: 24,
    overflow: 'hidden',
  },
});
