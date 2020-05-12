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
    const day = this.props.day;
    const month = this.props.month;
    const year = this.props.year;

    return (
    <div class="month-section">
      <MonthNav day={day} month={month} year={year} onChange={(date) => this.props.onChange(date)}/>
      <MonthView day={day} month={month} year={year} onChange = {(date) => this.props.onChange(date)} />
    </div>
      );}
}

class MonthNav extends React.Component {

  handleClick(direction) {
    const year = this.props.year;
    const month = this.props.month;

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
      {monthList[this.props.month-1]}
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
      month: this.props.month,
      year: this.props.year,
    });}
  }

  render() {
    const weekList =['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const month = this.monthArray(this.props.month, this.props.year);
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
    const todayText = `${this.props.day} - ${this.props.month} - ${this.props.year}`;
    return(
      <div className="date">
        <h2 className="today"><span onClick={() => this.backToday()}>Today</span> is {todayText}</h2>
      </div>
    );
  }
}

class Calender extends React.Component {

  constructor(props) {
    super(props);
    const today = new Date();
    this.state = {
      day: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
    };
  }

  handleDateChange(date) {
    this.setState({
      day: date.day,
      month: date.month,
      year: date.year,
    });
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1 className="hname">Just another calender</h1>
        </header>
        <MonthSection
          day={this.state.day}
          month={this.state.month}
          year={this.state.year}
          onChange={(date) => this.handleDateChange(date)}
        />
        <Today
          day={this.state.day}
          month={this.state.month}
          year={this.state.year}
          onChange={(date) => this.handleDateChange(date)}
        />
        <div className="day calender">
          <span className="hour">7:00</span>
          <span className="hour">8:00</span>
          <span className="hour">9:00</span>
          <span className="hour">10:00</span>
          <span className="hour">11:00</span>
          <span className="hour">12:00</span>
          <span className="hour">13:00</span>
          <span className="hour">14:00</span>
          <span className="hour">15:00</span>
          <span className="hour">16:00</span>
          <span className="hour">17:00</span>
          <span className="hour">18:00</span>
          <span className="hour">19:00</span>
          <span className="hour">20:00</span>
          <span className="hour">21:00</span>
          <span className="hour">22:00</span>
          <span className="task A">
            <span className="DC">
              <h3>Just make this site.</h3>
              <p>Calm down<br/>and<br/>Justify!</p>
            </span>
          </span>
          <div className="task B">
            <span className="DC">Just commit it in the git.</span>
          </div>
          <span className="task C">
            <span className="DC">Just have a rest.</span>
          </span>


        </div>
        <footer>
          <h5>Just some info in a bottom.</h5>
          <div id="like_button_container"></div>
        </footer>
      </div>

    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Calender />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
