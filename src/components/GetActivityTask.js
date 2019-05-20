import React, { Component } from "react";
import uuidv1 from "uuid/v1";

class GetActivityTask extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:8083",
      activityArn: "",
      activities: [],
      workerName: "",
      response: "",
      statusCode: ""
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
    } else if (event.target.name === "workerName") {
      this.setState({
        workerName: event.target.value
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      param: {
        activityArn: this.state.activityArn,
        workerName: this.state.workerName
      },
      endpoint: this.state.endpoint
    };
    fetch("/api/get-activity-task", {
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
    const activities = this.state.activities;
    const response = this.state.response;
    const statusCode = this.state.statusCode;
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

export default GetActivityTask;
