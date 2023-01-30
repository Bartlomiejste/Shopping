import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

export const theme = createSlice({
  name: "theme",
  initialState:{  
    darkMode: false,
    spinnerLoading: false},
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
    isLoading: (state, action) => {
      state.spinnerLoading = action.payload;
    },
  },
});

export const { toggleTheme, isLoading } = theme.actions;
export const store = configureStore({ reducer: theme.reducer });



 