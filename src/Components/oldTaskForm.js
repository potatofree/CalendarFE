class TaskForm extends React.Component {
    constructor(props) {
      super(props);
      if (!this.props.task) {
        this.state = {
          timeStart: this.props.times.start,
          timeEnd: this.props.times.end,
          date: dateToString(this.props.date),
          taskName: "New task",
          taskDescription: "",
        };
      }
      else {
        this.state = {
          timeStart: this.props.task.time.start,
          timeEnd: this.props.task.time.end,
          date: dateToString(this.props.task.date),
          taskName: this.props.task.name,
          taskDescription: this.props.task.task,
        };
      }
    }
  
    handleInputChange(event) {
      const target = event.target;
      const name = target.name;
      // to-do add start<end detection
      this.setState({
        [name]: target.value
      });
      console.log(target.value);
    }
  
    clearForm() {
      this.setState({
        timeStart: this.props.times.start,
        timeEnd: this.props.times.end,
        date: dateToString(this.props.date),
        taskName: "New task",
        taskDescription: "",
      });
    }
  
    handleCancel() {
      this.clearForm();
      this.props.onCancel();
    }
  
    handleSubmit(event) {
      const task = {
        date: {
          year: Number(this.state.date.slice(0, 4)),
          month: Number(this.state.date.slice(5, 7)),
          day: Number(this.state.date.slice(8, 10)),
        },
        time: {
          start: this.state.timeStart,
          end: this.state.timeEnd,
        },
        name: this.state.taskName,
        task: this.state.taskDescription,
      }
      // this.clearForm();
      // console.log(task);
      // this.props.onCancel();
      this.props.onSubmit(task);
      event.preventDefault();
    }
  
    deleteButton() {
      if (this.props.action !== "Edit") {
        return null;
      } else {
        return (<button onClick={() => this.props.onDelete()}>Delete</button>);
      }
    }
  
    render() {
      return (
        <div className="add-section">
          <form onSubmit={(event) => this.handleSubmit(event)}>
            <label>time start
                    <input
                name="timeStart"
                type="number"
                min={this.props.times.start}
                max={this.props.times.end + 1}
                value={this.state.timeStart}
                onChange={(event) => this.handleInputChange(event)}
              />
            </label>
            <label>time end
                    <input
                name="timeEnd"
                type="number"
                min={this.props.times.start}
                max={this.props.times.end + 1}
                value={this.state.timeEnd}
                onChange={(event) => this.handleInputChange(event)}
              />
            </label><br />
            <label>
              <input
                name="date"
                type="date"
                value={this.state.date}
                onChange={(event) => this.handleInputChange(event)}
              /><br />
              <input
                name="taskName"
                type="text"
                value={this.state.taskName}
                onChange={(event) => this.handleInputChange(event)}
              /><br />
              <input
                name="taskDescription"
                type="text"
                value={this.state.taskDescription}
                onChange={(event) => this.handleInputChange(event)}
              />
              <button onClick={() => this.handleCancel()}>Cancel</button>
              {this.deleteButton()}
              <input type="submit" value={this.props.action} />
  
            </label>
  
          </form>
        </div>
      );
    }
  }