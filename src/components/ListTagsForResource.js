import React, { Component } from "react";

class ListTagsForResource extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:8083",
      resourceArn: "",
      tags: []
    };
  }

  handleChange = event => {
    if (event.target.name === "resourceArn") {
      this.setState({
        resourceArn: event.target.value
      });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      param: {
        resourceArn: this.state.resourceArn
      },
      endpoint: this.state.endpoint
    };

    fetch("/api/list-tags-for-resource", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json().then(data => this.setState({ tags: data.tags })))
      .catch(err => console.log(err));
  };

  render() {
    const tags = this.state.tags;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="resourceArn">Resource ARN</label>
            <input
              type="text"
              className="form-control"
              id="resourceArn"
              name="resourceArn"
              value={this.state.resourceArn}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg btn-block">
            Submit
          </button>
        </form>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">Key</th>
              <th scope="col">Value</th>
            </tr>
          </thead>
          <tbody>
            {tags.map(tag => {
              return (
                <tr>
                  <td>{tag.key}</td>
                  <td>{tag.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListTagsForResource;
