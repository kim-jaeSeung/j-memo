"use client";
import Todo from "../features/todos/Todo";
import Menu from "@/leftmenu/Menu";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { addTodo } from "@/features/todos/todosSlice";

export default function Home() {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch<AppDispatch>();

  const handleAddTodo = () => {
    dispatch(addTodo()); // 매개변수 없이 호출
  };

  return (
    <div className="flex h-[100vh]">
      <Menu onAddTodo={handleAddTodo} />
      <div className="flex-1 relative">
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}
