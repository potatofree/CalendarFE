import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

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
    console.log(date, length, date.getDay(), gap);
    let monthArr = [];

    for (let i=1; i<=length; i++) {
        monthArr.push(i);
    }
    return [...gapArray,...monthArr];
  }

  render() {
    const week =['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const month = this.monthArray(this.props.month, this.props.year);
    return (
      <div className="month">
        {week.map(dayName => <span className="dayname">{dayName}</span>)}
        {month.map(number =><span className="number">{number}</span>)}
      </div>
    );
  }
}


class Calender extends React.Component {

  render() {
    return (
      <div className="container">
        <header>
          <h1 className="hname">Just another calender</h1>
        </header>
        <MonthView month="5" year="2020"/>

        <div className="date">
          <h2 className="today">Monday, 15 Justember</h2>
        </div>
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
