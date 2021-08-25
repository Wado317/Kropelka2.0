import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../const/colors';
import {editDonation} from '../../store/actions/donationActions';
import {UniversalInput} from '../Inputs/Input';

interface Props {
  children: any;
}

const DismissKeyboard = ({children}: Props) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const EditModal = ({
  visible,
  onClose,
  onConfirm,
  isEdit,
  editedDonationId,
}: any) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [date, setDate] = useState<string>('');
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {donations} = useSelector((state: any) => state.donation);

  useEffect(() => {
    if (isEdit) {
      const donation = donations.find(
        (item: any) => item.id === editedDonationId,
      );
      setDate(donation.date);
    }
  }, [isEdit]);

  const submitEditHandler = (id: string) => {
    if (date.trim() === '') {
      return Alert.alert('Validation', 'Name is required!');
    }
    dispatch(editDonation(date, id, () => Keyboard.dismiss()));
  };

  return (
    <DismissKeyboard>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{t('homeScreen.editHeader')}</Text>
              <View>
                <UniversalInput
                  placeholder={t('homeScreen.enterDonation')}
                  label={t('homeScreen.donation')}
                  onChangeText={val => setDate(val)}
                  value={date}
                />
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => submitEditHandler(editedDonationId)}
                onPressOut={onConfirm}>
                <Text style={styles.textStyle}>{t('homeScreen.confirm')}</Text>
              </Pressable>
              <Pressable
                style={[styles.button2, styles.buttonClose2]}
                onPressOut={onClose}>
                <Text style={styles.textStyle2}>{t('homeScreen.cancel')}</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginVertical: 5,
  },
  modalView: {
    margin: 20,
    width: '90%',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '65%',
    marginTop: 15,
  },
  button2: {
    borderRadius: 20,
    padding: 9,
    elevation: 2,
    marginTop: 10,
    width: '65%',
  },
  buttonClose: {
    backgroundColor: colors.danger,
  },
  buttonClose2: {
    backgroundColor: colors.white,
    borderColor: colors.danger,
    borderWidth: 1,
  },
  textStyle: {
    color: colors.white,
    fontFamily: 'BreeSerif-Regular',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  textStyle2: {
    color: colors.danger,
    fontFamily: 'BreeSerif-Regular',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    fontFamily: 'BreeSerif-Regular',
    textAlign: 'center',
    fontSize: 24,
    color: colors.danger,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 30,
    height: 45,
    width: 110,
    marginTop: 5,
    //shadow
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.18,
    shadowRadius: 4.62,

    elevation: 4,
  },
  buttonPlus: {
    fontFamily: 'BreeSerif-Regular',
    fontSize: 20,
    color: colors.danger,
    textShadowColor: colors.black,
    textShadowOffset: {height: -1, width: 1},
    textShadowRadius: 1,
  },
});

export default EditModal;
