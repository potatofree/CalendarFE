import { createSlice } from '@reduxjs/toolkit';

const today = new Date();

export const dateSlice = createSlice({
    name: 'date',
    initialState: {
        date: {
            day: today.getDate(),
            month: today.getMonth() + 1,
            year: today.getFullYear(),
        },
    },
    reducers: {
        setDate: (state, action) => {
            state.date = action.payload;
        },
    },
});

export const { setDate } = dateSlice.actions;

export default dateSlice.reducer;

export const selectDate = state => state.date.date;