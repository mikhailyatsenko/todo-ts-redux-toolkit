import TodoItem from "./TodoItem";
import { useAppSelector } from "../hooks";

const TodoList: React.FC = () => {
  const items = useAppSelector((state) => state.todos.todos);
  const completedItems = useAppSelector((state) => state.todos.completedTodos);
  return (
    <div className="todo-list">
      {items.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}

      {completedItems.length ? (
        <div className="completed">
          <h2>Completed tasks:</h2>
          {completedItems.map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default TodoList;
