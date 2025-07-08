"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number; // 임시: string, DB: number
  title: string;
  content: string;
  // position: { x: number; y: number };
  createdAt: string;
}
interface TodosState {
  todos: Todo[];
}

const initialState: TodosState = {
  todos: [],
};
let tempIdCounter = 0; // 간단한 카운터

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state) => {
      const newTodo: Todo = {
        id: ++tempIdCounter, // 디비 연결 전 임시 조치
        title: "",
        content: "",
        // position: {
        //   x: Math.random() * 200 + 100,
        //   y: Math.random() * 200 + 100,
        // },
        createdAt: new Date().toISOString(),
      };
      state.todos.push(newTodo);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (
      state,
      action: PayloadAction<{
        id: string | number;
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
    // updateTodoPosition: (
    //   state,
    //   action: PayloadAction<{
    //     id: number;
    //     position: { x: number; y: number };
    //   }>
    // ) => {
    //   const todo = state.todos.find((todo) => todo.id === action.payload.id);
    //   if (todo) {
    //     todo.position = action.payload.position;
    //   }
    // },
  },
});

export const { addTodo, removeTodo, updateTodo } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
export default todosSlice.reducer;
