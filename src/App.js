import React, { Component } from "react";
import TaskForm from "./components/TaskForm";
import Control from "./components/Control";
import TaskList from "./components/TaskList";
import {findIndex} from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskEditing: null,
      isDisplayform: false,
      filter: {
        name: "",
        status: -1,
      },
      keyWork: "",
      sortBy: "name",
      sortValue: 1,
    };
  }

  s4() {
    return Math.random((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  generateId() {
    return (
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4()
    );
  }

  componentWillMount() {
    if (localStorage && localStorage.getItem("tasks")) {
      var tasks = JSON.parse(localStorage.getItem("tasks"));
      this.setState({
        tasks: tasks,
      });
    }
  }

  onToggleForm = () => {
    if (this.state.isDisplayform || this.state.taskEditing !== null) {
      console.log("th1");
      this.setState({
        isDisplayform: true,
        taskEditing: null,
      });
    } else {
      this.setState({
        isDisplayform: !this.state.isDisplayform,
        taskEditing: null,
      });
    }
  };

  onCloseForm = () => {
    this.setState({
      isDisplayform: false,
      taskEditing: null,
    });
  };

  onShowForm = () => {
    this.setState({
      isDisplayform: true,
    });
  };

  onSubmit = (data) => {
    var { tasks } = this.state;
    if (data.id === "") {
      data.id = this.generateId();
      tasks.push(data);
    } else {
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks: tasks,
      taskEditing: null,
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  onUpdataStatus = (id) => {
    var { tasks } = this.state;
    // var index = this.findIndex(id);
    var index = findIndex(tasks, (task) => {
      return task.id === id;
    });
    if (index != -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks,
      });
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  findIndex = (id) => {
    var result = -1;
    this.state.tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  };

  onDelete = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index != -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks,
      });
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    this.onCloseForm();
  };

  onUpdata = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing,
    });

    this.onShowForm();
  };

  onFilter = (filterName, filterStatus) => {
    console.log(filterName + "-" + filterStatus);
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus,
      },
    });
  };

  onSearch = (keyWork) => {
    this.setState({
      keyWork: keyWork,
    });
  };

  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue,
    });
  };
  render() {
    var {
      tasks,
      isDisplayform,
      taskEditing,
      filter,
      keyWork,
      sortBy,
      sortValue,
    } = this.state;
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }

      tasks = tasks.filter((task) => {
        if (filter.status === -1) {
          return task;
        } else {
          return task.status === (filter.status === 1 ? true : false);
        }
      });
    }

    if (keyWork) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyWork) !== -1;
      });
    }

    if (sortBy === "name") {
      tasks.sort((a, b) => {
        if (a.name > b.name) return sortValue;
        else if (a.name < b.name) return sortValue;
        else return 0;
      });
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status) return -sortValue;
        else if (a.status < b.statuts) return -sortValue;
        else return 0;
      });
    }
    var elmTaksForm = isDisplayform ? (
      <TaskForm
        taskEditing={taskEditing}
        onSubmit={this.onSubmit}
        onCloseForm={this.onCloseForm}
      />
    ) : (
      ""
    );
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div
            className={
              isDisplayform ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""
            }
          >
            {elmTaksForm}
          </div>
          <div
            className={
              isDisplayform
                ? "col-xs-8 col-sm-8 col-md-8 col-lg-8"
                : "col-xs-12 col-sm-12 col-md-12 col-lg-12"
            }
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.onToggleForm}
            >
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
            </button>
            <Control
              onSearch={this.onSearch}
              onSort={this.onSort}
              sortBy={sortBy}
              sortValue={sortValue}
            />
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList
                  tasks={tasks}
                  onUpdataStatus={this.onUpdataStatus}
                  onDelete={this.onDelete}
                  onUpdata={this.onUpdata}
                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
