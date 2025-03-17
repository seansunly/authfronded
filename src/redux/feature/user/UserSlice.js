import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../../page/apiClient";

const initialState = {
  users: [], // You may want to consider storing only the user data you need
  userToken: {}, // Store the token here
  status: "idle", // idle / pending / fulfilled / rejected
  error: null,
};

// Register a new user
export const fetchUsers = createAsyncThunk("users/fetchUsers", async (userDetails, { rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:8080/api/v1/auth/registerCustomer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    // If the response is not OK, handle the error
    if (!response.ok) {
      const errorData = await response.json();

      // Handle specific error for duplicate phone number
      if (response.status === 409 && errorData.error.code === 409) {
        return rejectWithValue(errorData.error.reason || "Phone number already in use");
      }

      // General error
      return rejectWithValue(errorData.message || "Registration failed");
    }

    return await response.json(); // Return the response data if successful
  } catch (error) {
    return rejectWithValue(error.message || "Network error");
  }
});

// Fetch user profile
export const fetchgetUsers = createAsyncThunk("users/fetchgetUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get("/auth/getProfile");
    return response.data; // Assuming response contains the profile data
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

export const updateUserProfile = createAsyncThunk(
  "users/updateUserProfile",
  async ({ codeUser, userData }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(`/user/${codeUser}`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || error.message || "Failed to update profile");
    }
  }
);



export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchUsers pending state
      .addCase(fetchUsers.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      // Handle fetchUsers fulfilled state
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "fulfilled";
        // Store the token and user data in the appropriate fields
        state.userToken = action.payload.token || {}; // Assuming response contains token
        state.users.push(action.payload.user); // Or store user in users array, if needed
      })
      // Handle fetchUsers rejected state
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      // Handle fetchgetUsers pending state
      .addCase(fetchgetUsers.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      // Handle fetchgetUsers fulfilled state
      .addCase(fetchgetUsers.fulfilled, (state, action) => {
        state.status = "fulfilled";
        // Store profile data in userToken (you may also store it in users array if necessary)
        state.userToken = action.payload;
      })
      // Handle fetchgetUsers rejected state
      .addCase(fetchgetUsers.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      })
      // Handle updateUserProfile pending state
  .addCase(updateUserProfile.pending, (state) => {
    state.status = "pending";
    state.error = null;
  })
  // Handle updateUserProfile fulfilled state
  .addCase(updateUserProfile.fulfilled, (state, action) => {
    state.status = "fulfilled";
    // Update the user data in the state
    const updatedUser = action.payload;
    state.users = state.users.map(user => 
      user.codeUser === updatedUser.codeUser ? updatedUser : user
    );
  })
  // Handle updateUserProfile rejected state
  .addCase(updateUserProfile.rejected, (state, action) => {
    state.status = "rejected";
    state.error = action.payload;
  });
  },
});

export const selectUserBytoken = (state) => state.user.userToken;

export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;


export default userSlice.reducer;
