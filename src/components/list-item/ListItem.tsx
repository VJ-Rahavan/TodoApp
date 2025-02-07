import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TodoType} from 'src/types/store-types';

type CardItemType = {
  item: TodoType;
  handleDeleteTodo: () => void;
};

const ListItem: React.FC<CardItemType> = ({item, handleDeleteTodo}) => {
  return (
    <View style={styles.todoItem}>
      <Text>{item.title}</Text>
      <TouchableOpacity onPress={handleDeleteTodo}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderColor: '#ddd',
    backgroundColor: '#FFF',
    boxShadow: '2 1 2 0 #ddd',
    borderRadius: 8,
    marginBottom: 20,
  },
  deleteButton: {
    color: 'red',
  },
});
