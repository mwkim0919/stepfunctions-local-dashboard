import React, { Component } from "react";
import StateMachineSnippet from "../StateMachineSnippet";

class CreateStateMachine extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:8083",
      name: "",
      definition: "",
      type: "STANDARD",
      roleArn: "",
      includeExecutionData: true,
      logGroupArn: "",
      logLevel: "ALL",
      tagKeys: "",
      tagValues: "",
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
    } else if (event.target.name === "type") {
      this.setState({
        type: event.target.value
      });
    } else if (event.target.name === "roleArn") {
      this.setState({
        roleArn: event.target.value
      });
    } else if (event.target.name === "includeExecutionData") {
      this.setState({
        includeExecutionData: event.target.value === "true" ? true : false
      });
    } else if (event.target.name === "logGroupArn") {
      this.setState({
        logGroupArn: event.target.value
      });
    } else if (event.target.name === "logLevel") {
      this.setState({
        logLevel: event.target.value
      });
    } else if (event.target.name === "snippets") {
      if (event.target.value !== "") {
        this.setState({
          definition: event.target.value
        });
      }
    } else if (event.target.name === "tagKeys") {
      this.setState({
        tagKeys: event.target.value
      });
    } else if (event.target.name === "tagValues") {
      this.setState({
        tagValues: event.target.value
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      param: {
        name: this.state.name,
        definition: this.state.definition,
        type: this.state.type,
        roleArn:
          this.state.roleArn === ""
            ? "arn:aws:iam::123456789012:role/test"
            : this.state.roleArn,
        tags: this.processTags(this.state.tagKeys, this.state.tagValues),
        loggingConfiguration:
          this.state.logLevel !== "OFF"
            ? this.buildLogConfiguration(
                this.state.logLevel,
                this.state.logGroupArn,
                this.state.includeExecutionData
              )
            : null
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

  processTags(keys, values) {
    const tags = [];
    const keyArray = keys.split(",").filter(key => key.length !== 0);
    const valueArray = values.split(",").filter(key => key.length !== 0);
    keyArray.forEach((key, index) => {
      const tag = {
        key: key.trim(),
        value: valueArray[index].trim()
      };
      tags.push(tag);
    });
    return tags;
  }

  buildLogConfiguration(logLevel, logGroupArn, includeExecutionData) {
    const logConfiguration = {
      destinations: [
        {
          cloudWatchLogsLogGroup: {
            logGroupArn: `${logGroupArn}:*`
          }
        }
      ],
      includeExecutionData: includeExecutionData,
      level: logLevel
    };
    return logConfiguration;
  }

  reindent = event => {
    event.preventDefault();
    const definition = this.state.definition;
    const formattedDefinition = JSON.stringify(JSON.parse(definition), null, 2);
    this.setState({ definition: formattedDefinition });
  };

  render() {
    const response = this.state.response;
    const statusCode = this.state.statusCode;
    return (
      <div>
        <div className="result">{this.state.result}</div>
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
              <option value="">Choose a snippet</option>
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
            <button
              className="btn btn-primary btn-lg btn-block"
              onClick={this.reindent}
            >
              Reindent
            </button>
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
            <label htmlFor="type">Type</label>
            <select
              className="form-control"
              name="type"
              id="type"
              onChange={this.handleChange}
            >
              <option value="STANDARD">Standard</option>
              <option value="EXPRESS">Express</option>
            </select>
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
              placeholder="Put Role ARN (e.g. arn:aws:iam::123456789012:role/asdf) If not provided, then a dummpy role ARN will be used."
            />
          </div>
          <div className="form-group">
            <label htmlFor="logLevel">Log Level</label>
            <select
              className="form-control"
              name="logLevel"
              id="logLevel"
              onChange={this.handleChange}
            >
              <option value="ALL">ALL</option>
              <option value="FATAL">FATAL</option>
              <option value="ERROR">ERROR</option>
              <option value="OFF">OFF</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="includeExecutionData">includeExecutionData</label>
            <select
              className="form-control"
              name="includeExecutionData"
              id="includeExecutionData"
              onChange={this.handleChange}
            >
              <option value="true">On</option>
              <option value="false">Off</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="roleArn">logGroupArn</label>
            <input
              type="text"
              className="form-control"
              id="logGroupArn"
              name="logGroupArn"
              value={this.state.logGroupArn}
              onChange={this.handleChange}
              placeholder="arn:aws:logs:us-east-1:123456789012:log-group:/aws/states/log-group-name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="tagKeys">Tag Keys</label>
            <textarea
              className="form-control"
              id="tagKeys"
              name="tagKeys"
              rows="5"
              onChange={this.handleChange}
              value={this.state.tagKeys}
              placeholder="Put tag keys separated by comma. e.g. tag1,tag2"
            />
          </div>
          <div className="form-group">
            <label htmlFor="tagValues">Tag Values</label>
            <textarea
              className="form-control"
              id="tagValues"
              name="tagValues"
              rows="5"
              onChange={this.handleChange}
              value={this.state.tagValues}
              placeholder="Put tag values separated by comma in the order of associated tag keys. e.g. value1,value2"
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
