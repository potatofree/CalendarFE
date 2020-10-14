import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import tasksReducer from './tasksSlice';

export default configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});
