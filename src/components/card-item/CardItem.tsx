import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';

type TodoType = {id: string; text: string};

type CardItemType = {
  item: TodoType;
  handleDeleteTodo: () => void;
};

const CardItem: React.FC<CardItemType> = ({item, handleDeleteTodo}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={{
        marginBottom: 20,
      }}
      android_ripple={{
        foreground: true,
        borderless: false,
        color: '#FFFFFF60',
      }}
      onPress={() => {
        navigation.navigate('Profile');
      }}>
      <View style={styles.todoItem}>
        <View
          style={{
            backgroundColor: '#F00',
            alignSelf: 'flex-start',
            paddingVertical: 3,
            paddingHorizontal: 10,
            borderRadius: 18,
          }}>
          <Text style={{color: '#FFF'}}>{item.text}</Text>
        </View>

        <View style={{marginTop: 5}}>
          <Text style={{fontSize: 22, fontWeight: '600'}}>
            Salon App Wireframe
          </Text>
        </View>

        <View style={{marginTop: 1}}>
          <Text numberOfLines={2} style={{}}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet
            laborum temporibus ducimus! Quos animi dicta nulla sit repellat
            excepturi sint est quae eos asperiores natus mollitia dolores
            doloribus, quis ad!
          </Text>
        </View>

        <View style={{marginTop: 10}}>
          <Text>{'12/11/2028'}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  todoItem: {
    padding: 20,
    borderColor: '#ddd',
    backgroundColor: '#FFF',
    boxShadow: '2 1 2 0 #ddd',
    borderRadius: 8,
    height: 150,
  },
  deleteButton: {
    color: 'red',
  },
});
