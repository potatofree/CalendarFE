import { createSlice } from '@reduxjs/toolkit';

const TASKS = [
  {
    id: 1,
    date: {
      day: 13,
      month: 10,
      year: 2020,
    },
    time: {
      start: 7,
      end: 10,
    },
    name: `Just make this site.`,
    task: `Calm down and Justify!`,
  },
  {
    id: 2,
    date: {
      day: 13,
      month: 10,
      year: 2020,
    },
    time: {
      start: 13,
      end: 15,
    },
    name: `Lunch`,
    task: `Just eat smthng.`,
  },
  {
    id: 3,
    date: {
      day: 14,
      month: 5,
      year: 2020,
    },
    time: {
      start: 18,
      end: 23,
    },
    name: `Git-git.`,
    task: `Keep calm and just commit.`,
  },
];

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    value: [],
  },
  reducers: {
    loadTasks: (state, action) => {
      const tasks = action.payload.map(rawTask => {
        const start = new Date(rawTask.start);
        const end = new Date(rawTask.end);
        let task = {
          id: rawTask._id,
          date: {
            day: start.getDate(),
            month: start.getMonth() + 1,
            year: start.getFullYear(),
          },
          time: {
            start: start.getHours(),
            end: end.getHours(),
          },
          name: rawTask.name,
          task: rawTask.body,
        };
        console.log(task);
        return task;
      });
      state.value = tasks;
      console.log('loaded tasks', tasks);
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

export const { loadTasks } = tasksSlice.actions;
export default tasksSlice.reducer;

export const selectTasks = state => state.tasks.value;