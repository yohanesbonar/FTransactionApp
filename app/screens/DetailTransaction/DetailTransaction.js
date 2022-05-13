import Clipboard from '@react-native-community/clipboard';
import {NativeBaseProvider, Icon, Toast} from 'native-base';
import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {formatDate, formatRupiah} from '../../components/utils/common';
import HeaderToolbar from './../../../app/components/molecules/HeaderToolbar';

const DetailTransaction = ({route, navigation}) => {
  console.log('params', route.params);
  let data = route.params.data ? route.params.data : {};
  const [isExpanded, setIsExpanded] = useState(false);
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
      <View style={styles.mainContainer}>
        <View style={styles.containerIDtransaction}>
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
        <View style={styles.containerLineGrey}></View>
        <View style={styles.containerExpandDetail}>
          <Text style={styles.textTransactionDetail}>DETAIL TRANSAKSI</Text>
          <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
            <Text style={styles.textOpen}>{isExpanded ? 'Tutup' : 'Buka'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.secondContainerLineGrey}></View>
        {isExpanded && (
          <View style={{paddingVertical: 16}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.textSenderBank}>
                {data.sender_bank ? data.sender_bank : null}
              </Text>
              <Text style={styles.textBeneficiaryBank}>
                {data.beneficiary_bank ? ' → ' + data.beneficiary_bank : null}
              </Text>
            </View>
            <View style={styles.containerSection}>
              <View style={styles.innerLeftSection}>
                <Text style={styles.textLabel(true)}>
                  {data.beneficiary_name ? data.beneficiary_name : null}
                </Text>
                <Text style={styles.textValue}>
                  {data.account_number ? data.account_number : null}
                </Text>
              </View>
              <View style={styles.innerRightSection}>
                <Text style={styles.textLabel(true)}>NOMINAL</Text>
                <Text style={styles.textValue}>
                  {formatRupiah(data.fee.toString(), 'Rp ')}
                </Text>
              </View>
            </View>
            <View style={styles.containerSection}>
              <View style={styles.innerLeftSection}>
                <Text style={styles.textLabel(true)}>BERITA TRANSFER</Text>
                <Text style={styles.textValue}>
                  {data.remark ? data.remark : null}
                </Text>
              </View>
              <View style={styles.innerRightSection}>
                <Text style={styles.textLabel(true)}>KODE UNIK</Text>
                <Text style={styles.textValue}>
                  {data.unique_code ? data.unique_code : null}
                </Text>
              </View>
            </View>
            <View style={styles.containerSection}>
              <View style={styles.innerLeftSection}>
                <Text style={styles.textLabel(true)}>WAKTU DIBUAT</Text>
                <Text style={styles.textValue}>
                  {data.created_at ? formatDate(data.created_at) : null}
                </Text>
              </View>
            </View>
          </View>
        )}
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
  containerLineGrey: {
    backgroundColor: '#f9f9f9',
    height: 2,
    marginTop: 16,
    marginHorizontal: -5,
  },
  secondContainerLineGrey: {
    backgroundColor: '#e6e6e6',
    height: 1.5,
    marginHorizontal: -5,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  containerIDtransaction: {flexDirection: 'row'},
  containerExpandDetail: {
    justifyContent: 'space-between',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  textTransactionDetail: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.15,
    color: '#000000',
    textTransform: 'uppercase',
  },
  textOpen: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.15,
    color: '#f36a3b',
  },
  textSenderBank: {
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: 0.15,
    color: '#000000',
    textTransform: 'uppercase',
  },
  textBeneficiaryBank: {
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: 0.15,
    color: '#000000',
    textTransform: 'uppercase',
  },
  textLabel: isUppercase => [
    {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
      letterSpacing: 0.15,
      color: '#000000',
      textTransform: isUppercase ? 'uppercase' : null,
    },
  ],
  textValue: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    letterSpacing: 0.15,
    color: '#000000',
  },
  containerSection: {flexDirection: 'row', marginTop: 16},
  innerLeftSection: {flex: 0.6},
  innerRightSection: {flex: 0.4},
});
