import React, { Component } from "react";

class GetExecutionHistory extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:8083",
      executions: [],
      executionArn: "",
      stateMachines: [],
      stateMachineArn: "",
      events: []
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

            const executionData = {
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
              body: JSON.stringify(executionData)
            })
              .then(res =>
                res.json().then(data => {
                  const executions = data.executions;
                  this.setState({ executions: executions });
                  if (executions.length > 0) {
                    this.setState({
                      executionArn: executions[0].executionArn
                    });
                  }
                })
              )
              .catch(err => console.log(err));
          }
        })
      )
      .catch(err => console.log(err));
  }

  handleChange = event => {
    if (event.target.name === "executionArn") {
      this.setState({
        executionArn: event.target.value
      });
    } else if (event.target.name === "stateMachineArn") {
      this.setState({
        stateMachineArn: event.target.value
      });

      const executionData = {
        param: {
          stateMachineArn: event.target.value
        },
        endpoint: this.state.endpoint
      };
      fetch("/api/list-executions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(executionData)
      })
        .then(res =>
          res.json().then(data => {
            const executions = data.executions;
            this.setState({ executions: executions });
            if (executions.length > 0) {
              this.setState({
                executionArn: executions[0].executionArn
              });
            }
          })
        )
        .catch(err => console.log(err));
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      param: {
        executionArn: this.state.executionArn
      },
      endpoint: this.state.endpoint
    };

    fetch("/api/get-execution-history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res =>
        res.json().then(data => {
          this.setState({ events: data.events });
        })
      )
      .catch(err => console.log(err));
  };

  render() {
    const stateMachines = this.state.stateMachines;
    const executions = this.state.executions;
    const events = this.state.events;
    return (
      <div>
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
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="executionArn">Execution ARN</label>
            <select
              className="form-control"
              name="executionArn"
              id="executionArn"
              onChange={this.handleChange}
              value={this.state.executionArn}
              required
            >
              {executions.map(execution => {
                return (
                  <option value={execution.executionArn}>
                    {execution.executionArn}
                  </option>
                );
              })}
            </select>
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Submit
          </button>
        </form>

        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">Timestamp</th>
              <th scope="col">Type</th>
              <th scope="col">ID</th>
              <th scope="col">Previous ID</th>
              <th scope="col">Event Details</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => {
              const eventDetailKey = Object.keys(event).filter(
                key => key.indexOf("EventDetails") >= 0
              );
              console.log(eventDetailKey);
              return (
                <tr>
                  <td>{event.timestamp}</td>
                  <td>{event.type}</td>
                  <td>{event.id}</td>
                  <td>{event.previousEventId}</td>
                  <td>
                    <pre>
                      {eventDetailKey.length > 0
                        ? JSON.stringify(event[eventDetailKey[0]], null, 4)
                        : null}
                    </pre>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default GetExecutionHistory;
