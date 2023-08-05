import { useEffect, useRef, useState } from "react";
import { TodoList } from "../model/todo";

export default function TodoPage() {
  const [activeModifyButtonId, setActiveModifyButtonId] = useState<
    number | null
  >(null);
  const inputRef = useRef<{ [key: number]: HTMLInputElement }>({});

  const buttonStyle =
    "border border-gray-400 rounded-sm px-1 bg-gray-200 active:bg-gray-50 hover:bg-gray-100 ";
  const inputStyle =
    "w-48 border border-gray-400 rounded-sm px-1 mx-2 focus:outline-sky-300";

  const todoList: TodoList = [
    {
      id: 1,
      todo: "todo2",
      isCompleted: false,
      userId: 1,
    },
    {
      id: 2,
      todo: "todo3",
      isCompleted: false,
      userId: 1,
    },
  ];

  // activeModifyButtonId를 참조하는 inputref 를 focus 시킴
  useEffect(() => {
    if (activeModifyButtonId && inputRef.current[activeModifyButtonId]) {
      inputRef.current[activeModifyButtonId].focus();
    }
  }, [activeModifyButtonId]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-300">
      <div className="bg-white px-8 py-6 rounded-sm w-[450px]">
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
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              추가
            </button>
          </div>
          <div>
            <ul className="">
              {todoList.map((todo) => (
                <li key={todo.id} className="mb-2">
                  <span className="align-top">&bull;</span>
                  <label>
                    <input type="checkbox" className="mx-2" />
                    <span
                      className={
                        "px-2 " +
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
                      onClick={() => setActiveModifyButtonId(todo.id)}
                      onBlur={() => setActiveModifyButtonId(null)}
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
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveModifyButtonId(todo.id);
                    }}
                    type="button"
                  >
                    수정
                  </button>
                  <button
                    data-testid="submit-button"
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
                      e.preventDefault();
                      setActiveModifyButtonId(null);
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
