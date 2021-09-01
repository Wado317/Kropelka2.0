import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {colors} from '../../const/colors';
import DateService from '../../services/DateService';

const DatePicker = () => {
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
    console.warn('A date has been picked: ', timestamp);

    hideDatePicker();
  };

  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
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

export default DatePicker;
