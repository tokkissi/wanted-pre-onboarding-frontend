import { useEffect, useRef, useState } from "react";
import { TodoList } from "../model/todo";
import useTodo from "../hooks/useTodo";

export default function TodoPage() {
  const buttonStyle =
    "border border-gray-400 rounded-sm px-1 bg-gray-200 active:bg-gray-50 hover:bg-gray-100 ";
  const inputStyle =
    "w-48 border border-gray-400 rounded-sm px-1 ml-2 focus:outline-sky-300 ";

  const [activeModifyButtonId, setActiveModifyButtonId] = useState<
    number | null
  >(null);
  const [addTodoValue, setAddTodoValue] = useState("");
  const [tempTodoValue, setTempTodoValue] = useState<Record<string, string>>(
    {}
  );
  const inputRef = useRef<{ [key: number]: HTMLInputElement }>({});

  const {
    todoList,
    handleAddTodo,
    handleEditTodo,
    handleInitTodo,
    handleRemoveTodo,
    handleToggleTodo,
  } = useTodo();

  useEffect(() => {
    handleInitTodo();
  }, [handleInitTodo]);

  // activeModifyButtonId를 참조하는 inputref 를 focus 시킴
  useEffect(() => {
    if (activeModifyButtonId && inputRef.current[activeModifyButtonId]) {
      inputRef.current[activeModifyButtonId].focus();
    }
  }, [activeModifyButtonId]);

  const handleOnChangeAddInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddTodoValue(e.target.value);
  };

  const handleOnChangeListInput = (id: number, value: string) => {
    setTempTodoValue({ ...tempTodoValue, [id]: value });
  };

  const handleOnBlurListInput = (id: number) => {
    // setTempTodoValue({ ...tempTodoValue, [id]: "" });
    // setActiveModifyButtonId(null);
    setActiveModifyButtonId(null);
  };

  const handleClickAddTodoButton = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (addTodoValue !== "") {
      await handleAddTodo(addTodoValue);
      setAddTodoValue("");
    }
  };

  const handleClickEditButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    e.preventDefault();
    setTempTodoValue({
      ...tempTodoValue,
      [id]: todoList.find((todo) => todo.id === id)?.todo,
    });
    setActiveModifyButtonId(id);
  };

  const handleClickSubmitButton = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();
    const editedTodo = todoList.find((todo) => todo.id === id);
    if (editedTodo && editedTodo.todo !== tempTodoValue[id]) {
      handleEditTodo({
        ...editedTodo,
        todo: tempTodoValue[id] ?? editedTodo.todo,
      });
      setTempTodoValue({ ...tempTodoValue, [id]: "" });
    }
    setActiveModifyButtonId(null);
  };

  const handleClickRemoveButton = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();
    handleRemoveTodo(id);
    setActiveModifyButtonId(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-300">
      <div className="bg-white px-8 py-6 rounded-sm">
        <h1 className="mb-8 text-center text-xl font-bold">TODO LIST</h1>
        <div>
          <div className="flex justify-center items-center mb-8">
            <input
              type="text"
              data-testid="new-todo-input"
              autoComplete="off"
              name="addTodoInput"
              placeholder="할 일을 입력해주세요"
              className={inputStyle}
              onChange={handleOnChangeAddInput}
              value={addTodoValue}
              onBlur={() => {
                // focus 해제될 때, inputref 의 참조를 제거함
                if (activeModifyButtonId) {
                  delete inputRef.current[activeModifyButtonId];
                }
                setActiveModifyButtonId(null);
              }}
            />
            <button
              data-testid="new-todo-add-button"
              className={buttonStyle}
              onClick={handleClickAddTodoButton}
            >
              추가
            </button>
          </div>
          <div>
            <ul>
              {todoList.map((todo) => (
                <li key={todo.id} className="mb-2">
                  <span className="align-top">&bull;</span>
                  <label>
                    <input
                      type="checkbox"
                      className="mx-2"
                      onChange={() => handleToggleTodo(todo)}
                      checked={todo.isCompleted}
                    />
                    <span
                      className={
                        "px-2 inline-block w-80 " +
                        (activeModifyButtonId &&
                        activeModifyButtonId === todo.id
                          ? "hidden"
                          : "")
                      }
                    >
                      {todo.todo}
                    </span>
                    <input
                      type="text"
                      ref={(inputEl) => {
                        if (inputEl) {
                          inputRef.current[todo.id] = inputEl;
                        }
                      }}
                      className={
                        inputStyle +
                        (activeModifyButtonId &&
                        activeModifyButtonId === todo.id
                          ? ""
                          : "hidden")
                      }
                      onChange={(e) =>
                        handleOnChangeListInput(todo.id, e.target.value)
                      }
                      value={
                        // activeModifyButtonId && activeModifyButtonId === todo.id
                        //   ? tempTodoValue[todo.id]
                        //   : ""
                        tempTodoValue[todo.id] ?? todo.todo
                      }
                      onClick={() => setActiveModifyButtonId(todo.id)}
                      onBlur={() => {
                        handleOnBlurListInput(todo.id);
                      }}
                    />
                  </label>
                  <button
                    data-testid="modify-button"
                    className={
                      buttonStyle +
                      (activeModifyButtonId && activeModifyButtonId === todo.id
                        ? "hidden"
                        : "")
                    }
                    onClick={(e) => handleClickEditButton(e, todo.id)}
                    type="button"
                  >
                    수정
                  </button>
                  <button
                    data-testid="submit-button"
                    onMouseDown={(e) => handleClickSubmitButton(e, todo.id)}
                    className={
                      buttonStyle +
                      (activeModifyButtonId && activeModifyButtonId === todo.id
                        ? ""
                        : "hidden")
                    }
                  >
                    제출
                  </button>
                  <button
                    data-testid="cancel-button"
                    className={
                      buttonStyle +
                      (activeModifyButtonId && activeModifyButtonId === todo.id
                        ? ""
                        : "hidden")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveModifyButtonId(null);
                    }}
                  >
                    취소
                  </button>
                  <button
                    data-testid="delete-button"
                    className={
                      buttonStyle +
                      (activeModifyButtonId && activeModifyButtonId === todo.id
                        ? "hidden"
                        : "")
                    }
                    onClick={(e) => {
                      handleClickRemoveButton(e, todo.id);
                    }}
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
