"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  title: string;
  content: string;
  position: { x: number; y: number };
  createdAt: string;
  deadline: Date | number;
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
        deadline: 0,
      };

      state.todos.push(newTodo);

      console.log("Todo 추가됨:", newTodo);
      console.log("현재 전체 Todo 목록:", state.todos);
    },

    removeTodo: (state, action: PayloadAction<number>) => {
      const removedTodo = state.todos.find(
        (todo) => todo.id === action.payload
      );
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);

      console.log("Todo 삭제됨:", removedTodo);
      console.log("현재 전체 Todo 목록:", state.todos);
    },

    updateTodo: (
      state,
      action: PayloadAction<{
        id: number;
        title?: string;
        content?: string;
        deadline?: Date | number;
      }>
    ) => {
      const todo = state.todos.find((todo) => todo.id === action.payload.id);
      if (todo) {
        const beforeUpdate = { ...todo }; // 변경 전 상태 저장

        if (action.payload.title !== undefined) {
          todo.title = action.payload.title;
        }
        if (action.payload.content !== undefined) {
          todo.content = action.payload.content;
        }
        if (action.payload.deadline !== undefined) {
          todo.deadline = action.payload.deadline;
        }

        console.log("  변경 전:", beforeUpdate);
        console.log("  변경 후:", todo);
        console.log("  변경된 필드:", action.payload);
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
        const oldPosition = { ...todo.position }; // 이전 위치 저장
        todo.position = action.payload.position;

        console.log(`  Todo ID: ${todo.id} (${todo.title || "제목 없음"})`);
        console.log(`  이전 위치: x:${oldPosition.x}, y:${oldPosition.y}`);
        console.log(`  새 위치: x:${todo.position.x}, y:${todo.position.y}`);
      }
    },

    loadTodosFromStorage: (state, action: PayloadAction<Todo[]>) => {
      const previousCount = state.todos.length;
      state.todos = action.payload;
      const maxId = action.payload.reduce(
        (max, todo) => Math.max(max, todo.id),
        0
      );
      tempIdCounter = maxId;

      console.log(`  이전 Todo 개수: ${previousCount}`);
      console.log(`  로드된 Todo 개수: ${action.payload.length}`);
      console.log("  로드된 Todo 목록:", action.payload);
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
