import React, { Component } from "react";

class CreateStateMachine extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "",
      name: "",
      definition: "",
      roleArn: "",
      response: ""
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
    fetch("/create-state-machine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res =>
        res
          .json()
          .then(data =>
            this.setState({ response: JSON.stringify(data, null, 4) })
          )
      )
      .catch(err => console.log(err));
  };

  render() {
    const response = this.state.response;
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
            <label htmlFor="definition">Definition</label>
            <textarea
              className="form-control"
              id="definition"
              name="definition"
              rows="5"
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
          <input type="submit" value="Submit" />
        </form>
        <div className="response">
          <pre>{response}</pre>
        </div>
      </div>
    );
  }
}

export default CreateStateMachine;
