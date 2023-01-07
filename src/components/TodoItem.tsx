import { ITodo } from "../types/data";
import { useAppDispatch } from "../hooks";
import { removeTodo } from "../store/todoSlice";
import { toggleTodo } from "../store/todoSlice";
import { useEffect, useState } from "react";

const TodoItem: React.FC<ITodo> = (props) => {
  const { title, completed, id } = props;
  const dispatch = useAppDispatch();
  const [showItem, setShowItem] = useState("");

  useEffect(() => {
    setTimeout(() => setShowItem("show"), 100);
  }, []);

  const removeItem = (id: string): void => {
    dispatch(removeTodo({ id: id, completed }));
  };

  const toggleItem = (id: string): void => {
    dispatch(toggleTodo({ id: id, completed: completed }));
  };

  return (
    <div className={`todo-item ${showItem}`}>
      <label className="label">
        <input type="checkbox" className="checkbox" checked={completed} onChange={() => toggleItem(id)} />
        <span className="custom-checkbox"></span>
        <span className={completed ? "title cross" : "title"}>{title}</span>
      </label>

      <div className="remove-button" onClick={() => removeItem(id)}>
        <i className="fa fa-trash-o" aria-hidden="true"></i>
      </div>
    </div>
  );
};

export default TodoItem;
