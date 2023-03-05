import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../state/productsSlice";
import cartReducer from "./productsCart";

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
