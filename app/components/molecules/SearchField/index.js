import {Icon, Input, Item, Text, Toast} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
const SearchField = ({
    onChangeText,
    placeholder
}) => {
  return (
    <View style={styles.mainContainer}>
      <Image
        source={require('../../../assets/images/ic-search.png')}
        style={styles.iconSearchStyle}
      />
      <TextInput style={styles.textInput} onChangeText={(text) => onChangeText(text)} placeholder={placeholder}/>
      <TouchableOpacity style={styles.containerSort}>
        <Text style={styles.textSort}>URUTKAN V</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchField;

const styles = StyleSheet.create({
  iconSearchStyle: {
    width: 24,
    height: 24,
    marginRight: 6,
    marginBottom: -4,
  },
  textSort: {
    color: '#fb8f86',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.15,
    marginHorizontal: 6,
  },
  mainContainer: {
    margin: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
  },
  textInput: {
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.15,
    color: '#000000',
    flex: 1,
    marginTop: -5
  },
  containerSort: {flexDirection: 'row'},
});
