import { NativeBaseProvider } from 'native-base';
import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import HeaderToolbar from '../../components/molecules/HeaderToolbar';

const TransactionList = ({navigation}) => {
  return (
    <NativeBaseProvider>
      <HeaderToolbar title={'Transaction List'} />
      <TouchableOpacity
        onPress={() => navigation.navigate('DetailTransaction')}>
        <Text>To Detail</Text>
      </TouchableOpacity>
      </NativeBaseProvider>
  );
};

export default TransactionList;
