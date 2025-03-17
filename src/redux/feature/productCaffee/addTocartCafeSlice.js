import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import apiClient from "../../../page/apiClient";

// Initial state of the cart
const initialState = {
  cartItems: [],        // List of cart items
  totalItems: 0,        // Total number of items in the cart
  orderStatus: "idle",  // Tracks the order request status (idle, loading, succeeded, failed)
  orderError: null,     // Tracks any error during the order process
  orderDetails: null,   // Stores the order details returned from the backend
};

// Async action to handle order submission
export const orderSelectedProducts = createAsyncThunk(
  "cart/orderSelectedProducts",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const selectedItems = state.cartCafe.cartItems.filter((item) => item.selected);

    if (selectedItems.length === 0) {
      return rejectWithValue("No items selected for ordering!");
    }

    const orderPayload = {
      codeProduct: selectedItems.map((item) => item.codeProduct),
    };

    try {
      const response = await apiClient.post("/order", orderPayload);

      console.log("API Response Data:", response.data); // Log response for debugging

      // Assuming the API returns an object with `codeOrder`, return it explicitly
      return { codeOrder: response.data.codeOrder }; // Return only the codeOrder
    } catch (error) {
      console.error("API Request Error:", error); // Log error details
      return rejectWithValue(error.response?.data || "Failed to place the order.");
    }
  }
);


const addToCartCafeSlice = createSlice({
  name: "cartCafe",
  initialState,
  reducers: {
    // Add an item to the cart
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.codeProduct === action.payload.codeProduct
      );

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.priceDiscount = existingItem.unitPrice * existingItem.quantity;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
          unitPrice: action.payload.priceDiscount,
          priceDiscount: action.payload.priceDiscount,
          selected: false, // Default selection state is false
        });
      }

      state.totalItems = state.cartItems.reduce((total, item) => total + item.quantity, 0);
    },

    // Delete all items from the cart
    deleteAll: (state) => {
      state.cartItems = [];
      state.totalItems = 0;
    },

    // Delete a single item from the cart
    deleteOne: (state, action) => {
      const itemToRemove = state.cartItems.find(
        (item) => item.codeProduct === action.payload.codeProduct
      );

      if (itemToRemove) {
        state.totalItems -= itemToRemove.quantity;
        state.cartItems = state.cartItems.filter(
          (item) => item.codeProduct !== action.payload.codeProduct
        );
      }
    },

    // Increment the quantity of an item
    increQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.codeProduct === action.payload.codeProduct
      );
      if (item) {
        item.quantity += 1;
        item.priceDiscount = item.unitPrice * item.quantity;
      }
      state.totalItems = state.cartItems.reduce((total, item) => total + item.quantity, 0);
    },

    // Decrement the quantity of an item
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.codeProduct === action.payload.codeProduct
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.priceDiscount = item.unitPrice * item.quantity;
      }
      state.totalItems = state.cartItems.reduce((total, item) => total + item.quantity, 0);
    },

    // Toggle selection state of a single item
    toggleItemSelection: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.codeProduct === action.payload.codeProduct
      );
      if (item) {
        item.selected = !item.selected;
      }
    },

    // Toggle selection state for all items
    toggleSelectAll: (state) => {
      const isAllSelected = state.cartItems.every((item) => item.selected);
      state.cartItems.forEach((item) => {
        item.selected = !isAllSelected;
      });
    },

    // Delete all selected items from the cart
    deleteAllSelected: (state) => {
      state.cartItems = state.cartItems.filter((item) => !item.selected);
      state.totalItems = state.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderSelectedProducts.pending, (state) => {
        state.orderStatus = "loading";
        state.orderError = null;
      })
      .addCase(orderSelectedProducts.fulfilled, (state, action) => {
        state.orderStatus = "succeeded";
        state.orderError = null;
  
        // Store the returned `codeOrder` in the state
        state.orderDetails = { codeOrder: action.payload.codeOrder };
  
        // Clear selected items from the cart
        state.cartItems = state.cartItems.filter((item) => !item.selected);
        state.totalItems = state.cartItems.reduce((total, item) => total + item.quantity, 0);
      })
      .addCase(orderSelectedProducts.rejected, (state, action) => {
        state.orderStatus = "failed";
        state.orderError = action.payload || "Failed to place the order.";
      });
  }
  
});

// Export the actions to be used in components
export const {
  addToCart,
  deleteAll,
  deleteOne,
  increQuantity,
  decrementQuantity,
  toggleItemSelection,
  toggleSelectAll,
  deleteAllSelected,
} = addToCartCafeSlice.actions;

// Selectors to access specific slices of the state
export const selectCartItemsCafe = (state) => state.cartCafe.cartItems;
export const selectTotalItemsCafe = (state) => state.cartCafe.totalItems;
export const selectOrderStatus = (state) => state.cartCafe.orderStatus;
export const selectOrderError = (state) => state.cartCafe.orderError;
export const selectOrderDetails = (state) => state.cartCafe.orderDetails;

// Additional selectors to get specific item information
export const selectQuantityByCodeProduct = (state, codeProduct) => {
  const item = state.cartCafe.cartItems.find((item) => item.codeProduct === codeProduct);
  return item ? item.quantity : 0;
};

export const selectTotalSelectedPrice = (state) => {
  return state.cartCafe.cartItems
    .filter((item) => item.selected)
    .reduce((total, item) => total + item.priceDiscount, 0);
};

export const selectTotalSelectedQuantity = (state) => {
  const selectedItems = state.cartCafe.cartItems.filter((item) => item.selected);
  if (selectedItems.length === 0) return null; // Return `null` if no items are selected
  return selectedItems.reduce((total, item) => total + item.quantity, 0);
};

export const selectGrandTotalSelectedPrice = (state) => {
  const selectedItems = state.cartCafe.cartItems.filter((item) => item.selected);
  if (selectedItems.length === 0) return null; // Return `null` if no items are selected
  return selectedItems.reduce((total, item) => total + item.priceDiscount, 0);
};

export const selectCodeOrder = (state) => state.cartCafe?.orderDetails?.codeOrder;


// Default export of the reducer to be used in the store
export default addToCartCafeSlice.reducer;
