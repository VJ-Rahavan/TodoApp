import {NavigationContainer} from '@react-navigation/native';
import CardItem from 'components/card-item/CardItem';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AuthProvider from 'redux/store';
import MyStack from 'screens/root/RootScreen';

const App = () => {
  return (
    <SafeAreaProvider style={{flex: 1}}>
      <AuthProvider>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  deleteButton: {
    color: 'red',
  },
});

export default App;
