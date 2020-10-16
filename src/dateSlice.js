import { createSlice } from '@reduxjs/toolkit';

const today = new Date();
const todayDate = {
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear(),
};

export const dateSlice = createSlice({
    name: 'date',
    initialState: {
        date: todayDate,
    },
    reducers: {
        setDate: (state, action) => {
            state.date = action.payload;
        },
        setDateToday: state => {
            state.date = todayDate;
        },
    },
});

export const { setDate, setDateToday } = dateSlice.actions;

export default dateSlice.reducer;

export const selectDate = state => state.date.date;