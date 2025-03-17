import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalItems: 0,
};

export const addToCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.qty += 1;
        existingItem.priceDiscount = existingItem.unitpriceDiscount * existingItem.qty;
        state.totalItems += 1;
      } else {
        // Add the item to the cart and set its initial quantity to 1
        state.cartItems.push({
          ...action.payload,
          qty: 1,
          unitpriceDiscount: action.payload.priceDiscount, // Store the original unit priceDiscount
          priceDiscount: action.payload.priceDiscount, // Initialize priceDiscount to the unit priceDiscount
        });
        state.totalItems += 1;
      }
    },
    deleteAll: (state) => {
      state.totalItems = 0;
      state.cartItems = [];
    },
    deleteOne: (state, action) => {
      const itemToRemove = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (itemToRemove) {
        state.totalItems -= itemToRemove.qty; // Subtract the quantity of the item from totalItems
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },

    increQty: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        item.qty += 1;
        item.priceDiscount = item.unitpriceDiscount * item.qty; // Update total priceDiscount based on unit priceDiscount
        state.totalItems += 1;
      }
    },
    decrementQty: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (item) {
        if (item.qty === 1) {
          state.cartItems = state.cartItems.filter(
            (cartItem) => cartItem.id !== action.payload.id
          );
          state.totalItems -= 1;
        } else if (item.qty > 1) {
          item.qty -= 1;
          item.priceDiscount = item.unitpriceDiscount * item.qty; // Update total priceDiscount based on unit priceDiscount
          state.totalItems -= 1;
        }
      }
    },
  },
});

export const { addToCart, increQty, decrementQty, deleteAll, deleteOne } =addToCartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectTotalItems = (state) => state.cart.totalItems;

export default addToCartSlice.reducer;
