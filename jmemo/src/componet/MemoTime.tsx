import React from "react";

interface todoTimeProps {
  todoTime: string;
}

function MemoTime({ todoTime }: todoTimeProps) {
  return (
    <>
      <div className="flex justify-between flex-shrink-0 no-drag">
        <p className="text-sm text-[#333c48]">{todoTime}</p>
        <div className="cursor-pointer flex items-center gap-2">
          <img src="/image/close.svg" alt="" className="w-4" />
          <p className="text-sm text-[#333c48]"> 기한 / 2024.7.5 까지</p>
        </div>
      </div>
    </>
  );
}

export default MemoTime;
