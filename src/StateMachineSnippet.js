const SNIPPETS = {
  Basic: {
    StartAt: "HelloWorld",
    States: {
      HelloWorld: {
        Type: "Pass",
        Result: "Hello World!",
        End: true
      }
    }
  },

  SNS_Publish_Message: {
    StartAt: "Send message to SNS",
    States: {
      "Send message to SNS": {
        Type: "Task",
        Resource: "arn:aws:states:::sns:publish",
        Parameters: {
          TopicArn: "arn:aws:sns:us-east-1:ACCOUNT_ID:myTopic",
          Message: {
            Input: "Hello from Step Functions!"
          }
        },
        End: true
      }
    }
  },

  SNS_Publish_Message_Callback: {
    StartAt: "Send message to SNS",
    States: {
      "Send message to SNS": {
        Type: "Task",
        Resource: "arn:aws:states:::sns:publish.waitForTaskToken",
        Parameters: {
          TopicArn: "arn:aws:sns:us-east-1:ACCOUNT_ID:myTopic",
          Message: {
            Input: "Hello from Step Functions!",
            "TaskToken.$": "$$.Task.Token"
          }
        },
        End: true
      }
    }
  },

  Lambda_Invoke: {
    StartAt: "Invoke Lambda function",
    States: {
      "Invoke Lambda function": {
        Type: "Task",
        Resource: "arn:aws:states:::lambda:invoke",
        Parameters: {
          FunctionName:
            "arn:aws:lambda:REGION:ACCOUNT_ID:function:FUNCTION_NAME",
          Payload: {
            "Input.$": "$"
          }
        },
        End: true
      }
    }
  },

  Lambda_Invoke_Callback: {
    StartAt: "Invoke Lambda function",
    States: {
      "Invoke Lambda function": {
        Type: "Task",
        Resource: "arn:aws:states:::lambda:invoke.waitForTaskToken",
        Parameters: {
          FunctionName:
            "arn:aws:lambda:REGION:ACCOUNT_ID:function:FUNCTION_NAME",
          Payload: {
            "Input.$": "$",
            "TaskToken.$": "$$.Task.Token"
          }
        },
        End: true
      }
    }
  },

  SQS_Send_Message: {
    StartAt: "Send message to SQS",
    States: {
      "Send message to SQS": {
        Type: "Task",
        Resource: "arn:aws:states:::sqs:sendMessage",
        Parameters: {
          QueueUrl: "https://sqs.REGION.amazonaws.com/ACCOUNT_ID/myQueue",
          MessageBody: {
            Input: "Hello from Step Functions!"
          }
        },
        End: true
      }
    }
  },

  SQS_Send_Message_Callback: {
    StartAt: "Send message to SQS",
    States: {
      "Send message to SQS": {
        Type: "Task",
        Resource: "arn:aws:states:::sqs:sendMessage.waitForTaskToken",
        Parameters: {
          QueueUrl: "https://sqs.REGION.amazonaws.com/ACCOUNT_ID/myQueue",
          MessageBody: {
            Input: "Hello from Step Functions!",
            "TaskToken.$": "$$.Task.Token"
          }
        },
        End: true
      }
    }
  },

  ECS_Run_Task_Sync: {
    StartAt: "Manage ECS task",
    States: {
      "Manage ECS task": {
        Type: "Task",
        Resource: "arn:aws:states:::ecs:runTask.sync",
        Parameters: {
          LaunchType: "FARGATE",
          Cluster: "arn:aws:ecs:REGION:ACCOUNT_ID:cluster/MyECSCluster",
          TaskDefinition:
            "arn:aws:ecs:REGION:ACCOUNT_ID:task-definition/MyTaskDefinition:1"
        },
        End: true
      }
    }
  },

  ECS_Run_Task_Callback: {
    StartAt: "Manage ECS task",
    States: {
      "Manage ECS task": {
        Type: "Task",
        Resource: "arn:aws:states:::ecs:runTask.waitForTaskToken",
        Parameters: {
          LaunchType: "FARGATE",
          Cluster: "arn:aws:ecs:REGION:ACCOUNT_ID:cluster/MyECSCluster",
          TaskDefinition:
            "arn:aws:ecs:REGION:ACCOUNT_ID:task-definition/MyTaskDefinition:1",
          Overrides: {
            ContainerOverrides: [
              {
                Name: "CLUSTER_NAME",
                Environment: [
                  {
                    Name: "TASK_TOKEN_ENV_VARIABLE",
                    "Value.$": "$$.Task.Token"
                  }
                ]
              }
            ]
          }
        },
        End: true
      }
    }
  }
};

module.exports = SNIPPETS;