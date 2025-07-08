// import { Todo } from "@/features/todo/Todo";
import Todo from "../features/todos/Todo";
import Menu from "@/leftmenu/Menu";
export default function Home() {
  return (
    <div className="flex h-[100vh]">
      <Menu />
      <Todo />
    </div>
  );
}
