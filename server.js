const express = require("express");
const AWS = require("aws-sdk");
const StepFunctionsAPI = require("./backend/StepFunctionsAPI");
const APIType = require("./util/APIType");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/create-activity", function(req, res) {
  StepFunctionsAPI.call(APIType.CREATE_ACTIVITY, req, res);
});

app.post("/create-state-machine", function(req, res) {
  StepFunctionsAPI.call(APIType.CREATE_STATE_MACHINE, req, res);
});

app.post("/list-activities", function(req, res) {
  StepFunctionsAPI.call(APIType.LIST_ACTIVITIES, req, res);
})

app.use(express.static("build"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
