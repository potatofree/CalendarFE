export const taskConvertBackToFront = (backTask) => {
    const start = new Date(backTask.start);
    const end = new Date(backTask.end);
    let frontTask = {
      id: backTask._id,
      date: {
        day: start.getDate(),
        month: start.getMonth() + 1,
        year: start.getFullYear(),
      },
      time: {
        start: start.getHours(),
        end: end.getHours(),
      },
      name: backTask.name,
      task: backTask.body,
    };
    return frontTask;
  };

  export const taskConvertFrontToBack = (frontTask) => {
    const start = new Date(frontTask.date.year, frontTask.date.month-1, frontTask.date.day, frontTask.time.start);
    const end = new Date(frontTask.date.year, frontTask.date.month-1, frontTask.date.day, frontTask.time.end);
    let backTask = {
        name: frontTask.name,
        body: frontTask.task,
        start: start,
        end: end,
    };
    return backTask;
  };

  export const taskConvertFormtoBack = (formTask) => {

    let start = new Date(formTask.taskDate);
    start.setHours(formTask.taskTimeStart);
    let end = new Date(formTask.taskDate);
    end.setHours(formTask.taskTimeEnd);
    let backTask = {
      name: formTask.taskName,
      body: formTask.taskBody,
      start: start,
      end: end,
    };
    return backTask;
  };

  export const taskConvertFormtoFront = (formTask) => {
    const date = new Date(formTask.taskDate);
    let frontTask = {
      id: undefined,
      date: {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      },
      time: {
        start: formTask.taskTimeStart,
        end: formTask.taskTimeEnd,
      },
      name: formTask.taskName,
      task: formTask.taskBody,
    };
    return frontTask;
  };