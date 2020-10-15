import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import tasksReducer from './tasksSlice';
import dateReducer from './dateSlice';

export default configureStore({
  reducer: {
    tasks: tasksReducer,
    date: dateReducer,
  },
});
