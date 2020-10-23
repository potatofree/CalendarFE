import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useSelector, useDispatch } from 'react-redux';
import store from './store';
import { Provider } from 'react-redux';
import { loadTasksAsync, selectTasks, addTasks } from './tasksSlice';
import { selectDate, setDate, setDateToday } from './dateSlice';
import NewTaskForm from './Components/taskForm';
import {taskConvertFormtoFront} from './tasksConverter';
import {PlannerSection} from './Components/PlannerSection';

// import App from './App';
// import * as serviceWorker from './serviceWorker';
const dateToString = function (date) {
  const year = date.year;
  const month = date.month < 10 ? `0${date.month}` : `${date.month}`;
  const day = date.day < 10 ? `0${date.day}` : `${date.day}`
  return `${year}-${month}-${day}`;
};


const NumberCell = function (props) {
  return (
    <span className="number" onClick={props.onClick}>{props.number}</span>
  );
};

const MonthSection = function (props) {
  return (
    <div className="month-section">
      <MonthNav date={props.date} onChange={(date) => props.onChange(date)} />
      <MonthView date={props.date} onChange={(date) => props.onChange(date)} />
    </div>
  );
};

const monthNavigation = function (date, direction) {
  const year = date.year;
  const month = date.month;

  if (direction === 'back') {
    if (month === 1) {
      return ({
        day: 1,
        month: 12,
        year: year - 1,
      });
    } else {
      return ({
        day: 1,
        month: month - 1,
        year: year,
      });
    }
  } else if (direction === 'forward') {
    if (month === 12) {
      return ({
        day: 1,
        month: 1,
        year: year + 1,
      });
    } else {
      return ({
        day: 1,
        month: month + 1,
        year: year,
      });
    }
  } else {
    console.error(`Unknown month change direction: ${direction}`);
  }
};

const MonthNav = function (props) {
  const monthList = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  return (
    <div className="month-name">
      <button className="month-back-arrow" onClick={() => props.onChange(monthNavigation(props.date, 'back'))}>prev</button>
      {monthList[props.date.month - 1]}
      <button className="month-forward-arrow" onClick={() => props.onChange(monthNavigation(props.date, 'forward'))}>next</button>
    </div>
  );
};

const monthLength = function (month, year) {
  return new Date(year, month, 0).getDate();
};

const monthArray = function (month, year) {
  const date = new Date(year, month - 1, 1);
  const length = monthLength(month, year);
  const firstDayGap = [6, 0, 1, 2, 3, 4, 5];
  const gap = firstDayGap[date.getDay()];
  const gapArray = Array(gap).fill('');

  let monthArr = [];
  for (let i = 1; i <= length; i++) {
    monthArr.push(i);
  }
  return [...gapArray, ...monthArr];
};

const MonthView = function (props) {
  const weekList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const month = monthArray(props.date.month, props.date.year);
  return (
    <div className="month">
      {weekList.map(dayName => <span className="dayname">{dayName}</span>)}
      {month.map(number => <NumberCell number={number} onClick={() =>
        props.onChange({
          day: (number) ? number : props.date.day,
          month: props.date.month,
          year: props.date.year,
        })
      } />)}
    </div>
  );
};

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
  const testTask = {
    id: 1,
    date: {
      day: 15,
      month: 10,
      year: 2020,
    },
    time: {
      start: 11,
      end: 14,
    },
    name: `Make tests great Again`,
    task: `test! test! test!`,
  };

  return (
    <div className="container">
      <header>
        <button
          aria-label="Load tasks"
          onClick={() => { dispatch(loadTasksAsync()); }}
        >
          Load
        </button>
        <button
          aria-label="Add task"
          onClick={() => { dispatch(addTasks(testTask)); }}
        >
          Add
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
      <NewTaskForm onSubmit={(values) => {
        const newTask = taskConvertFormtoFront(values);
        dispatch(addTasks(newTask));
      }
      } />
      <br />
      <br />
      <br />
      <br />
    </div>

  );
};


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Calender />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
