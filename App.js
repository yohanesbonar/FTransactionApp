import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import HeaderToolbar from './app/components/molecules/HeaderToolbar';

const App = ({navigation}) => {
  return (
    <View>
      <HeaderToolbar title={'Transaction List'} />
    </View>
  );
};

export default App;
