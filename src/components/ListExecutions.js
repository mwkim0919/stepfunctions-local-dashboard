import React, { Component } from "react";

class ListExecutions extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:8083",
      stateMachineArn: "",
      executions: []
    };
  }

  handleChange = event => {
    if (event.target.name === "stateMachineArn") {
      this.setState({
        stateMachineArn: event.target.value
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      param: {
        stateMachineArn: this.state.stateMachineArn
      },
      endpoint: this.state.endpoint
    };

    fetch("/api/list-executions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res =>
        res.json().then(data => this.setState({ executions: data.executions }))
      )
      .catch(err => console.log(err));
  };

  getStatusClassName = status => {
    if (status === "RUNNING") {
      return "table-warning";
    } else if (status === "SUCCEEDED") {
      return "table-success";
    } else {
      return "table-danger";
    }
  }

  render() {
    const executions = this.state.executions;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="stateMachineArn">State Machine ARN</label>
            <input
              type="text"
              className="form-control"
              id="stateMachineArn"
              name="stateMachineArn"
              value={this.state.stateMachineArn}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">Submit</button>
        </form>

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Execution ARN</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {executions.map(execution => {
              return (
                <tr className={this.getStatusClassName(execution.status)}>
                  <td>{execution.name}</td>
                  <td>{execution.executionArn}</td>
                  <td>{execution.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListExecutions;
