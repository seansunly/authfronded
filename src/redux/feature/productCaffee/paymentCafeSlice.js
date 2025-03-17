import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../../page/apiClient";

const initialState = {
  paymentCaffee: [], // Holds all payment data
  paymentCaffeeById: {}, // Holds payment data by ID for quick access
  status: "idle", // Tracks general status for actions (idle/pending/fulfilled/rejected)
  transactionStatus: "idle", // Tracks status specifically for posting transactions
  error: null, // Tracks errors for general actions
  transactionError: null, // Tracks errors specifically for posting transactions
};

// Fetch all payment data
export const fetchPaymentCaffee = createAsyncThunk(
  "paymentCaffee/fetchPaymentCaffee",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/transaction");
      return response.data; // Return fetched payment data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch payment data by ID
export const fetchPaymentCaffeeById = createAsyncThunk(
  "paymentCaffee/fetchPaymentCaffeeById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/transaction/${id}`);
      return response.data; // Return specific payment data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// POST a transaction
export const postTransaction = createAsyncThunk(
  "paymentCaffee/postTransaction",
  async (transactionPayload, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/transaction", transactionPayload);
      return response.data; // Return created transaction data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete payment data by ID
export const deletePayment = createAsyncThunk(
  "paymentCaffee/deletePayment",
  async (id, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/transaction/${id}`);
      return id; // Return ID of the deleted payment
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const paymentCaffeeSlice = createSlice({
  name: "paymentCaffee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch payment data
    builder
      .addCase(fetchPaymentCaffee.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchPaymentCaffee.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.paymentCaffee = action.payload;
      })
      .addCase(fetchPaymentCaffee.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });

    // Fetch payment data by ID
    builder
      .addCase(fetchPaymentCaffeeById.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchPaymentCaffeeById.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.paymentCaffeeById = action.payload;
      })
      .addCase(fetchPaymentCaffeeById.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });

    // Post transaction
    builder
      .addCase(postTransaction.pending, (state) => {
        state.transactionStatus = "pending";
        state.transactionError = null;
      })
      .addCase(postTransaction.fulfilled, (state, action) => {
        state.transactionStatus = "fulfilled";
        state.paymentCaffee.push(action.payload); // Add new transaction to state
      })
      .addCase(postTransaction.rejected, (state, action) => {
        state.transactionStatus = "rejected";
        state.transactionError = action.payload;
      });

    // Delete payment data by ID
    builder
      .addCase(deletePayment.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.paymentCaffee = state.paymentCaffee.filter(
          (payment) => payment.id !== action.payload
        );
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export default paymentCaffeeSlice.reducer;

// Selectors
export const selectAllPaymentCaffee = (state) => state.paymentCaffee.paymentCaffee;
export const selectPaymentCaffeeById = (state) => state.paymentCaffee.paymentCaffeeById;
export const selectTransactionStatus = (state) => state.paymentCaffee.transactionStatus;
export const selectTransactionError = (state) => state.paymentCaffee.transactionError;
export const selectStatus = (state) => state.paymentCaffee.status;
export const selectError = (state) => state.paymentCaffee.error;
