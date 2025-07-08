"use client";
import Todo from "../features/todos/Todo";
import Menu from "@/leftmenu/Menu";
import useTodos from "@/hooks/useTodos";

export default function Home() {
  const { todos, addTodo } = useTodos();

  return (
    <div className="flex h-[100vh]">
      <Menu onAddTodo={addTodo} />
      <div className="flex-1 relative">
        {todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}
