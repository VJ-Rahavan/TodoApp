import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from 'screens/home/HomeScreen';
import NewTodoScreen from 'screens/new-todo/NewTodoScreen';
import {RootStackParamList} from 'src/types/navigation-types';

const Stack = createNativeStackNavigator<RootStackParamList>();

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
