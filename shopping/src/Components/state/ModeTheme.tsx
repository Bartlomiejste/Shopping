import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

export const theme = createSlice({
  name: "theme",
  initialState: {
    darkMode: false,
    spinnerLoading: false,
    cartProduct:
      localStorage.getItem("cart") !== null
        ? JSON.parse(localStorage.getItem("cart")!)
        : [],
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
    isLoading: (state, action) => {
      state.spinnerLoading = action.payload;
    },
    addToCart: (state, action) => {
      localStorage.setItem(
        "cart",
        JSON.stringify([...state.cartProduct, action.payload])
      );
      state.cartProduct = [...state.cartProduct, action.payload];
    },
    removeFromCart: (state, action) => {
      localStorage.setItem(
        "cart",
        JSON.stringify(
          state.cartProduct.filter(
            (product: { id: number }) => product.id !== action.payload
          )
        )
      );
      state.cartProduct = state.cartProduct.filter(
        (product: { id: number }) => product.id !== action.payload
      );
    },
  },
});

export const { toggleTheme, isLoading, addToCart, removeFromCart } =
  theme.actions;
export const store = configureStore({
  reducer: theme.reducer,
});
