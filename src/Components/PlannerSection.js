import React from 'react';
import PlannerView from './PlannerView';
import Tasks from './Tasks';
import { useDispatch } from 'react-redux';
import { selectTask } from '../tasksSlice';

// const tasks = props.task;
//       this.state = {
//         times: {
//           start: 7,
//           end: 22,
//         },
//         displayTaskForm: false,
//         taskList: tasks,
//         taskNextId: tasks.length + 1,
//         taskFormAction: "Add",
//       };
//     }

// handleAddButtonClick() {
//     if (!this.state.displayTaskForm) {
//         this.setState({ displayTaskForm: true, taskFormAction: "Add" });
//     } else return;
// }

// hideAddSection() {
//     console.log("cancel handled");
//     this.setState({ displayTaskForm: false, taskFormAction: "Add" });
// }

// addNewTask(newTask) {
//     const taskList = this.state.taskList.slice();
//     const nextId = this.state.taskNextId;
//     this.setState({
//         taskList: taskList.concat([{
//             id: nextId,
//             date: {
//                 day: newTask.date.day,
//                 month: newTask.date.month,
//                 year: newTask.date.year,
//             },
//             time: {
//                 start: newTask.time.start,
//                 end: newTask.time.end,
//             },
//             name: newTask.name,
//             task: newTask.task,
//         }]),
//         taskNextId: nextId + 1,
//         displayTaskForm: false,
//         taskToEdit: null,
//     });
//     console.log(newTask);
// }

// editTask(newTask) {
//     const taskList = this.state.taskList.slice();
//     const id = this.state.taskToEdit.id;
//     const index = taskList.findIndex(task => task.id === id);
//     const editedTask = {
//         id: id,
//         date: {
//             day: newTask.date.day,
//             month: newTask.date.month,
//             year: newTask.date.year,
//         },
//         time: {
//             start: newTask.time.start,
//             end: newTask.time.end,
//         },
//         name: newTask.name,
//         task: newTask.task,
//     }
//     console.log(editedTask);
//     this.setState({
//         taskList: [...taskList.slice(0, index), ...[editedTask], ...taskList.slice(index + 1)],
//         displayTaskForm: false,
//         taskToEdit: null,
//         taskFormAction: "Add"
//     });
// }

// deleteTask() {
//     const taskList = this.state.taskList.slice();
//     const id = this.state.taskToEdit.id;
//     const index = taskList.findIndex(task => task.id === id);
//     this.setState({
//         taskList: [...taskList.slice(0, index), ...taskList.slice(index + 1)],
//         displayTaskForm: false,
//         taskToEdit: null,
//         taskFormAction: "Add"
//     });

// }

// handleTaskClick(id) {
//     console.log('id: ', id);
//     const taskToEdit = this.state.taskList.find(task => task.id === id);
//     console.log(taskToEdit);
//     this.setState({ displayTaskForm: true, taskFormAction: "Edit", taskToEdit: taskToEdit });
//     return;
// }

// showTaskForm() {
//     if (this.state.displayTaskForm) {
//         if (this.state.taskFormAction === "Add") {
//             return (
//                 <TaskForm
//                     visible={this.state.displayTaskForm}
//                     date={this.props.date}
//                     times={this.state.times}
//                     onSubmit={(task) => this.addNewTask(task)}
//                     onCancel={() => this.hideAddSection()}
//                     action={this.state.taskFormAction}
//                 />
//             );
//         }
//         else if (this.state.taskFormAction === "Edit") {
//             return (
//                 <TaskForm
//                     visible={this.state.displayTaskForm}
//                     task={this.state.taskToEdit}
//                     date={this.props.date}
//                     times={this.state.times}
//                     onSubmit={(task) => this.editTask(task)}
//                     onDelete={() => this.deleteTask()}
//                     onCancel={() => this.hideAddSection()}
//                     action={this.state.taskFormAction}
//                 />
//             );
//         }
//     }
//     else { return null }
// }
// }

const times = {
    start: 7,
    end: 22,
};

// const handleTaskClick = (id) => {

//     console.log('id: ', id);


//  };
const showTaskForm = () => { };
const handleAddButtonClick = () => { };

export const PlannerSection = (props) => {
    const dispatch = useDispatch();
    return (
        <>
            <div className="day calender">
                <PlannerView times={times} />
                <Tasks
                    times={times}
                    date={props.date}
                    taskList={props.taskList}
                    onClick={(id) => dispatch(selectTask(id))}
                />
            </div>
            {showTaskForm()}
            <div className="add-button">
                <button onClick={() => handleAddButtonClick()}>Just add new task</button>
            </div>
        </>
    );
};