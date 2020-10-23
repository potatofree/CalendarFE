import { createSlice } from '@reduxjs/toolkit';
import { taskConvertBackToFront, taskConvertFrontToBack, taskConvertFormtoFront } from './tasksConverter';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    value: [],
    selectedTask: {},
  },
  reducers: {
    loadTasks: (state, action) => {
      const tasks = action.payload.map(rawTask => taskConvertBackToFront(rawTask));
      state.value = tasks;
      console.log('loaded tasks', state.value);
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
    addTaskFromForm: (state, action) => {
      const newTask = taskConvertFormtoFront(action.payload);
      addTasks(newTask);
      console.log(newTask);
    },
    selectTask: (state, action) => {
      const id = action.payload;
      console.log(id);
      state.selectedTask = state.value.find(task => task.id === id);
      console.log(JSON.stringify(state.selectedTask));
    }
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

export const { loadTasks, addTasks, addTaskFromForm, selectTask } = tasksSlice.actions;
export default tasksSlice.reducer;

export const selectTasks = state => state.tasks.value;