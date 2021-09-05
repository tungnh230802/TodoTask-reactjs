import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtusername: "",
      txtpass:""
    };
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

  onHandleChange(event) {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name] : value
    })
  }

  onHandleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
  }
  render() {
    return (
      <div className="container mt-30">
        <div className="row">
          <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">Panel title</h3>
              </div>
              <div className="panel-body">
                <form onSubmit={this.onHandleSubmit}>
                  <div className="form-group">
                    <label>User Name</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={this.onHandleChange}
                      name="txtusername"
                    />
                  </div>
                  <div className="form-group">
                    <label>Passwork</label>
                    <input
                      type="txtpass"
                      className="form-control"
                      name="txtpass"
                      onChange={this.onHandleChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Lưu
                  </button>
                  <button type="reset" className="btn btn-default">
                    xóa trắng
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
