import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

type TodosState = {
  todos: Todo[];
  completedTodos: Todo[];
};

type payloadTitleType = {
  [key: string]: string;
};

type payloadIdCompletedType = {
  id: string;
  completed: boolean;
};

const initialState: TodosState = {
  todos: [],
  completedTodos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addTodosFromLs: (state, action: PayloadAction<string>) => {
      const newState = JSON.parse(action.payload);
      Object.assign(state, newState);
    },

    addTodo: (state, action: PayloadAction<payloadTitleType>) => {
      console.log("стэйт перед пушем", state.todos);
      state.todos.push({
        id: new Date().toISOString(),
        title: action.payload.text,
        completed: false,
      });
    },

    removeTodo: (state, action: PayloadAction<payloadIdCompletedType>) => {
      action.payload.completed ? (state.completedTodos = state.completedTodos.filter((todo) => todo.id !== action.payload.id)) : (state.todos = state.todos.filter((todo) => todo.id !== action.payload.id));
    },

    toggleTodo: (state, action: PayloadAction<payloadIdCompletedType>) => {
      action.payload.completed
        ? state.completedTodos.forEach((todo) => {
            if (todo.id === action.payload.id) {
              state.completedTodos = state.completedTodos.filter((todo) => todo.id !== action.payload.id);
              state.todos.unshift(todo);
              todo.completed = !todo.completed;
            }
          })
        : state.todos.forEach((todo) => {
            if (todo.id === action.payload.id) {
              state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
              state.completedTodos.push(todo);
              todo.completed = !todo.completed;
            }
          });
    },

    removeAlltodos: (state, action: PayloadAction<string>) => {
      if (action.payload === "completed") {
        Object.assign(state, { completedTodos: [] });
      } else if (action.payload === "not-completed") {
        Object.assign(state, { todos: [] });
      }
    },
  },
});

export const { addTodosFromLs, addTodo, removeTodo, toggleTodo, removeAlltodos } = todoSlice.actions;
export default todoSlice.reducer;
