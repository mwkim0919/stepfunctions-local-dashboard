import React from "react";
import "./App.css";
import CreateActivity from "./components/CreateActivity";
import CreateStateMachine from "./components/CreateStateMachine";

function App() {
  return (
    <div className="App">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="createActivity-tab"
            data-toggle="tab"
            href="#createActivity"
            role="tab"
            aria-controls="createActivity"
            aria-selected="true"
          >
            CreateActivity
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="profile-tab"
            data-toggle="tab"
            href="#profile"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            CreateStateMachine
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="contact-tab"
            data-toggle="tab"
            href="#contact"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            StartExecution
          </a>
        </li>
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
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <CreateStateMachine />
        </div>
        <div
          className="tab-pane fade"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          ...
        </div>
      </div>
    </div>
  );
}

export default App;
