import React from "react";
import "./App.css";
import CreateActivity from "./components/CreateActivity";
import CreateStateMachine from "./components/CreateStateMachine";
import ListActivities from "./components/ListActivities";

const APIs = [
  "createActivity",
  "createStateMachine",
  "deleteActivity",
  "deleteStateMachine",
  "describeActivity",
  "describeExecution",
  "describeStateMachine",
  "getActivityTask",
  "getExecutionHistory",
  "listActivities",
  "listExecutions",
  "listStateMachines",
  "listTagsForResource",
  "sendTaskFailure",
  "sendTaskHeartbeat",
  "sendTaskSuccess",
  "startExecution",
  "stopExecution",
  "tagResource",
  "untagResource",
  "updateState"
];

function App() {
  return (
    <div className="App">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        {APIs.map((api, index) => {
          return (
            <li className="nav-item">
              <a
                className={index === 0 ? "nav-link active" : "nav-link"}
                id={api + "-tab"}
                data-toggle="tab"
                href={"#" + api}
                role="tab"
                aria-controls={api}
                aria-selected="true"
              >
                {api}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="createActivity"
          role="tabpanel"
          aria-labelledby="createActivity-tab"
        >
          <CreateActivity />
        </div>
        <div
          className="tab-pane fade"
          id="createStateMachine"
          role="tabpanel"
          aria-labelledby="createStateMachine-tab"
        >
          <CreateStateMachine />
        </div>
        <div
          className="tab-pane fade"
          id="listActivities"
          role="tabpanel"
          aria-labelledby="listActivities-tab"
        >
          <ListActivities />
        </div>
      </div>
    </div>
  );
}

export default App;
