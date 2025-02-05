import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from 'redux/store';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';

const NewTodoScreen = () => {
  const [newTodo, setNewTodo] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  const navigation = useNavigation();

  const {modifyTodoList} = useContext(AuthContext);

  const handleAddTodo = () => {
    const newText = newTodo.trim();

    const payload = {
      text: newText,
      id: Date.now().toString(),
      date: '',
      description: '',
      notify: false,
      time: '',
    };

    if (newText) {
      modifyTodoList(payload, 'ADD');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 40,
            marginHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              position: 'absolute',
              backgroundColor: '#F8F8F8',
              paddingVertical: 7,
              paddingHorizontal: 12,
              borderRadius: 8,
              left: 0,
            }}>
            <FontAwesome6 name="chevron-left" size={20} color="#959595" />
          </TouchableOpacity>
          <View>
            <Text style={styles.header}>Create New Task</Text>
          </View>
        </View>

        <View style={{paddingHorizontal: 20, marginTop: 30}}>
          <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 16}}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Add new todo"
              value={newTodo}
              onChangeText={setNewTodo}
            />
          </View>

          <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 16}}>Description</Text>
            <TextInput
              style={[styles.input, {height: 120, paddingVertical: 10}]}
              placeholder="Optional"
              value={newTodo}
              multiline
              maxLength={256}
              numberOfLines={3}
              onChangeText={setNewTodo}
            />
          </View>

          <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: '500'}}>
              Show Notification
            </Text>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderRadius: 20,
                paddingHorizontal: 8,
                gap: 4,
              }}>
              <Text
                style={{
                  borderRightWidth: 1,
                  paddingVertical: 4,
                  paddingRight: 8,
                }}>
                High
              </Text>
              <Text>Low</Text>
              <Text>Medium</Text>
            </View>
          </View>

          <View
            style={{
              marginBottom: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: '500'}}>
              Show Notification
            </Text>
            <Switch
              value={showNotification}
              onChange={() => setShowNotification(!showNotification)}
            />
          </View>
        </View>

        <Button title="Add Todo" onPress={handleAddTodo} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginTop: 5,
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

export default NewTodoScreen;
