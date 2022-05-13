import Clipboard from '@react-native-community/clipboard';
import {NativeBaseProvider, Icon, Toast} from 'native-base';
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import HeaderToolbar from './../../../app/components/molecules/HeaderToolbar';

const DetailTransaction = ({route, navigation}) => {
  console.log('params', route.params);
  let data = route.params.data ? route.params.data : {};
  const handleBackButton = () => {
    navigation.goBack();
  };

  const copyToClipboard = text => {
    Clipboard.setString(text.toString());
    Toast.show({
      title: 'Nomor ID Transaksi berhasil disalin.',
      duration: 1500,
    });
  };

  return (
    <NativeBaseProvider>
      <HeaderToolbar
        title={'Detail Transaction'}
        onPressBack={() => handleBackButton()}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textIDTransaction}>
            {'ID TRANSAKSI: #' + data.id}
          </Text>
          <TouchableOpacity
            style={styles.touchAbleStyleIconCopy}
            onPress={() => copyToClipboard(data.id)}>
            <Image
              source={require('../../assets/images/ic-copy.png')}
              style={styles.iconCopyStyle}
            />
          </TouchableOpacity>
        </View>
        <Icon name="ios-copy" style={{color: '#384850'}} />
      </View>
    </NativeBaseProvider>
  );
};

export default DetailTransaction;

const styles = StyleSheet.create({
  textIDTransaction: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.15,
    color: '#000000',
    textTransform: 'uppercase',
  },
  iconCopyStyle: {width: 20, height: 20, marginTop: 3},
  touchAbleStyleIconCopy: {marginLeft: 5},
});
