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

type TodoType = {id: string; text: string};
type FlatListProp = {item: TodoType};

const App = () => {
  const [todo, setTodo] = useState<TodoType[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    const newText = newTodo.trim();
    if (newText) {
      setTodo(prev => [...prev, {id: Date.now().toString(), text: newText}]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (id: string) => {
    setTodo(prev => prev.filter(todo => todo.id !== id));
  };

  const renderItem = ({item}: FlatListProp) => {
    return (
      <CardItem
        handleDeleteTodo={handleDeleteTodo.bind(null, item.id)}
        item={item}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>

      <TextInput
        style={styles.input}
        placeholder="Add new todo"
        value={newTodo}
        onChangeText={setNewTodo}
      />

      <Button title="Add Todo" onPress={handleAddTodo} />

      <FlatList
        data={todo}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
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
