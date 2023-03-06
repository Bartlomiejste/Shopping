import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProductType } from "../pages/Main";

interface CartState {
  cartItems: CartProductType[];
}

const initialState: CartState = {
  cartItems: JSON.parse(localStorage.getItem("shoppingCart") || "[]"),
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeFromCart: (state, action: PayloadAction<number>) => {
      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("shoppingCart", JSON.stringify(updatedCartItems));
      state.cartItems = updatedCartItems;
    },
    addToCart: (state, action: PayloadAction<CartProductType>) => {
      const { id } = action.payload;
      const updatedCartItems = state.cartItems.findIndex(
        (item) => item.id === id
      );
      if (updatedCartItems !== -1) {
        state.cartItems[updatedCartItems].amount++;
      } else {
        state.cartItems.push({ ...action.payload, amount: 1 });
      }
      localStorage.setItem("shoppingCart", JSON.stringify(state.cartItems));
    },
    decreaseToCart: (state, action: PayloadAction<number>) => {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (existingItemIndex !== -1) {
        if (state.cartItems[existingItemIndex].amount > 1) {
          state.cartItems[existingItemIndex].amount--;
        } else {
          state.cartItems.splice(existingItemIndex, 1);
        }
      }
      localStorage.setItem("shoppingCart", JSON.stringify(state.cartItems));
    },
  },
});

export const { removeFromCart, addToCart, decreaseToCart } = cart.actions;
export default cart.reducer;
