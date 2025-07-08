"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  title: string;
  content: string;
  position: { x: number; y: number };
  createdAt: string;
}

interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};

let tempIdCounter = 0;

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state) => {
      const now = new Date();
      const formattedDate = `${now.getFullYear()}.${
        now.getMonth() + 1
      }.${now.getDate()}`;

      const newTodo: Todo = {
        id: ++tempIdCounter,
        title: "",
        content: "",
        position: {
          x: Math.random() * 600 + 200,
          y: Math.random() * 550 + 50,
        },
        createdAt: formattedDate,
      };

      console.log("고정 범위 Todo 위치:", newTodo.position);
      state.todos.push(newTodo);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (
      state,
      action: PayloadAction<{
        id: number;
        title?: string;
        content?: string;
      }>
    ) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        if (action.payload.title !== undefined) {
          todo.title = action.payload.title;
        }
        if (action.payload.content !== undefined) {
          todo.content = action.payload.content;
        }
      }
    },
    updateTodoPosition: (
      state,
      action: PayloadAction<{
        id: number;
        position: { x: number; y: number };
      }>
    ) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.position = action.payload.position;
      }
    },
    // 새로 추가: 로컬스토리지에서 로드
    loadTodosFromStorage: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      // 가장 큰 ID 찾아서 tempIdCounter 업데이트
      const maxId = action.payload.reduce(
        (max, todo) => Math.max(max, todo.id),
        0
      );
      tempIdCounter = maxId;
    },
  },
});

export const {
  addTodo,
  removeTodo,
  updateTodo,
  updateTodoPosition,
  loadTodosFromStorage,
} = todosSlice.actions;

export const todosReducer = todosSlice.reducer;
export default todosSlice.reducer;
