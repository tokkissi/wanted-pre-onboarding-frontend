import { apiClient } from "../api/apiClient";
import { Todo, TodoList } from "../model/todo";

export const addTodo = async (todoValue: string): Promise<Todo | null> => {
  try {
    const response = await apiClient.post("/todos", {
      todo: todoValue,
    });
    if (response.status === 201) {
      console.log("addTodo 성공");
      return response.data;
    }
  } catch (error) {
    console.error(`handleAddTodo 에러: ${error}`);
  }
  return null;
};

export const getTodoList = async (): Promise<TodoList> => {
  try {
    const response = await apiClient.get("/todos");
    if (response.status === 200) {
      console.log("getTodoList 성공");
      const sortedData = [...response.data].sort(
        (a: Todo, b: Todo) => b.id - a.id
      );
      return sortedData;
    }
    return [];
  } catch (error) {
    console.error(`handleInitTodo 에러: ${error}`);
    return [];
  }
};

export const editTodo = async (todo: Todo): Promise<Todo | null> => {
  try {
    const response = await apiClient.put(`/todos/${todo.id}`, {
      todo: todo.todo,
      isCompleted: todo.isCompleted,
    });
    if (response.status === 200) {
      console.log("editTodo 성공");
      return response.data;
    }
  } catch (error) {
    console.error(`handleEditTodo 에러: ${error}`);
  }
  return null;
};

export const removeTodo = async (id: number): Promise<void> => {
  try {
    const response = await apiClient.delete(`/todos/${id}`);
    if (response.status === 204) {
      console.log("removeTodo 성공");
    }
  } catch (error) {
    console.error(`handleRemoveTodo 에러: ${error}`);
  }
};
