import React, { Component } from "react";

class CreateStateMachine extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      endpoint: "",
      definition: ""
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
    } else if (event.target.name == "definition") {
      this.setState({
        definition: event.target.value
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    let message = `aws stepfunctions create-activity --endpoint '${
      this.state.endpoint
    }' --name '${this.state.name}' --defintion '${this.state.definition}'`;
    alert(message);
  };

  render() {
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
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreateStateMachine;
