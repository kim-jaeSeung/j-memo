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
      const newTodo: Todo = {
        id: ++tempIdCounter,
        title: "",
        content: "",
        position: {
          x: Math.random() * 600 + 200, // 200~800px
          y: Math.random() * 550 + 50, // 50~300px 고정
        },
        createdAt: new Date().toLocaleDateString().replace(/\.$/, ""),
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
  },
});

export const { addTodo, removeTodo, updateTodo, updateTodoPosition } =
  todosSlice.actions;
export const todosReducer = todosSlice.reducer;
export default todosSlice.reducer;
