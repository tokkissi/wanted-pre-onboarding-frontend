import React, {
  createContext,
  useEffect,
  useReducer,
  Dispatch,
  useCallback,
} from "react";
import { TodoAction, Todo, TodoList, TodoProviderProps } from "../model/todo";
import todoReducer from "../reducers/todoReducer";
import {
  addTodo,
  editTodo,
  getTodoList,
  removeTodo,
} from "../services/todoApi";

export interface TodoContextType {
  todoList: TodoList;
  dispatch: Dispatch<TodoAction>;
  handleInitTodo: () => Promise<void>;
  handleAddTodo: (todoValue: string) => Promise<void>;
  handleEditTodo: (todo: Todo) => Promise<void>;
  handleRemoveTodo: (id: number) => Promise<void>;
  handleToggleTodo: (todo: Todo) => Promise<void>;
}

export const TodoContext = React.createContext<TodoContextType | undefined>(
  undefined
);

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todoList, dispatch] = useReducer(todoReducer, [] as Todo[]);

  /** init 할때에는, 데이터 요청 실패 시 빈 배열이라도 받아 랜더링하게 함 */
  const handleInitTodo = useCallback(async () => {
    const todolist = await getTodoList();
    dispatch({ type: "INIT", payload: todolist });
  }, []);

  const handleAddTodo = async (todoValue: string) => {
    const newTodo = await addTodo(todoValue);
    if (newTodo !== null) {
      dispatch({ type: "ADD", payload: newTodo });
    }
  };
  const handleEditTodo = async (todo: Todo) => {
    const updatedTodo = await editTodo(todo);
    if (updatedTodo !== null) {
      dispatch({ type: "EDIT", payload: updatedTodo });
    }
  };
  const handleRemoveTodo = async (id: number) => {
    await removeTodo(id);
    dispatch({ type: "REMOVE", payload: id });
  };
  const handleToggleTodo = async (todo: Todo) => {
    handleEditTodo({
      ...todo,
      isCompleted: !todo.isCompleted,
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todoList,
        dispatch,
        handleInitTodo,
        handleAddTodo,
        handleRemoveTodo,
        handleEditTodo,
        handleToggleTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
