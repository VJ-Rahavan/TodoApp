import React, {useEffect, useMemo, useState, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ContextType,
  EmptyObjType,
  ModifyTodoType,
  ObjType,
  StorageType,
  TodoType,
} from 'src/types/store-types';
import {defaultTodoValue} from 'utils/constants';

const storeData = async (key: StorageType, value: ObjType) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error(e);
  }
};

const getData = async (key: StorageType): Promise<ObjType> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    return null;
  }
};

export const AuthContext = createContext<ContextType>({
  todo: [],
  modifyTodoList: (param: TodoType, type: ModifyTodoType) => {},
  updateUserPreference: (key: string, value: string | boolean) => {},
  storeSelectedData: (param: TodoType | null) => {},
  selectedTodoData: defaultTodoValue,
});

interface IAuthProvider {
  children: JSX.Element;
}

const AuthProvider: React.FC<IAuthProvider> = ({children}): JSX.Element => {
  const [todo, setTodo] = useState<TodoType[]>([]); // user state
  const [userData, setUserData] = useState<EmptyObjType>({});
  const [selectedTodoData, setSelectedTodoData] = useState<null | TodoType>(
    null,
  );

  useEffect(() => {
    const loadUserData = async () => {
      try {
        let storedUserData = await getData('USER_PREFERENCE');
        if (!storedUserData) storedUserData = {};
        setUserData(storedUserData as EmptyObjType);
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    const loadTodoData = async () => {
      try {
        let storedTodoData = await getData('TODO_DATA');
        if (!storedTodoData) storedTodoData = [];
        setTodo(storedTodoData as TodoType[]);
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    loadTodoData();
    loadUserData();
  }, []);

  const storeSelectedData = (selectedData: TodoType | null) => {
    setSelectedTodoData(selectedData);
  };

  const modifyTodoList = async (data: TodoType, type: ModifyTodoType) => {
    try {
      let tempTodoData: TodoType[] = [];
      switch (type) {
        case 'ADD':
          tempTodoData = [...todo, data];
          break;
        case 'DELETE':
          tempTodoData = todo.filter(todoData => todoData.id !== data.id);
          break;
        case 'UPDATE':
          tempTodoData = todo.map(todoData => {
            if (todoData.id === data.id) {
              return data;
            }
            return todoData;
          });
          break;
        default:
          break;
      }
      setTodo(tempTodoData);
      await storeData('TODO_DATA', tempTodoData);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserPreference = async (key: string, value: string | boolean) => {
    setUserData(prev => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const obj = useMemo(() => {
    return {
      todo,
      modifyTodoList,
      updateUserPreference,
      storeSelectedData,
      selectedTodoData,
    };
  }, [todo, modifyTodoList, selectedTodoData]);

  return <AuthContext.Provider value={obj}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
