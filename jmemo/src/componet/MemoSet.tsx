import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
interface memoSetProps {
  handleRemove: () => void;
  handleDateChange: (date: Date | null) => void;
  todoDeadline: Date | null;
}
function MemoSet({
  handleRemove,
  handleDateChange,
  todoDeadline,
}: memoSetProps) {
  // 메모 설정 메뉴
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // 메뉴 기한 설정
  const [showDatePicker, setShowDatePicker] = useState(false);
  return (
    <>
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
            <button
              className="text-left cursor-pointer text-gray-600"
              onClick={() => {
                setShowDatePicker(!showDatePicker);
              }}
            >
              기한 추가
            </button>
            {showDatePicker && (
              <div className="absolute top-0 left-full ml-2">
                <DatePicker
                  selected={todoDeadline}
                  onChange={handleDateChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="yyyy-MM-dd HH:mm"
                  placeholderText="날짜와 시간을 선택하세요"
                  inline
                  calendarClassName="border border-gray-300 rounded shadow-lg bg-white"
                />
              </div>
            )}
            <button
              className="text-left cursor-pointer text-gray-600"
              onClick={() => handleRemove()}
            >
              삭제
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default MemoSet;
