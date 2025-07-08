"use client";
import { useState } from "react";
import Draggable from "react-draggable";
function Todo() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputTitleValue, setInputTitleValue] = useState("");
  const [inputContentValue, setInputContentValue] = useState("");
  return (
    <Draggable
      handle=".drag-handle" // 드래그 핸들 지정
      defaultPosition={{ x: 100, y: 100 }} // 초기 위치
      bounds="parent" // 부모 요소 내에서만 이동
    >
      <div className="bg-[#DEFFA5] h-[300px] w-[400px] p-4 flex flex-col rounded-lg">
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <input
            type="text"
            value={inputTitleValue}
            placeholder="제목"
            onChange={(e) => setInputTitleValue(e.target.value)}
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
                <button className="text-left cursor-pointer text-gray-600">
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
            value={inputContentValue}
            onChange={(e) => setInputContentValue(e.target.value)}
          />
        </div>

        <div className="flex justify-between flex-shrink-0">
          <p className="text-sm text-[#333c48]">2025년 7월 8일</p>
          <p className="text-sm text-[#333c48]">기한 / 2024.7.5 까지</p>
        </div>
      </div>
    </Draggable>
  );
}

export default Todo;
