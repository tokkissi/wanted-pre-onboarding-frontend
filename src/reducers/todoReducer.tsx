import { TodoAction, Todo } from "../model/todo";

export default function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case "INIT":
      return action.payload;
    case "ADD":
      return [action.payload as Todo, ...state];
    case "EDIT":
      return state.map((todo) =>
        todo.id === (action.payload as Todo).id ? action.payload : todo
      );
    case "REMOVE":
      return state.filter((todo) => todo.id !== (action.payload as number));

    default:
      return state;
  }
}
