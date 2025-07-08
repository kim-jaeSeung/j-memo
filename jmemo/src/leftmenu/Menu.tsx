import React from "react";
interface MenuProps {
  onAddTodo: () => void;
}

function Menu({ onAddTodo }: MenuProps) {
  return (
    <div className="">
      <button className="p-10 cursor-pointer bg-white" onClick={onAddTodo}>
        추가
      </button>
    </div>
  );
}

export default Menu;
