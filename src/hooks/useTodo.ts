import { useContext } from "react";
import { TodoContext } from "../contexts/TodoContext";
export default function useTodo() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo는 TodoProvider 내부에서만 사용가능합니다");
  }
  return context;
}
