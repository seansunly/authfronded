import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import apiClient from "../apiClient"; // Axios instance
import apiClient from "../../../page/apiClient";

// Fetch all products
export const fetprodcutCaffee = createAsyncThunk(
  "ProductCaffee/fetprodcutCaffee",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/product");
      return response.data; // Return fetched products
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch a product by ID
export const fetchProductCafeById = createAsyncThunk(
  "productCaffeeById/fetchProductCafeById",
  async (codeProduct, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/product/${codeProduct}`);
      return response.data; // Return product data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  "productCaffee/deleteProduct",
  async (codeProduct, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/product/${codeProduct}`);
      return codeProduct; // Return the code of the deleted product
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update a product
export const updateProduct = createAsyncThunk(
  "productCaffee/updateProduct",
  async ({ codeProduct, updatedProductData }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(`/product/${codeProduct}`, updatedProductData);
      return response.data; // Return updated product
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  productCaffee: [],
  productCaffeeById: {},
  status: "idle",
  error: null,
};

export const productCaffeeSlice = createSlice({
  name: "productCaffee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetprodcutCaffee.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetprodcutCaffee.fulfilled, (state, action) => {
        state.productCaffee = action.payload;
        state.status = "fulfilled";
      })
      .addCase(fetprodcutCaffee.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "rejected";
      })
      .addCase(fetchProductCafeById.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchProductCafeById.fulfilled, (state, action) => {
        state.productCaffeeById = action.payload;
        state.status = "fulfilled";
      })
      .addCase(fetchProductCafeById.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "rejected";
      })
      .addCase(deleteProduct.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.productCaffee = state.productCaffee.filter(
          (product) => product.codeProduct !== action.payload
        );
        state.status = "fulfilled";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "rejected";
      })
      .addCase(updateProduct.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        state.productCaffee = state.productCaffee.map((product) =>
          product.codeProduct === updatedProduct.codeProduct
            ? updatedProduct
            : product
        );
        state.status = "fulfilled";
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "rejected";
      });
  },
});

export default productCaffeeSlice.reducer;

export const selectAllProductCaffee = (state) => state.productCaffees.productCaffee;
export const selectproductCaffeeById = (state) => state.productCaffees.productCaffeeById;
export const selectStatus = (state) => state.productCaffees.status;
export const selectError = (state) => state.productCaffees.error;
