import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Base_Url } from "../../api/indexapi";

const initialState = {
  product: [],
  productById: {},
  status: "idle", // idle /pending/ fulfilled/ rejected
  error: null,
};

export const fetchProducts = createAsyncThunk("product/fetchProducts",async () => {
    const response = await fetch(`${Base_Url}products`);
    const data = await response.json();
    //console.log("data",data);
    return data;
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductsById",
  async (id) => {
    const response = await fetch(`${Base_Url}products/${id}`);
    const data = await response.json();
    console.log("dataById", data);
    console.log("sunly aly test product")
    return data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.product = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })


      // fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.productById = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer; // This ensures you're exporting the reducer
export const selectAllProducts = (state) => state.product.product;
export const selectProductById= (state)=>state.product.productById;
export const selectStatus= (state)=>state.product.status;
export const selectError = (state) => state.product.error;

