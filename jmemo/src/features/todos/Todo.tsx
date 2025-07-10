"use client";
import { useRef } from "react";
import useTodos from "@/hooks/useTodos";
import Input from "@/componet/Input";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import MemoTime from "@/componet/MemoTime";
import MemoSet from "@/componet/MemoSet";
interface TodoProps {
  todo: {
    id: number;
    title: string;
    content: string;
    position: { x: number; y: number };
    createdAt: string;
    deadline: Date | null;
  };
}

function Todo({ todo }: TodoProps) {
  const nodeRef = useRef(null);
  const { removeTodo, updateTodo, updateTodoPosition } = useTodos();

  const handleTitleChange = (title: string) => {
    updateTodo(todo.id, { title });
  };

  const handleContentChange = (content: string) => {
    updateTodo(todo.id, { content });
  };

  const handleRemove = () => {
    removeTodo(todo.id);
  };

  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    updateTodoPosition(todo.id, { x: data.x, y: data.y });
  };

  const handleDateChange = (date: Date | null) => {
    updateTodo(todo.id, { deadline: date ? date.getTime() : 0 });
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={todo.position} // position → defaultPosition으로 변경
      onStop={handleDragStop}
      bounds="parent"
      cancel="input, textarea, button, img, .no-drag "
    >
      <div
        ref={nodeRef}
        className="bg-[#DEFFA5] h-[300px] w-[400px] p-4 flex flex-col rounded-lg shadow-lg cursor-move absolute"
      >
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <Input
            value={todo.title}
            placeholder={"제목"}
            onChange={handleTitleChange}
            className={
              "outline-none block w-full text-[#333c48] text-xl bg-transparent"
            }
          />
          <MemoSet
            handleRemove={handleRemove}
            handleDateChange={handleDateChange}
            todoDeadline={todo.deadline ? new Date(todo.deadline) : null}
          />
        </div>

        <div className="flex-1 h-full mb-4">
          <Input
            as="textarea"
            value={todo.content}
            placeholder="내용을 입력하세요."
            onChange={handleContentChange}
            className="w-full h-full text-black text-xl bg-transparent cursor-text"
            maxLength={1000}
          />
        </div>

        <MemoTime todoTime={todo.createdAt} />
      </div>
    </Draggable>
  );
}

export default Todo;
