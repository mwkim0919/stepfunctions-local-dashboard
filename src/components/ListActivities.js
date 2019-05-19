import React, { Component } from "react";

class ListActivities extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:8083",
      activities: []
    };
  }

  componentDidMount() {
    const data = {
      param: {},
      endpoint: this.state.endpoint
    };

    fetch("/api/list-activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res =>
        res.json().then(data =>
          this.setState({ activities: data.activities })
        )
      )
      .catch(err => console.log(err));
  }

  render() {
    const activities = this.state.activities;
    return (
      <div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Activity ARN</th>
              <th scope="col">Creation Date</th>
            </tr>
          </thead>
          <tbody>
            {activities.map(activity => {
              return (
                <tr>
                  <td>{activity.name}</td>
                  <td>{activity.activityArn}</td>
                  <td>{activity.creationDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListActivities;
