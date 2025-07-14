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
  const now = new Date();
  const filterTime = (time: Date) => {
    const currentTime = new Date();
    const selectedDate = new Date(time);
    if (selectedDate.toDateString() !== currentTime.toDateString()) {
      return true;
    }
    return selectedDate.getTime() > currentTime.getTime();
  };
  return (
    <>
      <div
        className="cursor-pointer py-2 pl-2 relative"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <img className="w-6 h-6" src="/Image/menu.svg" alt="메뉴 아이콘" />
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
              <div className="absolute top-17 right-0 ml-2  w-max bg-white">
                <DatePicker
                  selected={todoDeadline}
                  onChange={handleDateChange}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="yyyy-MM-dd HH:mm"
                  placeholderText="날짜와 시간을 선택하세요"
                  minDate={now}
                  filterTime={filterTime}
                  inline
                />
                <div className="my-2 text-center">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => setShowDatePicker(false)}
                  >
                    확인
                  </button>
                </div>
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
