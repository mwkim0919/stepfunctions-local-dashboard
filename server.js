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

app.post("/api/describe-activity", function(req, res) {
  StepFunctionsAPI.call(APIType.DESCRIBE_ACTIVITY, req, res);
});

app.post("/api/describe-execution", function(req, res) {
  StepFunctionsAPI.call(APIType.DESCRIBE_EXECUTION, req, res);
});

app.post("/api/describe-state-machine", function(req, res) {
  StepFunctionsAPI.call(APIType.DESCRIBE_STATE_MACHINE, req, res);
});

app.post("/api/get-activity-task", function(req, res) {
  StepFunctionsAPI.call(APIType.GET_ACTIVITY_TASK, req, res);
});

app.post("/api/get-execution-history", function(req, res) {
  StepFunctionsAPI.call(APIType.GET_EXECUTION_HISTORY, req, res);
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

app.post("/api/send-task-success", function(req, res) {
  StepFunctionsAPI.call(APIType.SEND_TASK_SUCCESS, req, res);
});

app.post("/api/send-task-failure", function(req, res) {
  StepFunctionsAPI.call(APIType.SEND_TASK_FAILURE, req, res);
});

app.post("/api/send-task-heartbeat", function(req, res) {
  StepFunctionsAPI.call(APIType.SEND_TASK_HEARTBEAT, req, res);
});

app.use(express.static("build"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
