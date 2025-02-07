import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from 'redux/store';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {TodoType} from 'src/types/store-types';
import {colors, defaultTodoValue} from 'utils/constants';
import CustomDatePicker from 'components/date-picker/DatePicker';
import {format} from 'date-fns';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Animated, {ZoomIn} from 'react-native-reanimated';

const NewTodoScreen = () => {
  const {modifyTodoList, selectedTodoData, storeSelectedData} =
    useContext(AuthContext);
  const [newTodo, setNewTodo] = useState<TodoType>(
    selectedTodoData ?? {...defaultTodoValue, id: new Date().toString()},
  );
  const [date, setDate] = useState({date: new Date(), show: false});
  const navigation = useNavigation();

  useEffect(() => {
    return () => {
      storeSelectedData(null);
    };
  }, []);

  const onChangeHandler = (key: string, value: string | boolean) => {
    setNewTodo(prev => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  useEffect(() => {
    const formattedDate = format(date.date, 'EEEE, do MMMM yyyy, hh:mm a');
    onChangeHandler('date', formattedDate);
  }, [date.date]);

  const handleAddTodo = () => {
    if (selectedTodoData) modifyTodoList(newTodo, 'UPDATE');
    else modifyTodoList(newTodo, 'ADD');
    navigation.goBack();
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

        <View style={{paddingHorizontal: 20, marginTop: 30, flex: 1}}>
          <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 16, fontWeight: '500'}}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Add new todo"
              value={newTodo.title}
              onChangeText={onChangeHandler.bind(null, 'title')}
            />
          </View>

          <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 16, fontWeight: '500'}}>Description</Text>
            <TextInput
              style={[styles.input, {height: 120, paddingVertical: 10}]}
              placeholder="Optional"
              value={newTodo.description}
              multiline
              maxLength={256}
              numberOfLines={3}
              onChangeText={onChangeHandler.bind(null, 'description')}
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
            <Switch
              value={newTodo.notify}
              onChange={onChangeHandler.bind(null, 'notify', !newTodo.notify)}
            />
          </View>

          {newTodo.notify && (
            <Animated.View
              entering={ZoomIn.duration(400)}
              style={{
                marginBottom: 10,
                marginTop: 10,
              }}>
              <View style={{marginBottom: 10}}>
                <Text style={{fontSize: 16, fontWeight: '500'}}>
                  Notification Date & Time
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setDate({date: date.date, show: true});
                }}
                style={{
                  borderWidth: 1,
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  borderColor: '#00000040',
                  paddingVertical: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    paddingVertical: 4,
                  }}>
                  {newTodo.date}
                </Text>

                <View
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 8,
                    backgroundColor: '#6857E720',
                    borderRadius: 20,
                  }}>
                  <Icon
                    name="calendar-alt"
                    size={18}
                    color={colors.primaryColor}
                  />
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>

        <CustomDatePicker date={date} setDate={setDate} />

        {selectedTodoData && (
          <TouchableOpacity
            onPress={() => {
              modifyTodoList(
                {...newTodo, isCompleted: !selectedTodoData?.isCompleted},
                'UPDATE',
              );
              navigation.goBack();
            }}
            style={{
              borderColor: colors.primaryColor,
              borderRadius: 8,
              paddingVertical: 15,
              marginHorizontal: 20,
              justifyContent: 'center',
              borderWidth: 1,
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Text
              style={{
                color: colors.primaryColor,
                fontWeight: '500',
                fontSize: 16,
              }}>
              {selectedTodoData.isCompleted
                ? 'Set as Incomplete'
                : 'Mark as Done'}
            </Text>
          </TouchableOpacity>
        )}
        <View>
          <TouchableOpacity
            onPress={handleAddTodo}
            style={{
              backgroundColor: colors.primaryColor,
              borderRadius: 8,
              paddingVertical: 15,
              marginHorizontal: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#FFF', fontWeight: '500', fontSize: 16}}>
              {selectedTodoData ? 'Update' : 'Create Task'}
            </Text>
          </TouchableOpacity>
        </View>
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
    height: 45,
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
