import React, { useReducer, Dispatch, useCallback } from "react";
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
    try {
      const todolist = await getTodoList();
      dispatch({ type: "INIT", payload: todolist });
    } catch (error) {
      console.error(`getTodoList에서 오류가 발생했습니다: ${error}`);
    }
  }, []);

  const handleAddTodo = async (todoValue: string) => {
    try {
      const newTodo = await addTodo(todoValue);
      if (newTodo) {
        dispatch({ type: "ADD", payload: newTodo });
      }
    } catch (error) {
      console.error(`addTodo에서 오류가 발생했습니다: ${error}`);
    }
  };

  const handleEditTodo = async (todo: Todo) => {
    try {
      const updatedTodo = await editTodo(todo);
      if (updatedTodo) {
        dispatch({ type: "EDIT", payload: updatedTodo });
      }
    } catch (error) {
      console.error(`editTodo에서 오류가 발생했습니다: ${error}`);
    }
  };

  const handleRemoveTodo = async (id: number) => {
    try {
      await removeTodo(id);
      dispatch({ type: "REMOVE", payload: id });
    } catch (error) {
      console.error(`removeTodo에서 오류가 발생했습니다: ${error}`);
    }
  };

  const handleToggleTodo = async (todo: Todo) => {
    try {
      handleEditTodo({
        ...todo,
        isCompleted: !todo.isCompleted,
      });
    } catch (error) {
      console.error(`handleToggleTodo에서 오류가 발생했습니다: ${error}`);
    }
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
