const express = require("express");
const AWS = require("aws-sdk");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/create-activity", function(req, res) {
  const stepfunctions = new AWS.StepFunctions({
    region: "us-east-1",
    endpoint: req.body.endpoint
  });
  stepfunctions
    .createActivity({ name: req.body.name })
    .promise()
    .then(data => res.send(data))
    .catch(err => console.log(err, err.stack));
});

app.use(express.static("build"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
