import {NativeBaseProvider} from 'native-base';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CardItemTransactionList from '../../components/molecules/CardItemTransactionList';
import HeaderToolbar from '../../components/molecules/HeaderToolbar';
import {getTransactionList} from '../../components/utils/network/transaction';

const TransactionList = ({navigation}) => {
  const [dataTransaction, setDataTransaction] = useState({});
  const [isRefreshData, setIsRefreshData] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (isRefreshData) {
      setIsRefreshData(false);
      getData();
    }
  }, [isRefreshData]);

  const onRefresh = () => {
    setDataTransaction({});
    setIsRefreshData(true);
  };

  const getData = async () => {
    try {
      let response = await getTransactionList();
      if (response) {
        console.log('response', response);
        setDataTransaction(response);
      }
      // console.log('response', response);
    } catch (error) {
      console.log('Error getTransactionList', error);
    }
  };

  const renderSampleData = () => {
    return (
      <View>
        {Object.entries(dataTransaction).map(([key, value]) => {
          return (
            <View key={key}>
              <Text> {value.status.toString()}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  const renderData = item => {
    return (
      <CardItemTransactionList
        onPress={() =>
          navigation.navigate('DetailTransaction', {
            data: dataTransaction[item],
          })
        }
        senderBank={dataTransaction[item].sender_bank}
        beneficiaryBank={dataTransaction[item].beneficiary_bank}
        beneficiaryName={dataTransaction[item].beneficiary_name}
        statusTransaction={dataTransaction[item].status}
        fee={dataTransaction[item].fee}
        completeAt={dataTransaction[item].completed_at}
        createdAt={dataTransaction[item].created_at}
      />
    );
  };

  return (
    <NativeBaseProvider>
      <HeaderToolbar title={'Transaction List'} />
      <View style={styles.mainContainer}>
        <FlatList
          onRefresh={onRefresh}
          style={styles.flatlistStyleContainer}
          data={Object.keys(dataTransaction)}
          renderItem={({item}) => renderData(item)}
          refreshing={false}
        />
      </View>
    </NativeBaseProvider>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  flatlistStyleContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 60,
  },
  mainContainer: {
    backgroundColor: '#f4faf8',
    flex: 1,
    paddingBottom: 20,
  },
});
