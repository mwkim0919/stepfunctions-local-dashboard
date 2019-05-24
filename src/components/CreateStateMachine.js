import React, { Component } from "react";
import StateMachineSnippet from "../StateMachineSnippet";

class CreateStateMachine extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:8083",
      name: "",
      definition: "",
      roleArn: "arn:aws:iam::123456789012:role/asdf",
      response: "",
      statusCode: ""
    };
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
    } else if (event.target.name === "definition") {
      this.setState({
        definition: event.target.value
      });
    } else if (event.target.name === "roleArn") {
      this.setState({
        roleArn: event.target.value
      });
    } else if (event.target.name === 'snippets') {
      this.setState({
        definition: event.target.value
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      param: {
        name: this.state.name,
        definition: this.state.definition,
        roleArn: this.state.roleArn
      },
      endpoint: this.state.endpoint
    };
    fetch("/api/create-state-machine", {
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

  render() {
    const response = this.state.response;
    const statusCode = this.state.statusCode;
    return (
      <div>
        <div className="result">{this.state.result}</div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="endpoint">Endpoint</label>
            <input
              type="text"
              className="form-control"
              id="endpoint"
              name="endpoint"
              value={this.state.endpoint}
              onChange={this.handleChange}
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
          <div className="form-group">
            <label htmlFor="snippets">Snippets</label>
            <select
              className="form-control"
              name="snippets"
              id="snippets"
              onChange={this.handleChange}
            >
              <option>Choose a snippet</option>
              {Object.keys(StateMachineSnippet).map(key => {
                return (
                  <option
                    value={JSON.stringify(StateMachineSnippet[key], null, 4)}
                  >
                    {key.replace(/_/g, " ")}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="definition">Definition</label>
            <textarea
              className="form-control"
              id="definition"
              name="definition"
              rows="10"
              onChange={this.handleChange}
              value={this.state.definition}
            />
          </div>
          <div className="form-group">
            <label htmlFor="roleArn">Role Arn</label>
            <input
              type="text"
              className="form-control"
              id="roleArn"
              name="roleArn"
              value={this.state.roleArn}
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

export default CreateStateMachine;
