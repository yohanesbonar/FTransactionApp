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
const OptionRadioButton = ({onPress, categoryName, selected}) => {
  const renderRadioButton = () => {
    return (
      <View
        style={[
          styles.circleRadioButton,
          {
            borderColor: selected ? '#D01E53' : '#454F63',
          },
        ]}>
        {selected ? (
          <View
            style={[
              styles.circleSelected,
              {
                backgroundColor: '#D01E53',
              },
            ]}
          />
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.mainViewContainer}>
      <TouchableOpacity style={styles.touchableView} onPress={onPress}>
        {renderRadioButton()}
        <Text style={styles.textCategory}>{categoryName}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OptionRadioButton;

const styles = StyleSheet.create({
  mainViewContainer: {
    paddingVertical: 16,
    borderRadius: 8,
  },
  touchableView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerViewText: {
    flex: 1,
  },
  circleSelected: {
    height: 12,
    width: 12,
    borderRadius: 6,
  },
  circleRadioButton: {
    height: 24,
    width: 24,
    marginHorizontal: 12,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCategory: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
    color: "#000000"
  },
});
