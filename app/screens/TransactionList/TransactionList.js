import {NativeBaseProvider} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View, Modal} from 'react-native';
import OptionRadioButton from '../../components/atoms/OptionRadioButton';
import CardItemTransactionList from '../../components/molecules/CardItemTransactionList';
import HeaderToolbar from '../../components/molecules/HeaderToolbar';
import SearchField from '../../components/molecules/SearchField';
import {
  ascendingSortName,
  dateSort,
  descendingSortName,
  useDebouncedEffect,
} from '../../components/utils/common';
import {getTransactionList} from '../../components/utils/network/transaction';

const TransactionList = ({navigation}) => {
  const [dataTransactionObj, setDataTransactionObj] = useState({});
  const [dataTransactionArr, setDataTransactionArr] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isRefreshData, setIsRefreshData] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  const [isOpenModalize, setIsOpenModalize] = useState(false);
  const [optionSortValue, setOptionSortValue] = useState('default');

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (isRefreshData) {
      setValueSearch('');
      setOptionSortValue('default');
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
        setFilteredData(asArray);
      }
    } catch (error) {
      console.log('Error getTransactionList', error);
    }
  };

  const renderData = ({item}) => {
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
    let data;
    if (optionSortValue != 'default') {
      data = filteredData;
    } else {
      data = dataTransactionArr;
    }
    let filtered = data.filter(
      (value, key) =>
        value.beneficiary_name.toLowerCase().includes(textLowerCase) == true ||
        value.sender_bank.toLowerCase().includes(textLowerCase) == true ||
        value.beneficiary_bank.toLowerCase().includes(textLowerCase) == true ||
        value.fee.toString().includes(textLowerCase) == true,
    );
    if (text != '') {
      setFilteredData(filtered);
    } else {
      if (optionSortValue != 'default') {
        checkOptionSortValue(optionSortValue);
      } else {
        setFilteredData(dataTransactionArr);
      }
    }
  };

  const changeValueSearch = text => {
    setValueSearch(text);
  };

  const renderSearchContainer = () => {
    let valueSort =
      optionSortValue == 'default'
        ? 'URUTKAN'
        : optionSortValue == 'ascending'
        ? 'Nama A-Z'
        : optionSortValue == 'descending'
        ? 'Nama Z-A'
        : optionSortValue == 'latestDate'
        ? 'Tanggal Terbaru'
        : 'Tanggal Terlama';
    return (
      <View>
        <SearchField
          onChangeText={text => changeValueSearch(text)}
          placeholder={'Cari nama, bank, atau nominal'}
          onPressSortButton={() => onOpenModalize()}
          valueSort={valueSort}
        />
      </View>
    );
  };

  const onOpenModalize = () => {
    setIsOpenModalize(true);
  };

  const checkOptionSortValue = value => {
    setIsOpenModalize(false);
    setOptionSortValue(value);

    if (value == 'ascending') {
      setFilteredData(
        ascendingSortName(
          valueSearch != '' ? filteredData : dataTransactionArr,
        ),
      );
    } else if (value == 'descending') {
      setFilteredData(
        descendingSortName(
          valueSearch != '' ? filteredData : dataTransactionArr,
        ),
      );
    } else if (value == 'latestDate') {
      setFilteredData(
        dateSort(
          'latest',
          valueSearch != '' ? filteredData : dataTransactionArr,
        ),
      );
    } else if (value == 'oldestDate') {
      setFilteredData(
        dateSort(
          'oldest',
          valueSearch != '' ? filteredData : dataTransactionArr,
        ),
      );
    } else {
      setFilteredData(valueSearch != '' ? filteredData : dataTransactionArr);
    }
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
            <OptionRadioButton
              onPress={() => checkOptionSortValue('default')}
              categoryName={'URUTKAN'}
              selected={optionSortValue == 'default' ? true : false}
            />
            <OptionRadioButton
              onPress={() => checkOptionSortValue('ascending')}
              categoryName={'Nama A-Z'}
              selected={optionSortValue == 'ascending' ? true : false}
            />
            <OptionRadioButton
              onPress={() => checkOptionSortValue('descending')}
              categoryName={'Nama Z-A'}
              selected={optionSortValue == 'descending' ? true : false}
            />
            <OptionRadioButton
              onPress={() => checkOptionSortValue('latestDate')}
              categoryName={'Tanggal Terbaru'}
              selected={optionSortValue == 'latestDate' ? true : false}
            />
            <OptionRadioButton
              onPress={() => checkOptionSortValue('oldestDate')}
              categoryName={'Tanggal Terlama'}
              selected={optionSortValue == 'oldestDate' ? true : false}
            />
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
          data={filteredData}
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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 16,
    paddingLeft: 10,
    paddingRight: 18,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: 'column',
  },
});
