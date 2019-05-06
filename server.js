const express = require("express");
const AWS = require("aws-sdk");
const app = express();
const port = 3000;

app.post("/create-activity", function(req, res) {
  console.log(req.body);
  const stepfunctions = new AWS.StepFunctions({
    region: "us-east-1",
    // endpoint: req.body.endpoint
    endpoint: "http://localhost:8083"
  });
  const createActivity = () => {
    return stepfunctions
      // .createActivity({ name: req.body.name })
      .createActivity({ name: "test" })
      .promise()
      // .then(data => console.log(JSON.stringify(data, null, 2)))
      .then(data => res.send(data))
      .catch(err => console.log(err, err.stack));
  };
  createActivity();
  res.send("success");
});

app.use(express.static("build"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
