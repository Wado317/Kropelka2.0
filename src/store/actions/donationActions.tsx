import AsyncStorage from '@react-native-async-storage/async-storage';

import {DonationActions} from '../types';
import {STORAGE_KEYS} from '../../const/storage';
import store from '..';
import {v4 as uuidv4} from 'uuid';
import {useState} from 'react';

export const getDonations = (onSuccess = () => {}, onError = () => {}) => {
  return async dispatch => {
    try {
      const donationsRes = await AsyncStorage.getItem(STORAGE_KEYS.donations);
      const donations = donationsRes ? JSON.parse(donationsRes) : [];

      dispatch({
        type: DonationActions.SET_DONATIONS,
        payload: donations,
      });
      onSuccess();
    } catch (error) {
      console.log(error);
      onError();
    }
  };
};

export const createDonation = (
  date: string,
  onSuccess = () => {},
  onError = () => {},
) => {
  return async dispatch => {
    try {
      const uuid = uuidv4();
      const newDonation: any = {
        blood: '450 ml',
        date,
        id: uuid,
      };

      const {donations} = store.getState().donation;

      const donationsCopy = [...donations];
      donationsCopy.push(newDonation);
      await AsyncStorage.setItem(
        STORAGE_KEYS.donations,
        JSON.stringify(donationsCopy),
      );

      dispatch({
        type: DonationActions.SET_DONATIONS,
        payload: donationsCopy,
      });
      onSuccess();
    } catch (error) {
      console.log(error);
      onError();
    }
  };
};

export const deleteDonation = (
  id: string,
  onSuccess = () => {},
  onError = () => {},
) => {
  return async dispatch => {
    try {
      const {donations} = store.getState().donation;

      const donationsCopy = [...donations];
      const filteredDonations = donationsCopy.filter(d => d.id !== id);
      await AsyncStorage.setItem(
        STORAGE_KEYS.donations,
        JSON.stringify(filteredDonations),
      );

      dispatch({
        type: DonationActions.SET_DONATIONS,
        payload: filteredDonations,
      });
      onSuccess();
    } catch (error) {
      console.log(error);
      onError();
    }
  };
};

export const editDonation = (
  date: string,
  id: string,
  onSuccess = () => {},
  onError = () => {},
) => {
  return async dispatch => {
    try {
      let {donations} = store.getState().donation;
      if (!donations) {
        throw Error('No devices');
      }

      const donationsIndex = donations.findIndex(
        (donation: any) => donation.id === id,
      );
      donations[donationsIndex].date = date;
      await AsyncStorage.setItem(
        STORAGE_KEYS.donations,
        JSON.stringify(donations),
      );

      dispatch({
        type: DonationActions.SET_DONATIONS,
        payload: donations,
      });
      onSuccess();
    } catch (error) {
      console.log(error);
      onError();
    }
  };
};
