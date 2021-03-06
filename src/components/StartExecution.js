import React, { Component } from "react";
import uuidv1 from "uuid/v1";

class StartExecution extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:8083",
      name: "",
      stateMachineArn: "",
      stateMachines: [],
      input: "",
      response: "",
      statusCode: ""
    };
  }

  componentDidMount() {
    const data = {
      param: {},
      endpoint: this.state.endpoint
    };

    fetch("/api/list-state-machines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res =>
        res.json().then(data => {
          const stateMachines = data.stateMachines;
          this.setState({ stateMachines: stateMachines });
          if (stateMachines.length > 0) {
            this.setState({
              stateMachineArn: stateMachines[0].stateMachineArn
            });
          }
        })
      )
      .catch(err => console.log(err));
  }

  handleChange = event => {
    if (event.target.name === "name") {
      this.setState({
        name: event.target.value
      });
    } else if (event.target.name === "endpoint") {
      this.setState({
        endpoint: event.target.value
      });
    } else if (event.target.name === "stateMachineArn") {
      this.setState({
        stateMachineArn: event.target.value
      });
    } else if (event.target.name === "input") {
      this.setState({
        input: event.target.value
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      param: {
        stateMachineArn: this.state.stateMachineArn,
        input: this.state.input,
        name: this.state.name === "" ? uuidv1() : this.state.name
      },
      endpoint: this.state.endpoint
    };
    fetch("/api/start-execution", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res =>
        res.json().then(data => {
          if ("statusCode" in data) {
            this.setState({ statusCode: data.statusCode });
          } else {
            this.setState({ statusCode: "200" });
          }
          this.setState({ response: JSON.stringify(data, null, 4) });
        })
      )
      .catch(err => this.setState({ response: JSON.stringify(err, null, 4) }));
  };

  reindent = event => {
    event.preventDefault();
    const input = this.state.input;
    const formattedInput = JSON.stringify(JSON.parse(input), null, 2);
    this.setState({ input: formattedInput });
  };

  render() {
    const stateMachines = this.state.stateMachines;
    const response = this.state.response;
    const statusCode = this.state.statusCode;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {/* <div className="form-group">
            <label htmlFor="endpoint">Endpoint</label>
            <input
              type="text"
              className="form-control"
              id="endpoint"
              name="endpoint"
              value={this.state.endpoint}
              onChange={this.handleChange}
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="stateMachineArn">State Machine ARN</label>
            <select
              className="form-control"
              name="stateMachineArn"
              id="stateMachineArn"
              onChange={this.handleChange}
              value={this.state.stateMachineArn}
              required
            >
              {stateMachines.map(stateMachine => {
                return (
                  <option value={stateMachine.stateMachineArn}>
                    {stateMachine.stateMachineArn}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="input">Input</label>
            <button
              className="btn btn-primary btn-lg btn-block"
              onClick={this.reindent}
            >
              Reindent
            </button>
            <textarea
              className="form-control"
              id="input"
              name="input"
              rows="5"
              onChange={this.handleChange}
              value={this.state.input}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Submit
          </button>
        </form>
        {response.length > 0 && (
          <div
            className={
              statusCode === "200"
                ? "alert alert-success response"
                : "alert alert-danger response"
            }
            role="alert"
          >
            <pre>{response}</pre>
          </div>
        )}
      </div>
    );
  }
}

export default StartExecution;
