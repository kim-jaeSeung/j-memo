"use client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { RootState, AppDispatch } from "@/store/store";
import {
  addTodo,
  removeTodo,
  updateTodo,
  updateTodoPosition,
  loadTodosFromStorage,
} from "@/features/todos/todosSlice";
import useLocalStorage from "./useLocalStorage";

interface Todo {
  id: number;
  title: string;
  content: string;
  position: { x: number; y: number };
  createdAt: string;
  deadline: Date | number;
}

const useTodos = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch<AppDispatch>();
  const [storedTodos, setStoredTodos] = useLocalStorage<Todo[]>("todos", []);

  // 초기 로드: 로컬스토리지에서 Redux로 데이터 로드
  useEffect(() => {
    if (storedTodos.length > 0 && todos.length === 0) {
      dispatch(loadTodosFromStorage(storedTodos));
    }
  }, [storedTodos, todos.length, dispatch]);

  // Redux 상태 변경 시 로컬스토리지에 저장
  useEffect(() => {
    if (todos.length > 0) {
      setStoredTodos(todos);
    }
  }, [todos, setStoredTodos]);

  // Todo 추가
  const handleAddTodo = () => {
    dispatch(addTodo());
  };

  // Todo 제거
  const handleRemoveTodo = (id: number) => {
    dispatch(removeTodo(id));
  };

  // Todo 업데이트
  const handleUpdateTodo = (
    id: number,
    updates: {
      title?: string;
      content?: string;
      deadline?: Date | number;
    }
  ) => {
    dispatch(updateTodo({ id, ...updates }));
  };

  // Todo 위치 업데이트
  const handleUpdateTodoPosition = (
    id: number,
    position: { x: number; y: number }
  ) => {
    dispatch(updateTodoPosition({ id, position }));
  };

  return {
    todos,
    addTodo: handleAddTodo,
    removeTodo: handleRemoveTodo,
    updateTodo: handleUpdateTodo,
    updateTodoPosition: handleUpdateTodoPosition,
  };
};

export default useTodos;
