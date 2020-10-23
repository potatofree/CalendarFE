import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import tasksReducer from './tasksSlice';
import dateReducer from './dateSlice';
import {reducer as formReducer} from 'redux-form';

export default configureStore({
  reducer: {
    tasks: tasksReducer,
    date: dateReducer,
    form: formReducer,
  },
  middleware: [thunk, logger],
});
