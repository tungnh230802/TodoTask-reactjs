import React, { Component } from "react";
class TaskItem extends Component {
  onUpdataStatus = () => {
    this.props.onUpdataStatus(this.props.task.id);
  };

  onDelete = () => {
    this.props.onDelete(this.props.task.id);
  };

  onUpdata = () => {
    this.props.onUpdata(this.props.task.id);
  };

  render() {
    var { task, index } = this.props;
    return (
      <tr>
        <td>{index}</td>
        <td>{task.name}</td>
        <td className="text-center">
          <span
            onClick={this.onUpdataStatus}
            className={
              task.status === true
                ? "label label-danger"
                : "label label-success"
            }
          >
            {task.status === true ? "kích hoạt" : "Ẩn"}
          </span>
        </td>
        <td className="text-center">
          <button
            onClick={this.onUpdata}
            type="button"
            className="btn btn-warning"
          >
            <span className="far fa-edit mr-5"></span>
            Sửa
          </button>
          &nbsp;
          <button
            onClick={this.onDelete}
            type="button"
            className="btn btn-danger"
          >
            <span className="fa fa-trash mr-5"></span>Xóa
          </button>
        </td>
      </tr>
    );
  }
}

export default TaskItem;
