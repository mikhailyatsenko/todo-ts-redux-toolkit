import { useState, useEffect } from "react";
import usePreviousValue from "../hooks/usePreviousValue";
import NewTodo from "./NewTodo";
import TodoList from "./TodoList";
import { useAppSelector } from "../hooks";
const App: React.FC = () => {
  const [value, setValue] = useState("");

  const todos = useAppSelector((state) => state.todos.todos);
  const previousValue = usePreviousValue(todos.length);

  useEffect(() => {
    if (todos.length > previousValue) {
      setValue("");
    }
  }, [todos.length, previousValue]);

  const changeHandler = (text: string) => {
    setValue(text);
  };

  return (
    <div className="container height100">
      <div className="todo-app">
        <NewTodo value={value} updateText={changeHandler} />
        <TodoList />
      </div>
    </div>
  );
};

export default App;
