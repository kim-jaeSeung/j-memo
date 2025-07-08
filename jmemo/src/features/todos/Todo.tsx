"use client";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { removeTodo, updateTodo } from "./todosSlice";

import Draggable from "react-draggable";
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
  const dispatch = useDispatch<AppDispatch>();
  const handleTitleChange = (title: string) => {
    dispatch(updateTodo({ id: todo.id, title }));
  };
  const handleContentChange = (content: string) => {
    dispatch(updateTodo({ id: todo.id, content }));
  };
  const handleRemove = () => {
    dispatch(removeTodo(todo.id));
  };
  // const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
  //   dispatch(
  //     updateTodoPosition({
  //       id: todo.id,
  //       position: { x: data.x, y: data.y },
  //     })
  //   );
  // };
  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".drag-handle" // 드래그 핸들 지정
      // onStop={handleDragStop}
      defaultPosition={{ x: 100, y: 100 }} // 초기 위치
      bounds="parent" // 부모 요소 내에서만 이동
    >
      <div
        ref={nodeRef}
        className="bg-[#DEFFA5] h-[300px] w-[400px] p-4 flex flex-col rounded-lg drag-handle"
      >
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <input
            type="text"
            value={todo.title}
            placeholder="제목"
            onChange={(e) => handleTitleChange(e.target.value)}
            className="outline-none block w-full text-[#333c48] text-xl bg-transparent"
          />
          <div
            className="cursor-pointer py-2 pl-2 relative"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <img className="w-6 h-6" src="/img/menu.svg" alt="" />
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

        <div className="flex-1 mb-4">
          <textarea
            className="outline-none w-full h-full text-black text-xl bg-transparent resize-none"
            placeholder="내용을 입력하세요."
            value={todo.content}
            onChange={(e) => handleContentChange(e.target.value)}
          />
        </div>

        <div className="flex justify-between flex-shrink-0">
          <p className="text-sm text-[#333c48]">{todo.createdAt}</p>
          <p className="text-sm text-[#333c48]">기한 / 2024.7.5 까지</p>
        </div>
      </div>
    </Draggable>
  );
}

export default Todo;
