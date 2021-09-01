import React, {useMemo, useState} from 'react';
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
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {colors} from '../../const/colors';
import {createDonation} from '../../store/actions/donationActions';
import {AddButton} from '../Buttons/AddButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DateService from '../../services/DateService';

interface Props {
  children: any;
}

const DismissKeyboard = ({children}: Props) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const NewDonationModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const currentTimestamp = DateService.getCurrentTimestamp;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(currentTimestamp);
  const selectedDateString = useMemo(
    () => DateService.formatTimestampToString(selectedDate),
    [selectedDate],
  );

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const timestamp = DateService.formatDateToTimestamp(date);
    setSelectedDate(timestamp);

    hideDatePicker();
  };

  const {t} = useTranslation();
  const dispatch = useDispatch();

  const submitHandler = () => {
    dispatch(
      createDonation(
        selectedDateString,
        () => {
          Keyboard.dismiss();
        },
        () => {
          Alert.alert('Something went wrong, please try again!');
        },
      ),
    );
  };

  return (
    <DismissKeyboard>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                {t('homeScreen.modalHeader')}
              </Text>
              <TouchableOpacity onPress={showDatePicker}>
                <Text style={styles.chooseDate}>Zmień wybraną datę</Text>
                <Text style={styles.pickedDate}>{selectedDateString}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                minimumDate={new Date(1990, 0, 1)}
                maximumDate={new Date(2050, 10, 20)}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={submitHandler}
                onPressOut={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>{t('homeScreen.confirm')}</Text>
              </Pressable>
              <Pressable
                style={[styles.button2, styles.buttonClose2]}
                onPressOut={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle2}>{t('homeScreen.cancel')}</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <AddButton
          label={t('homeScreen.add')}
          onPress={() => setModalVisible(true)}
        />
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
  pickedDate: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: colors.blue,
    marginTop: 5,
  },
  chooseDate: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: colors.blue,
  },
});

export default NewDonationModal;
