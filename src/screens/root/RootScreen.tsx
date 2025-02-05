import {useNavigation} from '@react-navigation/native';
import {
  NativeStackHeaderRightProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {TouchableOpacity, View} from 'react-native';
import HomeScreen from 'screens/home/HomeScreen';
import NewTodoScreen from 'screens/new-todo/NewTodoScreen';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator();

const headerComponent = (props: NativeStackHeaderRightProps) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Profile');
      }}>
      <View
        style={{
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
          width: 30,
        }}>
        <MaterialIcon name="add-task" style={{}} size={20} />
      </View>
    </TouchableOpacity>
  );
};

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={NewTodoScreen} />
    </Stack.Navigator>
  );
}

export default MyStack;
