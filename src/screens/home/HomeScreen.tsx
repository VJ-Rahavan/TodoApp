import {useNavigation} from '@react-navigation/native';
import CardItem from 'components/card-item/CardItem';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from 'redux/store';
import {FlatListProp, TodoType} from 'src/types/store-types';
import {colors} from 'utils/constants';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ListItem from 'components/list-item/ListItem';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {HomeScreenNavigationProp} from 'src/types/navigation-types';

const HomeScreen = () => {
  const {todo, modifyTodoList} = useContext(AuthContext);

  const [searchTodo, setSearchTodo] = useState([...todo]);

  const {height} = useWindowDimensions();
  const [searchText, setSearchText] = useState('');
  const animatedHeight = useSharedValue(height * 0.4);

  const [isShowCards, setIsShowCards] = useState(true);

  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleDeleteTodo = (item: TodoType) => {
    modifyTodoList(item, 'DELETE');
  };

  const onSearchHandle = (text: string) => {
    if (text === '') {
      setSearchTodo([...todo]);
    } else {
      const filteredResults = todo.filter(item =>
        item.title.toLowerCase().includes(text.toLowerCase()),
      );
      setSearchTodo(filteredResults);
    }
    setSearchText(text);
  };

  useEffect(() => {
    onSearchHandle(searchText);
  }, [todo]);

  const renderItem = useCallback(
    ({item}: FlatListProp) => {
      return (
        <>
          {isShowCards ? (
            <CardItem
              handleDeleteTodo={handleDeleteTodo.bind(null, item)}
              item={item}
            />
          ) : (
            <ListItem
              handleDeleteTodo={handleDeleteTodo.bind(null, item)}
              item={item}
            />
          )}
        </>
      );
    },
    [isShowCards],
  );

  const animatedTextStyle = useAnimatedStyle(() => {
    const scale = interpolateColor(
      animatedHeight.value,
      [height * 0.4, height],
      ['#000', '#FFF'],
    );
    return {
      color: scale,
    };
  });

  const bgStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.backgroundWallPaper, bgStyle]}></Animated.View>
      <SafeAreaView style={{flex: 1}} edges={['top']}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: 20,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View>
              <Image
                style={{width: 60, height: 60, borderRadius: 40}}
                source={{
                  uri: 'https://images.justwatch.com/poster/178627048/s718/dragon-ball.jpg',
                }}
              />
            </View>
            <View style={{marginLeft: 15}}>
              <Text style={{color: '#CCC6FF', fontSize: 18}}>Welcome,</Text>
              <Text style={{color: '#FFF', fontWeight: '600', fontSize: 22}}>
                Vijayarahavan
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <MaterialIcon name="add-task" style={{}} size={30} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* <Text style={styles.header}>To-Do List</Text> */}
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 30,
            flexDirection: 'row',
          }}>
          <TextInput
            value={searchText}
            style={{
              backgroundColor: '#FFF',
              borderRadius: 12,
              height: 50,
              width: '80%',
              fontSize: 18,
              paddingHorizontal: 10,
            }}
            placeholder="Search..."
            onChangeText={onSearchHandle}
          />
          <TouchableOpacity
            onPress={() => {
              setIsShowCards(!isShowCards);
              if (animatedHeight.value !== height)
                animatedHeight.value = withTiming(height, {duration: 600});
              else
                animatedHeight.value = withTiming(height * 0.4, {
                  duration: 600,
                });
            }}
            style={{
              flex: 1,
              backgroundColor: '#63D0F3',
              marginLeft: 20,
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesome5 name="sort" size={25} color="#FFF" />
          </TouchableOpacity>
        </View>
        {searchTodo.length > 0 ? (
          <View style={{flex: 1, marginTop: 30}}>
            <FlatList
              data={searchTodo}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 20}}
              initialNumToRender={20}
              windowSize={15}
              keyboardDismissMode="on-drag"
            />
          </View>
        ) : (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: height * 0.9,
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}>
            <Image
              style={{height: 180, width: 180}}
              source={{
                uri: 'https://cdn3d.iconscout.com/3d/premium/thumb/no-results-3d-icon-download-in-png-blend-fbx-gltf-file-formats--search-item-found-empty-state-pack-seo-web-icons-6672513.png?f=webp',
              }}
            />
            <Animated.Text
              style={[{fontSize: 28, fontWeight: '600'}, animatedTextStyle]}>
              No Data Found
            </Animated.Text>
          </View>
        )}

        <View
          style={{
            height: 80,
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingTop: 10,
            backgroundColor: '#FFF',
          }}>
          <TouchableOpacity style={styles.bottomIcon}>
            <Icon name="house" size={30} />
            <Text>Home</Text>
          </TouchableOpacity>
          <View style={styles.bottomIcon}></View>
          <Animated.View
            style={[
              {
                position: 'absolute',
                top: -40,
                width: 80,
                alignItems: 'center',
                borderRadius: 40,
                height: 80,
                justifyContent: 'center',
                // backgroundColor: '#F3F3F3',
                // borderTopWidth: 2,
              },
              // bgColorStyle,
            ]}>
            {/* <View
              style={{
                position: 'absolute',
                top: 40,
                right: -40,
                backgroundColor: '#f3f3f3',
                width: 40,
                height: 40,
              }}>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: '#Fff',
                  width: 45,
                  height: 40,
                  borderTopLeftRadius: 20,
                }}></View>
            </View>
            <View
              style={{
                position: 'absolute',
                top: 40,
                left: -40,
                backgroundColor: '#f3f3f3',
                width: 40,
                height: 40,
              }}>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  backgroundColor: '#Fff',
                  width: 45,
                  height: 40,
                  borderTopRightRadius: 20,
                }}></View>
            </View> */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profile');
              }}
              activeOpacity={0.4}
              style={[
                styles.bottomIcon,
                {
                  backgroundColor: isShowCards
                    ? colors.primaryColor
                    : '#f3f3f3',
                  width: 60,
                  alignItems: 'center',
                  borderRadius: 40,
                  height: 60,
                  justifyContent: 'center',
                },
              ]}>
              <Icon
                name="plus"
                size={30}
                color={isShowCards ? '#FFF' : '#000'}
              />
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity style={styles.bottomIcon}>
            <MaterialIcon name="settings" size={30} />
            <Text>Settings</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
  },
  bottomIcon: {
    height: 50,
    alignItems: 'center',
  },
  backgroundWallPaper: {
    width: '100%',
    backgroundColor: colors.primaryColor,
    position: 'absolute',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFF',
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

export default HomeScreen;
