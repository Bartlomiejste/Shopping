import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
  spinnerLoading: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
    isLoading: (state) => {
      state.spinnerLoading = !state.spinnerLoading;
    },
  },
});

export const { toggleTheme, isLoading } = themeSlice.actions;

export default themeSlice.reducer;
