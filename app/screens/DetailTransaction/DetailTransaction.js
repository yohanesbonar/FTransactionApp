import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {View} from 'react-native';
import HeaderToolbar from './../../../app/components/molecules/HeaderToolbar';

const DetailTransaction = ({navigation}) => {
  const handleBackButton = () => {
    navigation.goBack();
  };
  return (
    <NativeBaseProvider>
      <HeaderToolbar
        title={'Detail Transaction'}
        onPressBack={() => handleBackButton()}
      />
    </NativeBaseProvider>
  );
};

export default DetailTransaction;
