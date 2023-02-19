import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../state/productsSlice";

const store = configureStore({
  reducer: {
    products: userReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
