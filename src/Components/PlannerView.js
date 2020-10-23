import React from 'react';

const PlannerView = function (props) {
  const start = props.times.start;
  const end = props.times.end;
  let hours = [];

  for (let i = start; i <= end; i++) {
    hours.push(i);
  }
  return (
    hours.map(hour => { return (<span className="hour">{hour < 10 ? `0${hour}:00` : `${hour}:00`}</span>) })
  );
};

export default PlannerView;