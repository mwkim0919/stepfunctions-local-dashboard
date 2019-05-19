import React, { Component } from "react";

class ListStateMachines extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:8083",
      stateMachineArn: "",
      input: "",
      name: "",
      stateMachines: []
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
        res.json().then(data => this.setState({ stateMachines: data.stateMachines }))
      )
      .catch(err => console.log(err));
  }

  render() {
    const stateMachines = this.state.stateMachines;
    return (
      <div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">State Machine ARN</th>
              <th scope="col">Creation Date</th>
            </tr>
          </thead>
          <tbody>
            {stateMachines.map(stateMachine => {
              return (
                <tr>
                  <td>{stateMachine.name}</td>
                  <td>{stateMachine.stateMachineArn}</td>
                  <td>{stateMachine.creationDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListStateMachines;
