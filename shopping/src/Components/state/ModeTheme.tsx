import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

interface CartProductType {
  id: number;
  price: number;
  image: string;
  cartQuantity: number;
}

interface ModeThemeState {
  darkMode: boolean;
  shoppingProduct: CartProductType[];
  spinnerLoading: boolean;
}
const initialState: ModeThemeState = {
  darkMode: false,
  spinnerLoading: false,
  shoppingProduct: [],
};
export const theme = createSlice({
  name: "theme",
  initialState,

  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
    isLoading: (state, action) => {
      state.spinnerLoading = action.payload;
    },
    addToCart(state, action: PayloadAction<CartProductType>) {
      const itemIndex = state.shoppingProduct.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.shoppingProduct[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.shoppingProduct.push(tempProduct);
      }
      localStorage.setItem(
        "shoppingProduct",
        JSON.stringify(state.shoppingProduct)
      );
    },
  },
});

export const { toggleTheme, isLoading, addToCart } = theme.actions;
export const store = configureStore({
  reducer: theme.reducer,
});
