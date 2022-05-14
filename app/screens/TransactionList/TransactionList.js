import {NativeBaseProvider} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import CardItemTransactionList from '../../components/molecules/CardItemTransactionList';
import HeaderToolbar from '../../components/molecules/HeaderToolbar';
import SearchField from '../../components/molecules/SearchField';
import {useDebouncedEffect} from '../../components/utils/common';
import {getTransactionList} from '../../components/utils/network/transaction';

const TransactionList = ({navigation}) => {
  const [dataTransactionObj, setDataTransactionObj] = useState({});
  const [dataTransactionArr, setDataTransactionArr] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isRefreshData, setIsRefreshData] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  const [isOpenModalize, setIsOpenModalize] = useState(false);

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
    setDataTransactionObj({});
    setIsRefreshData(true);
  };

  const getData = async () => {
    try {
      let response = await getTransactionList();
      if (response) {
        setDataTransactionObj(response);
        let asArray = Object.keys(response).map(key => response[key]);
        setDataTransactionArr(asArray);
      }
    } catch (error) {
      console.log('Error getTransactionList', error);
    }
  };

  const renderData = ({item}) => {
    console.log('item', item);
    // dataTransaction[item].fee = 150000;
    return (
      <CardItemTransactionList
        onPress={() =>
          navigation.navigate('DetailTransaction', {
            data: item,
          })
        }
        senderBank={item.sender_bank}
        beneficiaryBank={item.beneficiary_bank}
        beneficiaryName={item.beneficiary_name}
        statusTransaction={item.status}
        fee={item.fee}
        completeAt={item.completed_at}
        createdAt={item.created_at}
      />
    );
  };

  useDebouncedEffect(
    () => {
      console.log(' useDebouncedEffect valueSearch', valueSearch); // debounced 1sec
      onSearch(valueSearch);
    },
    1000,
    [valueSearch],
  );

  const onSearch = text => {
    let textLowerCase = text.toLowerCase();
    console.log('text', textLowerCase);
    let filtered = dataTransactionArr.filter(
      (value, key) =>
        value.beneficiary_name.toLowerCase().includes(textLowerCase) == true ||
        value.sender_bank.toLowerCase().includes(textLowerCase) == true ||
        value.beneficiary_bank.toLowerCase().includes(textLowerCase) == true ||
        value.fee.toString().includes(textLowerCase) == true,
    );
    console.log('filtered', filtered);
    setFilteredData(filtered);
  };

  const changeValueSearch = text => {
    setValueSearch(text);
  };

  const renderSearchContainer = () => {
    return (
      <View>
        <SearchField
          onChangeText={text => changeValueSearch(text)}
          placeholder={'Cari nama, bank, atau nominal'}
          onPressSortButton={() => onOpenModalize()}
        />
      </View>
    );
  };

  const onOpenModalize = () => {
    setIsOpenModalize(true);
  };

  const renderBottomSheet = () => {
    return (
      <Modal
        animationType="fade"
        visible={isOpenModalize}
        transparent={true}
        onRequestClose={() => setIsOpenModalize(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => setIsOpenModalize(false)}>
              <Text>close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <NativeBaseProvider>
      {renderBottomSheet()}
      <HeaderToolbar title={'Transaction List'} />
      <View style={styles.mainContainer}>
        {renderSearchContainer()}
        <FlatList
          onRefresh={onRefresh}
          style={styles.flatlistStyleContainer}
          data={valueSearch != '' ? filteredData : dataTransactionArr}
          renderItem={renderData}
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
