import React, {Component, useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import {Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {colors} from '../../const/colors';
import { createDevice, editDevice, getDeviceId } from '../../store/actions/deviceActions';
import {UniversalInput} from '../Inputs/Input';

interface Props {
  children: any
};

const DismissKeyboard = ({children}: Props) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const EditModal = ({ visible, onClose, onConfirm, isEdit, editedDeviceId }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name , setName] = useState<string>('');
  const [roomName, setRoomName] = useState<string>('');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {devices} = useSelector((state: any) => state.device)

  
  useEffect(() => {
    if (isEdit) {
      const device = devices.find((item: any) => item.id === editedDeviceId)
      setName(device.name)
      setRoomName(device.roomName)
    }
  }, [isEdit]);  

  const submitEditHandler = (id: string) => {
    if (name.trim() === '' || roomName.trim() === '') {
      return Alert.alert('Validation', 'Name is required!');
    }
    dispatch(
      editDevice(
        name,
        roomName,
        id,
        () => Keyboard.dismiss()
      ),
    );
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
            <Text style={styles.modalText}>{t('mainScreen.editHeader')}</Text>
            <View>
              <UniversalInput 
                placeholder={t('mainScreen.enterDevice')} 
                label={t('mainScreen.device')} 
                onChangeText={val => setName(val)} 
                value={name}
              />
            </View>
            <View>
              <UniversalInput 
                placeholder={t('mainScreen.enterRoom')} 
                label={t('mainScreen.room')} 
                onChangeText={val => setRoomName(val)}
                value={roomName}
              />
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => submitEditHandler(editedDeviceId)}
              onPressOut={onConfirm}>
              <Text style={styles.textStyle}>{t('mainScreen.confirm')}</Text>
            </Pressable>
            <Pressable
              style={[styles.button2, styles.buttonClose2]}
              onPressOut={onClose}>
              <Text style={styles.textStyle2}>{t('mainScreen.cancel')}</Text>
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
    backgroundColor: colors.darkBlue,
  },
  buttonClose2: {
    backgroundColor: colors.white,
    borderColor: colors.darkBlue,
    borderWidth: 1,
  },
  textStyle: {
    color: colors.white,
    fontFamily: 'Lobster-Regular',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  textStyle2: {
    color: colors.darkBlue,
    fontFamily: 'Lobster-Regular',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  modalText: {
    marginBottom: 15,
    fontFamily: 'Lobster-Regular',
    textAlign: 'center',
    fontSize: 24,
    color: colors.darkBlue,
  },
    addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.darkBlue,
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
    fontFamily: 'Lobster-Regular',
    fontSize: 20,
    color: colors.darkBlue,
    textShadowColor: colors.black,
    textShadowOffset: {height: -1, width: 1},
    textShadowRadius: 1
  }
});

export default EditModal;
