const express = require("express");
const path = require('path');
const StepFunctionsAPI = require("./backend/StepFunctionsAPI");
const APIType = require("./util/APIType");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/api/create-activity", function(req, res) {
  StepFunctionsAPI.call(APIType.CREATE_ACTIVITY, req, res);
});

app.post("/api/create-state-machine", function(req, res) {
  StepFunctionsAPI.call(APIType.CREATE_STATE_MACHINE, req, res);
});

app.post("/api/list-activities", function(req, res) {
  StepFunctionsAPI.call(APIType.LIST_ACTIVITIES, req, res);
});

app.post("/api/list-executions", function(req, res) {
  StepFunctionsAPI.call(APIType.LIST_EXECUTIONS, req, res);
});

app.post("/api/list-state-machines", function(req, res) {
  StepFunctionsAPI.call(APIType.LIST_STATE_MACHINES, req, res);
});

app.post("/api/start-execution", function(req, res) {
  StepFunctionsAPI.call(APIType.START_EXECUTION, req, res);
});

app.use(express.static("build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
