import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateActivity from "./components/CreateActivity";
import CreateStateMachine from "./components/CreateStateMachine";
import ListActivities from "./components/ListActivities";
import ListExecutions from "./components/ListExecutions";
import ListStateMachines from "./components/ListStateMachines";
import StartExecution from "./components/StartExecution";

const APIs = [
  "createActivity",
  "createStateMachine",
  // "deleteActivity",
  // "deleteStateMachine",
  // "describeActivity",
  // "describeExecution",
  // "describeStateMachine",
  // "getActivityTask",
  // "getExecutionHistory",
  "listActivities",
  "listExecutions",
  "listStateMachines",
  // "listTagsForResource",
  // "sendTaskFailure",
  // "sendTaskHeartbeat",
  // "sendTaskSuccess",
  "startExecution"
  // "stopExecution",
  // "tagResource",
  // "untagResource",
  // "updateState"
];

function App() {
  return (
    <div className="App">
      <Router>
        <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              {APIs.map(api => {
                return (
                  <Link
                    className="nav-link active"
                    to={"/" + api}
                  >
                    {api}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        <Route path="/createActivity" component={CreateActivity} />
        <Route path="/createStateMachine" component={CreateStateMachine} />
        <Route path="/listActivities" component={ListActivities} />
        <Route path="/listExecutions" component={ListExecutions} />
        <Route path="/listStateMachines" component={ListStateMachines} />
        <Route path="/startExecution" component={StartExecution} />
      </Router>
    </div>
  );
}

export default App;
