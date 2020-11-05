import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useSelector, useDispatch } from 'react-redux';
import store from './store';
import { Provider } from 'react-redux';
import { loadTasksAsync, selectTasks, addTasks } from './tasksSlice';
import { selectDate, setDate, setDateToday } from './dateSlice';
import NewTaskForm from './Components/taskForm';
import { PlannerSection } from './Components/PlannerSection';
import { MonthSection } from './Components/MonthSection';

// import App from './App';
// import * as serviceWorker from './serviceWorker';

// const dateToString = function (date) {
//   const year = date.year;
//   const month = date.month < 10 ? `0${date.month}` : `${date.month}`;
//   const day = date.day < 10 ? `0${date.day}` : `${date.day}`
//   return `${year}-${month}-${day}`;
// };

const Today = function (props) {
  const dispatch = useDispatch();
  const todayText = `${props.date.day} - ${props.date.month} - ${props.date.year}`;
  return (
    <div className="date">
      <h2 className="today"><span onClick={() => dispatch(setDateToday())}>Today</span> is {todayText}</h2>
    </div>
  );
};

const Calender = function () {

  const taskList = useSelector(selectTasks);
  const date = useSelector(selectDate);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Component did updated.');
  })

  return (
    <div className="container">
      <header>
        <button
          aria-label="Load tasks"
          onClick={() => { dispatch(loadTasksAsync()); }}
        >
          Load
        </button>

        <h1 className="hname">Just another calender</h1>
      </header>
      <MonthSection
        date={date}
        onChange={(date) => dispatch(setDate(date))}
      />
      <Today
        date={date}
        onChange={(date) => dispatch(setDate(date))}
      />
      <PlannerSection taskList={taskList} date={date} />
      <footer>
        <h5>Just some info in a bottom.</h5>
      </footer>
      <br />
      <NewTaskForm onSubmit={(values) => dispatch(addTasks(values))} />
    </div>

  );
};

const App = function () {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadTasksAsync())
  });

  return <Calender />
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
