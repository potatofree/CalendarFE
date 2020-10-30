export const occupiedDays = (tasks, month, year) => {
    let occupiedDays = [];
    tasks.forEach(task => {
        if (task.date.year === year && task.date.month === month) {
            occupiedDays = [...occupiedDays, ...[task.date.day]];
        };
    });
    return occupiedDays;
};  