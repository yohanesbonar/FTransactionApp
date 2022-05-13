import React from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {Body, DeleteIcon, Header, Right, Title} from 'native-base';
import _ from 'lodash';
import {formatDate, formatRupiah} from '../../utils/common';

const CardItemTransactionList = ({
  senderBank,
  beneficiaryBank,
  beneficiaryName,
  onPress,
  statusTransaction,
  completeAt,
  createdAt,
  fee,
}) => {
  return (
    <TouchableOpacity
      style={styles.containerEachData}
      onPress={onPress}
      disabled={!onPress ? true : false}>
      <View>
        <View style={styles.containerLineStyle(statusTransaction)} />
      </View>

      <View style={styles.containerBankDesc}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.textSenderBank}>
              {senderBank ? senderBank : null}
            </Text>
            <Text style={styles.textBeneficiaryBank}>
              {beneficiaryBank ? ' -> ' + beneficiaryBank : null}
            </Text>
          </View>
          <Text style={styles.textBeneficiaryName}>
            {beneficiaryName ? beneficiaryName : null}
          </Text>
          <View style={styles.containerFeeDate}>
            <Text style={styles.textFee}>
              {fee >= 0 ? formatRupiah(fee.toString(), 'Rp') : null}
            </Text>
            {/* <Text style={styles.textStatus}>
            {statusTransaction == 'SUCCESS'
              ? ' • ' + formatDate(completeAt)
              : ' • ' + formatDate(createdAt)}
          </Text> */}
            <Text style={styles.textStatus}>
              {' • ' + formatDate(createdAt)}
            </Text>
          </View>
        </View>
        <View style={styles.containerBadgeStatus}>
          <View
            style={
              statusTransaction == 'SUCCESS'
                ? styles.successStatusContainer
                : styles.pendingStatusContainer
            }>
            <Text
              style={
                statusTransaction == 'SUCCESS'
                  ? styles.successStatusTextStyle
                  : styles.pendingStatusTextStyle
              }>
              {statusTransaction == 'SUCCESS' ? 'Berhasil' : 'Pengecekan'}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardItemTransactionList;

const styles = StyleSheet.create({
  containerEachData: {
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderColor: '#0000001F',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerLineStyle: status => [
    {
      flex: 1,
      width: 8,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      backgroundColor: status && status == 'SUCCESS' ? '#57b487' : '#e47763',
    },
  ],
  containerBankDesc: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  textSenderBank: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    letterSpacing: 0.15,
    color: '#000000',
    textTransform: 'uppercase',
  },
  textBeneficiaryBank: {
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 24,
    letterSpacing: 0.15,
    color: '#000000',
    textTransform: 'uppercase',
  },
  textBeneficiaryName: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.15,
    color: '#000000',
    textTransform: 'uppercase',
  },
  containerFeeDate: {
    flexDirection: 'row',
    flex: 1,
  },
  textFee: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.15,
    color: '#000000',
  },
  textStatus: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.15,
    color: '#000000',
  },
  containerBadgeStatus: {
    alignSelf: 'center',
  },
  successStatusContainer: {
    backgroundColor: '#5ab385',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  pendingStatusContainer: {
    backgroundColor: '#FFF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderColor: '#e48b66',
    borderWidth: 1.5,
  },
  successStatusTextStyle: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
    letterSpacing: 0.12,
    color: '#FFFFFF',
  },
  pendingStatusTextStyle: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
    letterSpacing: 0.12,
    color: '#000000',
  },
});
