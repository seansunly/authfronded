import { createSlice } from "@reduxjs/toolkit";

const initialState={
    value: 0,
}

export const countSlice = createSlice ({
    name: 'counter',
    initialState,
    reducers: {
        increment: state => {
            state.value++;
        },
        decrement: state => {
            state.value--;
        },
        incrementByAmount: (state,action )=>{
            state.value += action.payload;
        },
        decrementByAmount: (state,action)=>{
            state.value -= action.payload;
        }
    },
})
//export actions
export const { increment, decrement, incrementByAmount,decrementByAmount } = countSlice.actions;

export const selectIdValue = (state) => state.counter.value;

//export reducer
export default countSlice.reducer;