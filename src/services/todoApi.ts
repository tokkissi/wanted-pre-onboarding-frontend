import { apiClient } from "../api/apiClient";
import { Todo, TodoList } from "../model/todo";

export const addTodo = async (todoValue: string): Promise<Todo> => {
  const response = await apiClient.post("/todos", {
    todo: todoValue,
  });
  if (response.status !== 201) {
    throw new Error(`addTodo 에러: ${response.status}`);
  }
  return response.data;
};

export const getTodoList = async (): Promise<TodoList> => {
  const response = await apiClient.get("/todos");
  if (response.status !== 200) {
    throw new Error(`getTodoList 에러: ${response.status}`);
  }
  const sortedData = [...response.data].sort((a: Todo, b: Todo) => b.id - a.id);
  return sortedData;
};

export const editTodo = async (todo: Todo): Promise<Todo> => {
  const response = await apiClient.put(`/todos/${todo.id}`, {
    todo: todo.todo,
    isCompleted: todo.isCompleted,
  });
  if (response.status !== 200) {
    throw new Error(`editTodo 에러: ${response.status}`);
  }
  return response.data;
};

export const removeTodo = async (id: number): Promise<void> => {
  const response = await apiClient.delete(`/todos/${id}`);
  if (response.status !== 204) {
    throw new Error(`removeTodo 에러: ${response.status}`);
  }
};
