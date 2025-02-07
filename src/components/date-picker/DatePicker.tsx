import React, {useState} from 'react';
import {Button} from 'react-native';
import DatePicker from 'react-native-date-picker';

const CustomDatePicker = ({date, setDate}: any) => {
  return (
    <DatePicker
      modal
      open={date.show}
      minimumDate={new Date()}
      date={date.date}
      onConfirm={date => {
        console.log(date);
        setDate({
          date: date,
          show: false,
        });
      }}
      onCancel={() => {
        setDate({
          date: new Date(),
          show: false,
        });
      }}
    />
  );
};

export default CustomDatePicker;
