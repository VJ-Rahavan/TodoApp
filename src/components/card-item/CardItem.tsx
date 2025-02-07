import {useNavigation} from '@react-navigation/native';
import React, {useContext} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from 'redux/store';
import {HomeScreenNavigationProp} from 'src/types/navigation-types';
import {TodoType} from 'src/types/store-types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type CardItemType = {
  item: TodoType;
  handleDeleteTodo: () => void;
};

const CardItem: React.FC<CardItemType> = ({item, handleDeleteTodo}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {storeSelectedData} = useContext(AuthContext);

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
        storeSelectedData(item);
        navigation.navigate('Profile');
      }}>
      <View style={styles.todoItem}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              backgroundColor: item.isCompleted ? '#00640020' : '#F0000020',
              alignSelf: 'flex-start',
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 18,
            }}>
            <Text style={{color: '#000', fontWeight: '500'}}>
              {item.isCompleted ? 'Completed' : 'Incomplete'}
            </Text>
          </View>

          <View>
            <MaterialIcons
              name={item.notify ? 'notifications-active' : 'notification-add'}
              size={22}
              color={'darkgreen'}
            />
          </View>
        </View>

        <View style={{flex: 1}}>
          <View style={{marginTop: 5}}>
            <Text style={{fontSize: 22, fontWeight: '600'}}>{item.title}</Text>
          </View>

          <View style={{marginTop: 1}}>
            <Text numberOfLines={2} style={{color: '#000'}}>
              {item.description}
            </Text>
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Text>{item.date}</Text>
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
