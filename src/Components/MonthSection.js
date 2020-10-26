import React from 'react';

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

const NumberCell = function (props) {
    return (
        <span className="number" onClick={props.onClick}>{props.number}</span>
    );
};

export const MonthSection = function (props) {
    return (
        <div className="month-section">
            <MonthNav date={props.date} onChange={(date) => props.onChange(date)} />
            <MonthView date={props.date} onChange={(date) => props.onChange(date)} />
        </div>
    );
};