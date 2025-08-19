import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductType } from "../types";

const initialState: ProductType[] = [];

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const existing = state.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const existing = state.find((item) => item.id === action.payload);
      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1;
        } else {
          return state.filter((item) => item.id !== action.payload);
        }
      }
      return state;
    },
  },
});

export const { addToCart, decreaseQuantity } = CartSlice.actions;
export default CartSlice.reducer;
