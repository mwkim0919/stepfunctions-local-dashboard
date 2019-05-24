import React, { Component } from "react";

class DescribeActivity extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:8083",
      activities: [],
      activity: {},
      activityArn: ""
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
        res.json().then(data => {
          const activities = data.activities;
          this.setState({ activities: activities });
          if (activities.length > 0) {
            this.setState({
              activityArn: activities[0].activityArn
            });
          }
        })
      )
      .catch(err => console.log(err));
  }

  handleChange = event => {
    if (event.target.name === "activityArn") {
      this.setState({
        activityArn: event.target.value
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      param: {
        activityArn: this.state.activityArn
      },
      endpoint: this.state.endpoint
    };

    fetch("/api/describe-activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res =>
        res.json().then(data => this.setState({ activity: data }))
      )
      .catch(err => console.log(err));
  };

  render() {
    const activities = this.state.activities;
    const activity = this.state.activity;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="activityArn">Activity ARN</label>
            <select
              className="form-control"
              name="activityArn"
              id="activityArn"
              onChange={this.handleChange}
              value={this.state.activityArn}
              required
            >
              {activities.map(activity => {
                return (
                  <option value={activity.activityArn}>
                    {activity.activityArn}
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
              <th scope="col">Name</th>
              <th scope="col">Activity ARN</th>
              <th scope="col">Creation Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>{activity.name}</td>
                <td>{activity.activityArn}</td>
                <td>{activity.creationDate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default DescribeActivity;
