import { useEffect } from "react";
import { addTodosFromLs, removeAlltodos } from "../store/todoSlice";
import TodoItem from "./TodoItem";
import { useAppSelector, useAppDispatch } from "../hooks";
// import { useStore } from "react-redux";

const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const allTodos = useAppSelector((state) => state.todos);
  console.log("useSelector ", allTodos);

  useEffect(() => {
    let allTodosFromls = localStorage.getItem("alltodos");
    console.log("пришло из LS при загруке страниці", allTodosFromls);
    if (allTodosFromls !== null) dispatch(addTodosFromLs(allTodosFromls));
  }, []);

  useEffect(() => {
    const todosToLocalStorage = () => {
      const allTodosFromState = JSON.stringify(allTodos);
      console.log("сохрфняем в лс из стейта", allTodosFromState);
      localStorage.setItem("alltodos", allTodosFromState);
    };

    window.addEventListener("beforeunload", todosToLocalStorage);

    return () => {
      window.removeEventListener("beforeunload", todosToLocalStorage);
    };
  }, [allTodos]);

  return (
    <div className="todos-area">
      {allTodos.todos.length ? (
        <div className="todos-all">
          <h2>Todos:</h2>
          <div className="todos-list">
            {allTodos.todos.map((todo) => (
              <TodoItem key={todo.id} {...todo} />
            ))}
          </div>
          {allTodos.todos.length >= 2 ? (
            <p onClick={() => dispatch(removeAlltodos("not-completed"))} className="remove-text">
              Remove all todos
            </p>
          ) : null}
        </div>
      ) : null}

      {allTodos.completedTodos.length ? (
        <div className="todos-all">
          <h2>Completed todos:</h2>
          <div className="todos-list">
            {allTodos.completedTodos.map((todo) => (
              <TodoItem key={todo.id} {...todo} />
            ))}
          </div>

          {allTodos.completedTodos.length >= 2 ? (
            <p onClick={() => dispatch(removeAlltodos("completed"))} className="remove-text">
              Remove all completed todos
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default TodoList;
