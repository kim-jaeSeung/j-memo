"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { increment, decrement, reset, incrementByAmount } from "./counterSlice";
function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>+1</button>{" "}
      <button onClick={() => dispatch(decrement())}>-1</button>{" "}
      <button onClick={() => dispatch(reset())}>Reset</button>{" "}
      <button onClick={() => dispatch(incrementByAmount(5))}>+5</button>
    </div>
  );
}

export default Counter;
