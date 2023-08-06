export interface Todo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export type TodoList = Todo[];

export interface InitAction {
  type: "INIT";
  payload: Todo[];
}

export interface AddAction {
  type: "ADD";
  payload: Todo;
}

export interface EditAction {
  type: "EDIT";
  payload: Todo;
}

export interface RemoveAction {
  type: "REMOVE";
  payload: number;
}

export type TodoAction = InitAction | AddAction | EditAction | RemoveAction;

export interface TodoProviderProps {
  children: React.ReactNode;
}
