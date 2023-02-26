import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../state/productsSlice";
import clearReducer from "../state/productClear";

const store = configureStore({
  reducer: {
    products: productsReducer,
    clear: clearReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
