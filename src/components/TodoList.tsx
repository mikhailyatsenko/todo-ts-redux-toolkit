import { useEffect } from "react";
import { addTodosFromLs } from "../store/todoSlice";
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

    window.addEventListener("click", todosToLocalStorage);

    return () => {
      window.removeEventListener("click", todosToLocalStorage);
    };
  }, [allTodos]);

  return (
    <div className="todo-list">
      {allTodos.todos.length ? (
        <div className="todos">
          <h2>Todos</h2>
          {allTodos.todos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </div>
      ) : null}

      {allTodos.completedTodos.length ? (
        <div className="todos">
          <h2>Completed todos:</h2>
          {allTodos.completedTodos.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default TodoList;
