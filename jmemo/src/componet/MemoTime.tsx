import React from "react";

interface todoTimeProps {
  todoTime: string;
  todoDeadline?: Date | null;
  deadlineDelete?: () => void;
}

function MemoTime({ todoTime, todoDeadline, deadlineDelete }: todoTimeProps) {
  const formatDeadline = (deadline: Date | number) => {
    let date: Date;
    if (typeof deadline === "number") {
      date = new Date(deadline);
    } else {
      date = deadline;
    }
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <>
      <div className="flex justify-between flex-shrink-0 no-drag items-center">
        <p className="text-sm text-[#333c48]">{todoTime}</p>
        {todoDeadline && (
          <div className="cursor-pointer flex items-center">
            <p className="text-sm text-[#333c48]">
              기한 / {formatDeadline(todoDeadline)} 까지
            </p>
            <button
              onClick={deadlineDelete}
              className="cursor-pointer p-2 py-0"
              title="기한 삭제"
              aria-label="기한 삭제"
            >
              <img src="/image/close.svg" alt="기한 삭제" className="w-4" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default MemoTime;
