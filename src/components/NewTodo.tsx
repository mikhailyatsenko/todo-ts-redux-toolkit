import { useAppDispatch } from "../hooks";
import { addTodo } from "../store/todoSlice";
import { useRef, useEffect } from "react";

interface NewTodoProps {
  value: string;
  updateText: (text: string) => void;
}

const NewTodoForm: React.FC<NewTodoProps> = ({ value, updateText }) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(inputRef);
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const addItem = (): void => {
    if (value) dispatch(addTodo({ text: value }));
  };
  return (
    <div className="add-todo">
      <div id="todo-field">
        <textarea
          ref={inputRef}
          placeholder="new todo"
          value={value}
          onChange={(e) => updateText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addItem();
            }
          }}
        />
      </div>
      <button className="add-todo-button" onClick={addItem}>
        Add todo
      </button>
    </div>
  );
};

export default NewTodoForm;
