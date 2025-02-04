import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type TodoType = {id: string; text: string};

type CardItemType = {
  item: TodoType;
  handleDeleteTodo: () => void;
};

const CardItem: React.FC<CardItemType> = ({item, handleDeleteTodo}) => {
  return (
    <View style={styles.todoItem}>
      <Text>{item.text}</Text>
      <TouchableOpacity onPress={handleDeleteTodo}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CardItem;

const styles = StyleSheet.create({
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
