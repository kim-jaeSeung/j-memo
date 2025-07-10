"use client";
import { useState, useRef } from "react";
import useTodos from "@/hooks/useTodos";
import Input from "@/componet/Input";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

interface TodoProps {
  todo: {
    id: number;
    title: string;
    content: string;
    position: { x: number; y: number };
    createdAt: string;
  };
}

function Todo({ todo }: TodoProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
          <div
            className="cursor-pointer py-2 pl-2 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <img className="w-6 h-6" src="/Image/menu.svg" alt="" />
            {isMenuOpen && (
              <div
                className="absolute top-8 right-0 bg-white border border-gray-200 rounded shadow-lg p-2 whitespace-nowrap flex flex-col "
                onClick={(e) => e.stopPropagation()}
              >
                <button className="text-left cursor-pointer text-gray-600">
                  기한 추가
                </button>
                <button
                  className="text-left cursor-pointer text-gray-600"
                  onClick={() => handleRemove()}
                >
                  삭제
                </button>
              </div>
            )}
          </div>
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

        <div className="flex justify-between flex-shrink-0 no-drag">
          <p className="text-sm text-[#333c48]">{todo.createdAt}</p>
          <div className="cursor-pointer flex items-center gap-2">
            <img src="/image/close.svg" alt="" className="w-4" />
            <p className="text-sm text-[#333c48]"> 기한 / 2024.7.5 까지</p>
          </div>
        </div>
      </div>
    </Draggable>
  );
}

export default Todo;
