import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { useSelector, useDispatch} from 'react-redux';
import store from './store';
import { Provider } from 'react-redux';
import { loadTasks, loadTasksAsync, selectTasks } from './tasksSlice';
import { selectDate, setDate} from './dateSlice';

// import App from './App';
// import * as serviceWorker from './serviceWorker';
function dateToString(date) {
  const year = date.year;
  const month = date.month < 10 ? `0${date.month}` : `${date.month}`;
  const day = date.day < 10 ? `0${date.day}` : `${date.day}`
  return `${year}-${month}-${day}`;
}

function NumberCell(props) {
  return (
    <span className="number" onClick={props.onClick}>{props.number}</span>
  );
}

class MonthSection extends React.Component {

  render() {

    return (
      <div className="month-section">
        <MonthNav date={this.props.date} onChange={(date) => this.props.onChange(date)} />
        <MonthView date={this.props.date} onChange={(date) => this.props.onChange(date)} />
      </div>
    );
  }
}

class MonthNav extends React.Component {

  handleClick(direction) {
    const year = this.props.date.year;
    const month = this.props.date.month;

    if (direction === 'back') {
      if (month === 1) {
        this.props.onChange({
          day: 1,
          month: 12,
          year: year - 1,
        });
      } else {
        this.props.onChange({
          day: 1,
          month: month - 1,
          year: year,
        });
      }
    } else if (direction === 'forward') {
      if (month === 12) {
        this.props.onChange({
          day: 1,
          month: 1,
          year: year + 1,
        });
      } else {
        this.props.onChange({
          day: 1,
          month: month + 1,
          year: year,
        });
      }
    } else {
      console.error(`Unknown month change direction: ${direction}`);
    }
  }

  render() {
    const monthList = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return (
      <div className="month-name">
        <button className="month-back-arrow" onClick={() => this.handleClick('back')}>prev</button>
        {monthList[this.props.date.month - 1]}
        <button className="month-forward-arrow" onClick={() => this.handleClick('forward')}>next</button>
      </div>
    );
  }
}

class MonthView extends React.Component {
  monthLength(month, year) {
    return new Date(year, month, 0).getDate();
  }

  monthArray(month, year) {
    const date = new Date(year, month - 1, 1);
    const length = this.monthLength(month, year);
    const firstDayGap = [6, 0, 1, 2, 3, 4, 5];
    const gap = firstDayGap[date.getDay()];
    const gapArray = Array(gap).fill('');

    let monthArr = [];
    for (let i = 1; i <= length; i++) {
      monthArr.push(i);
    }
    return [...gapArray, ...monthArr];
  }

  onNumberClick(number) {
    if (number === '') {
      return;
    } else {
      this.props.onChange({
        day: number,
        month: this.props.date.month,
        year: this.props.date.year,
      });
    }
  }

  render() {
    const weekList = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const month = this.monthArray(this.props.date.month, this.props.date.year);
    return (
      <div className="month">
        {weekList.map(dayName => <span className="dayname">{dayName}</span>)}
        {month.map(number => <NumberCell number={number} onClick={() => this.onNumberClick(number)} />)}
      </div>
    );
  }
}

class Today extends React.Component {

  backToday() {
    const today = new Date();
    this.props.onChange({
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
    });
  }

  render() {
    const todayText = `${this.props.date.day} - ${this.props.date.month} - ${this.props.date.year}`;
    return (
      <div className="date">
        <h2 className="today"><span onClick={() => this.backToday()}>Today</span> is {todayText}</h2>
      </div>
    );
  }
}
class PlannerSection extends React.Component {
  constructor(props) {
    super(props);
    const tasks = this.props.taskList;
    this.state = {
      times: {
        start: 7,
        end: 22,
      },
      displayTaskForm: false,
      taskList: tasks,
      taskNextId: tasks.length + 1,
      taskFormAction: "Add",
    };
  }

  handleAddButtonClick() {
    if (!this.state.displayTaskForm) {
      this.setState({ displayTaskForm: true, taskFormAction: "Add" });
    } else return;
  }

  hideAddSection() {
    console.log("cancel handled");
    this.setState({ displayTaskForm: false, taskFormAction: "Add" });
  }

  addNewTask(newTask) {
    const taskList = this.state.taskList.slice();
    const nextId = this.state.taskNextId;
    this.setState({
      taskList: taskList.concat([{
        id: nextId,
        date: {
          day: newTask.date.day,
          month: newTask.date.month,
          year: newTask.date.year,
        },
        time: {
          start: newTask.time.start,
          end: newTask.time.end,
        },
        name: newTask.name,
        task: newTask.task,
      }]),
      taskNextId: nextId + 1,
      displayTaskForm: false,
      taskToEdit: null,
    });
    console.log(newTask);
  }

  editTask(newTask) {
    const taskList = this.state.taskList.slice();
    const id = this.state.taskToEdit.id;
    const index = taskList.findIndex(task => task.id === id);
    const editedTask = {
      id: id,
      date: {
        day: newTask.date.day,
        month: newTask.date.month,
        year: newTask.date.year,
      },
      time: {
        start: newTask.time.start,
        end: newTask.time.end,
      },
      name: newTask.name,
      task: newTask.task,
    }
    console.log(editedTask);
    this.setState({
      taskList: [...taskList.slice(0, index), ...[editedTask], ...taskList.slice(index + 1)],
      displayTaskForm: false,
      taskToEdit: null,
      taskFormAction: "Add"
    });
  }

  deleteTask() {
    const taskList = this.state.taskList.slice();
    const id = this.state.taskToEdit.id;
    const index = taskList.findIndex(task => task.id === id);
    this.setState({
      taskList: [...taskList.slice(0, index), ...taskList.slice(index + 1)],
      displayTaskForm: false,
      taskToEdit: null,
      taskFormAction: "Add"
    });

  }

  handleTaskClick(id) {
    console.log('id: ', id);
    const taskToEdit = this.state.taskList.find(task => task.id === id);
    console.log(taskToEdit);
    this.setState({ displayTaskForm: true, taskFormAction: "Edit", taskToEdit: taskToEdit });
    return;
  }

  showTaskForm() {
    if (this.state.displayTaskForm) {
      if (this.state.taskFormAction === "Add") {
        return (
          <TaskForm
            visible={this.state.displayTaskForm}
            date={this.props.date}
            times={this.state.times}
            onSubmit={(task) => this.addNewTask(task)}
            onCancel={() => this.hideAddSection()}
            action={this.state.taskFormAction}
          />
        );
      }
      else if (this.state.taskFormAction === "Edit") {
        return (
          <TaskForm
            visible={this.state.displayTaskForm}
            task={this.state.taskToEdit}
            date={this.props.date}
            times={this.state.times}
            onSubmit={(task) => this.editTask(task)}
            onDelete={() => this.deleteTask()}
            onCancel={() => this.hideAddSection()}
            action={this.state.taskFormAction}
          />
        );
      }
    }
    else { return null }
  }

  render() {
    const times = this.state.times;
    return (
      <>
        <div className="day calender">
          <PlannerView times={times} />
          <Tasks
            times={times}
            date={this.props.date}
            taskList={this.props.taskList}
            onClick={(id) => this.handleTaskClick(id)}
          />
        </div>
        {this.showTaskForm()}
        <div className="add-button">
          <button onClick={() => this.handleAddButtonClick()}>Just add new task</button>
        </div>
      </>
    );
  }
}
class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    if (!this.props.task) {
      this.state = {
        timeStart: this.props.times.start,
        timeEnd: this.props.times.end,
        date: dateToString(this.props.date),
        taskName: "New task",
        taskDescription: "",
      };
    }
    else {
      this.state = {
        timeStart: this.props.task.time.start,
        timeEnd: this.props.task.time.end,
        date: dateToString(this.props.task.date),
        taskName: this.props.task.name,
        taskDescription: this.props.task.task,
      };
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    // to-do add start<end detection
    this.setState({
      [name]: target.value
    });
    console.log(target.value);
  }

  clearForm() {
    this.setState({
      timeStart: this.props.times.start,
      timeEnd: this.props.times.end,
      date: dateToString(this.props.date),
      taskName: "New task",
      taskDescription: "",
    });
  }

  handleCancel() {
    this.clearForm();
    this.props.onCancel();
  }

  handleSubmit(event) {
    const task = {
      date: {
        year: Number(this.state.date.slice(0, 4)),
        month: Number(this.state.date.slice(5, 7)),
        day: Number(this.state.date.slice(8, 10)),
      },
      time: {
        start: this.state.timeStart,
        end: this.state.timeEnd,
      },
      name: this.state.taskName,
      task: this.state.taskDescription,
    }
    // this.clearForm();
    // console.log(task);
    // this.props.onCancel();
    this.props.onSubmit(task);
    event.preventDefault();
  }

  deleteButton() {
    if (this.props.action !== "Edit") {
      return null;
    } else {
      return (<button onClick={() => this.props.onDelete()}>Delete</button>);
    }
  }

  render() {
    return (
      <div className="add-section">
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <label>time start
                  <input
              name="timeStart"
              type="number"
              min={this.props.times.start}
              max={this.props.times.end + 1}
              value={this.state.timeStart}
              onChange={(event) => this.handleInputChange(event)}
            />
          </label>
          <label>time end
                  <input
              name="timeEnd"
              type="number"
              min={this.props.times.start}
              max={this.props.times.end + 1}
              value={this.state.timeEnd}
              onChange={(event) => this.handleInputChange(event)}
            />
          </label><br />
          <label>
            <input
              name="date"
              type="date"
              value={this.state.date}
              onChange={(event) => this.handleInputChange(event)}
            /><br />
            <input
              name="taskName"
              type="text"
              value={this.state.taskName}
              onChange={(event) => this.handleInputChange(event)}
            /><br />
            <input
              name="taskDescription"
              type="text"
              value={this.state.taskDescription}
              onChange={(event) => this.handleInputChange(event)}
            />
            <button onClick={() => this.handleCancel()}>Cancel</button>
            {this.deleteButton()}
            <input type="submit" value={this.props.action} />

          </label>

        </form>
      </div>
    );
  }
}
function PlannerView(props) {
  const start = props.times.start;
  const end = props.times.end;
  let hours = [];

  for (let i = start; i <= end; i++) {
    hours.push(i);
  }
  return (
    hours.map(hour => { return (<span className="hour">{hour < 10 ? `0${hour}:00` : `${hour}:00`}</span>) })
  );
}

function isDateEqual(date1, date2) {
  if (date1.day !== date2.day || date1.month !== date2.month || date1.year !== date2.year) {
    return false;
  }
  return true;
}

class Tasks extends React.Component {

  render() {
    const taskList = this.props.taskList;
    const date = this.props.date;
    return (
      taskList.map(task => {
        return (isDateEqual(task.date, date) ?
          <Task task={task} times={this.props.times} onClick={(id) => this.props.onClick(id)} /> : null)
      })
    );
  }
}
function Task(props) {
  const task = props.task;
  const dayStart = props.times.start;
  const dayEnd = props.times.end;
  let firstRow = 0;
  let lastRow = 0;
  if (task.time.end <= dayStart || task.time.start > dayEnd) {
    return null;
  } else {
    if (task.time.start <= dayStart) {
      firstRow = 1;
    } else {
      firstRow = task.time.start - dayStart + 1;
    }
    if (task.time.end > dayEnd) {
      lastRow = dayEnd - dayStart + 2;
    } else {
      lastRow = task.time.end - dayStart + 1;
    }
  }
  const style = {
    gridRow: `${firstRow} / ${lastRow}`
  }
  return (
    <div className={`task ${task.id}`} style={style} onClick={() => props.onClick(task.id)}>
      <span className="DC">
        <h3>{task.name}</h3>
        <p>{task.task}</p>
      </span>
    </div>
  )
}

// class Calender extends React.Component {

// constructor(props) {
//   super(props);
//   const today = new Date();
//   this.state = {
//     date: {
//       day: today.getDate(),
//       month: today.getMonth() + 1,
//       year: today.getFullYear(),
//     }
//   };
// }

// handleDateChange(date) {
//   this.setState({date: date});
// }
const Calender = function () {

  const taskList = useSelector(selectTasks);
  const date = useSelector(selectDate);
  const dispatch = useDispatch();
  const dateTest = {day: 15, month: 10, year: 2020};

  return (
    <div className="container">
      <header>
        <button
          aria-label="Load tasks"
          onClick={() => {dispatch(loadTasksAsync()); dispatch(setDate(dateTest)); console.log(date);}}
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
    </div>

  );
};
// }


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
