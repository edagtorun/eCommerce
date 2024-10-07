import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import Routes from './src/navigators/Routes';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

export default function App() {
  return (
   <SafeAreaView style={styles.Container}>
    <NavigationContainer>
    <Routes/>
    </NavigationContainer>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container:{
    flex:1,
  },
});