export type StorageType = 'USER_PREFERENCE' | 'TODO_DATA';

export type TodoType = {
  id: string;
  title: string;
  description: string;
  date: string;
  notify: boolean;
  isCompleted: boolean;
};

export type EmptyObjType = {[key: string]: string | boolean};

export type ObjType = TodoType[] | EmptyObjType | null;

export type ModifyTodoType = 'ADD' | 'DELETE' | 'UPDATE';

export type ContextType = {
  todo: TodoType[];
  modifyTodoList: (param: TodoType, type: ModifyTodoType) => void;
  updateUserPreference: (key: string, value: string | boolean) => void;
  storeSelectedData: (param: TodoType | null) => void;
  selectedTodoData: TodoType | null;
};

export type FlatListProp = {item: TodoType};
