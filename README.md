## AWS STEP FUNCTION LOCAL RUNNER CONSOLE

### Prerequisites
* AWS Step Function Local Runner
  * [Get Step Function Local Runner jar file](https://docs.aws.amazon.com/step-functions/latest/dg/sfn-local.html)
  * [Get Step Function Local Runner docker image](https://hub.docker.com/r/amazon/aws-stepfunctions-local)
* AWS CLI
  * If you want to use your AWS account for this, you will have to configure AWS CLI with your account in your local machine.<br>
  * Run `aws configure` to set your AWS account in your local machine.
* NodeJS
* Yarn

### How to use this
* Clone this repository
  * `git clone https://github.com/mwkim0919/stepfunctions-local-dashboard.git`
* Go to this repository directory and run
  * `yarn` 
  * `yarn build-run`
* Run AWS Step Function Local Runner
* Open a browser and go to http://localhost:3000