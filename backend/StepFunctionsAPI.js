const AWS = require("aws-sdk");

function call(type, req, res) {
    const stepfunctions = new AWS.StepFunctions({
        region: "us-east-1",
        endpoint: req.body.endpoint
      });
      stepfunctions[type](req.body.param)
        .promise()
        .then(data => res.send(data))
        .catch(err => res.status(err.statusCode).send(err));
}

module.exports = {
  call
}