import React, { Component } from "react";
import * as StepFunctions from "aws-sdk/clients/stepfunctions";

class CreateActivity extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      endpoint: "",
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
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      name: this.state.name,
      endpoint: this.state.endpoint
    };
    fetch("/create-activity", {
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
          <input type="submit" value="Submit" />
        </form>
        <div className="response">
          <pre>{response}</pre>
        </div>
      </div>
    );
  }
}

export default CreateActivity;
