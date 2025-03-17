import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  staffType: [],
  staffTypeById: {},
  status: "idle", // idle /pending/ fulfilled/ rejected
  error: null,
};

export const fetstaffType = createAsyncThunk("staffType/fetstaffType",async () =>{
    const response = await fetch("http://localhost:8080/api/v1/product");
    const data = await response.json();
    return data;
});

export const staffTypeSlice = createSlice({
    name: "staffType",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
       .addCase(fetstaffType.pending, (state) => {
            state.status = "pending";
        })
       .addCase(fetstaffType.fulfilled, (state, action) => {
            state.staffType = action.payload;
            state.status = "fulfilled";
        })
       .addCase(fetstaffType.rejected, (state, action) => {
            state.error = action.error.message;
            state.status = "rejected";
        })
    }
})

export default staffTypeSlice.reducer;
export const selectAllStaffType = (state) => state.staffTypes.staffType;