import React from 'react';
import { Task } from './Task';

const isDateEqual = function (date1, date2) {
  if (date1.day !== date2.day || date1.month !== date2.month || date1.year !== date2.year) {
    return false;
  }
  return true;
};

const Tasks = function (props) {

  const taskList = props.taskList;
  const date = props.date;
  return (
    taskList.map(task => {
      return (isDateEqual(task.date, date) ?
        <Task task={task} times={props.times} onClick={(id) => props.onClick(id)} /> : null)
    })
  );
};

export default Tasks;