import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

function NumberCell(props) {
  return (
    <span className="number" onClick={props.onClick}>{props.number}</span>
  );
}

class MonthSection extends React.Component {

  render () {

    return (
    <div className="month-section">
      <MonthNav date={this.props.date} onChange={(date) => this.props.onChange(date)}/>
      <MonthView date={this.props.date} onChange = {(date) => this.props.onChange(date)} />
    </div>
      );}
}

class MonthNav extends React.Component {

  handleClick(direction) {
    const year = this.props.date.year;
    const month = this.props.date.month;

    if (direction === 'back'){
      if(month === 1) {
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

  render () {
    const monthList = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    return (
    <div className="month-name">
      <button className="month-back-arrow" onClick={() => this.handleClick('back')}>prev</button>
      {monthList[this.props.date.month-1]}
      <button className="month-forward-arrow" onClick={() => this.handleClick('forward')}>next</button>
    </div>
    );}
}

class MonthView extends React.Component {
  monthLength(month, year) {
    return new Date(year, month, 0).getDate();
  }

  monthArray(month, year) {
    const date = new Date(year, month-1, 1);
    const length = this.monthLength(month, year);
    const firstDayGap = [6, 0, 1, 2, 3, 4, 5];
    const gap = firstDayGap[date.getDay()];
    const gapArray = Array(gap).fill('');

    let monthArr = [];
    for (let i=1; i<=length; i++) {
        monthArr.push(i);
    }
    return [...gapArray,...monthArr];
  }

  onNumberClick(number) {
    if (number === '') {
      return;
    } else {
    this.props.onChange({
      day: number,
      month: this.props.date.month,
      year: this.props.date.year,
    });}
  }

  render() {
    const weekList =['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const month = this.monthArray(this.props.date.month, this.props.date.year);
    return (
      <div className="month">
        {weekList.map(dayName => <span className="dayname">{dayName}</span>)}
        {month.map(number => <NumberCell number={number} onClick={() => this.onNumberClick(number)}/>)}
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
    return(
      <div className="date">
        <h2 className="today"><span onClick={() => this.backToday()}>Today</span> is {todayText}</h2>
      </div>
    );
  }
}
class PlannerSection extends React.Component {

  render()
  {
    const times = {
      start: 7,
      end: 22,
    };
    return (
      <div className="day calender">
        <PlannerView times={times}/>
        <Tasks times={times} date={this.props.date} taskList={this.props.taskList}/>
      </div>
    );
  }
  }

  function PlannerView(props) {
    const start = props.times.start;
    const end = props.times.end;
    let hours = [];

    for (let i=start; i<=end; i++){
      hours.push(i);
      }
    return (
      hours.map(hour => {return(<span className="hour">{hour<10 ? `0${hour}:00` : `${hour}:00`}</span>)})
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
                taskList.map( task => {
                  return(isDateEqual(task.date, date) ? <Task task={task} times={this.props.times}/> : null)})
              );
            }
          }
  function Task(props) {
    const task = props.task;
            const dayStart = props.times.start;
            const dayEnd = props.times.end;
            let firstRow = 0;
            let lastRow = 0;
            console.log('task');
            if (task.time.end <= dayStart || task.time.start > dayEnd ) {
              console.log(task.time);
              return null;
            } else {
              if (task.time.start<=dayStart) {
                firstRow = 1;
                console.log(firstRow);
              } else {
                firstRow = task.time.start - dayStart + 1;
                console.log(firstRow);
              }
              if (task.time.end > dayEnd) {
                lastRow = dayEnd - dayStart + 1;
                console.log(lastRow);
              } else {
                lastRow = task.time.end - dayStart + 1;
                console.log(lastRow);
              }
            }
            const style = {
          gridRow: `${firstRow} / ${lastRow}`
            }
            console.log(`${firstRow} / ${lastRow}`);
            console.log(style);
            return(
              <div className={`task ${task.id}`} style={style}>
                <span className="DC">
                  <h3>{task.name}</h3>
                  <p>{task.task}</p>
                </span>
              </div>
            )
          }

          class Calender extends React.Component {

            constructor(props) {
              super(props);
              const today = new Date();
              this.state = {
                date: {
                  day: today.getDate(),
                  month: today.getMonth() + 1,
                  year: today.getFullYear(),
                }
              };
            }

            handleDateChange(date) {
              this.setState({date: date});
            }

            render() {
              return (
                <div className="container">
                  <header>
                    <h1 className="hname">Just another calender</h1>
                  </header>
                  <MonthSection
                    date={this.state.date}
                    onChange={(date) => this.handleDateChange(date)}
                  />
                  <Today
                    date={this.state.date}
                    onChange={(date) => this.handleDateChange(date)}
                  />
                  <PlannerSection taskList={this.props.taskList} date={this.state.date}/>
                  <footer>
                    <h5>Just some info in a bottom.</h5>
                  </footer>
                </div>

              );
            }
          }

  const TASKS = [
    {
            id: 1,
            date: {
              day: 13,
              month: 5,
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
              month: 5,
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

ReactDOM.render(
  <React.StrictMode>
    <Calender taskList={TASKS}/>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
