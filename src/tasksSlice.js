import { createSlice } from '@reduxjs/toolkit';
import { taskConvertBackToFront, taskConvertFrontToBack } from './tasksConverter';

// const TASKS = [
//   {
//     id: 1,
//     date: {
//       day: 13,
//       month: 10,
//       year: 2020,
//     },
//     time: {
//       start: 7,
//       end: 10,
//     },
//     name: `Just make this site.`,
//     task: `Calm down and Justify!`,
//   },
//   {
//     id: 2,
//     date: {
//       day: 13,
//       month: 10,
//       year: 2020,
//     },
//     time: {
//       start: 13,
//       end: 15,
//     },
//     name: `Lunch`,
//     task: `Just eat smthng.`,
//   },
//   {
//     id: 3,
//     date: {
//       day: 14,
//       month: 5,
//       year: 2020,
//     },
//     time: {
//       start: 18,
//       end: 23,
//     },
//     name: `Git-git.`,
//     task: `Keep calm and just commit.`,
//   },
// ];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    value: [],
  },
  reducers: {
    loadTasks: (state, action) => {
      const tasks = action.payload.map(rawTask => taskConvertBackToFront(rawTask));
      state.value = tasks;
      console.log('loaded tasks', tasks);
    },
    addTasks: (state, action) => {
      const newTask = taskConvertFrontToBack(action.payload);
      console.log(newTask);
      console.log(action.payload);
      fetch('http://localhost:3001/calender/events/', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
  },
});

export const loadTasksAsync = () => dispatch => {
  fetch('http://localhost:3001/calender/events')
    .then(response => response.json())
    .then(data => dispatch(loadTasks(data)))
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
};

export const { loadTasks, addTasks } = tasksSlice.actions;
export default tasksSlice.reducer;

export const selectTasks = state => state.tasks.value;