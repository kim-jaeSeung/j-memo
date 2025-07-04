// filepath: /Users/kimjaeseung/Desktop/j-memo/jmemo/src/store/inputSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InputState {
  value: string;
  error: string | null;
}

const initialState: InputState = {
  value: "",
  error: null,
};

const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setValue, setError, clearError } = inputSlice.actions;
export default inputSlice.reducer;
