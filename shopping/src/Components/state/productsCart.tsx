import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProductType } from "../../pages/Main";

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
  },
});

export const { removeFromCart } = cart.actions;
export default cart.reducer;
