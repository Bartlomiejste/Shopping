import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "../state/themeSlice";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
  },
});
