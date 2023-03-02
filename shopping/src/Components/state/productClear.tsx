import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProductType } from "../../pages/Main";

interface CartState {
  cartItems: CartProductType[];
}

const initialState: CartState = {
  cartItems: JSON.parse(localStorage.getItem("shoppingCart") || "[]"),
};

const productClear = createSlice({
  name: "clear",
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

export const { removeFromCart } = productClear.actions;
export default productClear.reducer;
