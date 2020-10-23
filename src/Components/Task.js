import React from 'react';

export const Task = function (props) {
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
  };