import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CustomerUrl } from "../../api/indexapi";
import { tokenCustomers } from "../../api/token/tokencustomer";

const initialState = {
  customers: [],
  status: "idle", // idle /pending/ fulfilled/ rejected
  error: null,
};

// Use a CORS proxy to bypass the CORS restriction temporarily
export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    const corsProxy = "https://cors-anywhere.herokuapp.com/"; // CORS proxy URL
    const response = await fetch(`${corsProxy}${CustomerUrl}customers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenCustomers}`, // Add the token to the headers
      },
    });

    const data = await response.json();
    console.log("customer", data);
    return data;
  }
);

export const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export default customerSlice.reducer;
export const selectAllCustomers = (state) => state.customer.customers;
