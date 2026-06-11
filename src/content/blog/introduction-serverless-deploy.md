---
title: Introduction to Serverless Deploy
author: Allan Gallo
pubDatetime: 2026-05-13T00:00:00Z
postSlug: introduction-serverless-deploy
featured: false
draft: true
tags:
  - aws
  - serverless
  - lambda
ogImage: ""
description: An introduction to serverless deployment on AWS — writing Lambda functions, managing serverless applications, setting up development environments, and testing strategies.
---

# Introduction to Serverless Deploy

## Writing Code

- System architecture
- Design patterns
- Frameworks and libraries

## Managing Code

- Tools (IDEs, SCM, debuggers, etc)
- Developer workflow
- Test/deployment automation
- Environment management

## Writing Lambda Functions

### Lambda Functions and Object Oriented Design

#### Handler

- Function configuration
- Lambda-specific code
- No business logic

#### Controller

- Event Processing
- Core business logic

#### Service

- External integrations
- Service abstractions

### Using libraries and frameworks

It's also important to note that there are number of frameworks and libraries
that you can continue to use that you might be used to using already in your
traditional application and development environments. For instance, if you're
already developing applications using Jersey or Spring Boot, you can use
the AWS Serverless Java Container in order to migrate that code into a serverless
context without having to make significant changes to your application.

Similarly, for Node.js and Python, if you're using frameworks like Express or Django,
the AWS Serverless Express Framework and Zappa, respectively, can allow you to use
those frameworks within a Lambda context as well.

Which of these are recommendations for structuring your Lambda functions? Select all that apply.

- Separate business logic from handler method
- Minimize the dependencies

## Managing Serverless Applications

### Serverless application framework in the development tool chain

This image illustrates the steps in the development tool chain and the type of tool
you use to support those steps. The author (code) and build (compiled app) steps
are associated with an IDE and a build tool. The package (ZIP archive to an Amazon S3 bucket) and
deploy (deploy to AWS Lambda) steps are supported by an application framework.

Which of these are recommendations for managing serverless applications? Select all that apply.

- Use serverless application framework
- Use SAM template to deploy your serverless application rather than
  creating a template in AWS CloudFormation

### Organizing your Code Repository

Focus on services
Every code is unique, but you will probably have multiple lambda functions as well
other AWS resources per service. Give each service its own template,
and use one repository per service and template.

Which of these are recommendations for organizing your code
repository for serverless applications? Select all that apply.

- Organize your functions into services, and give each service one deployment
  template and one code repository

user-service/
├── handlers/
│ └── create_user_handler.py
│
├── application/
│ └── use_cases/
│ └── create_user.py
│
├── infrastructure/
│ ├── repositories/
│ │ └── dynamodb_user_repository.py
│ │
│ └── messaging/
│ └── sns_publisher.py

#### Handler

```python
def handler(event, context):
    body = json.loads(event["body"])

    use_case = CreateUserUseCase(
        repository=DynamoUserRepository(),
        publisher=SnsPublisher()
    )

    result = use_case.execute(body)

    return response(201, result)
```

### Use Case

```python
class CreateUserUseCase:
    def __init__(self, repository, publisher):
        self.repository = repository
        self.publisher = publisher

    def execute(self, data):
        user = User.create(data)

        self.repository.save(user)

        self.publisher.user_created(user)

        return user.to_dict()
```

### AWS Client

```python
import boto3

class SnsPublisher:
    def __init__(self):
        self.client = boto3.client("sns")

    def user_created(self, user):
        self.client.publish(
            TopicArn="topic-arn",
            Message=json.dumps(user.to_dict())
        )
```

- Other example

tracking-service/
├── handlers/
│ └── create_tracking_handler.py
│
├── domain/
│ └── entities/
│
├── application/
│ └── use_cases/
│
├── infrastructure/
│ ├── repositories/
│ ├── aws/
│ │ ├── dynamodb.py
│ │ ├── sqs.py
│ │ └── s3.py
│ │
│ └── external_services/
│ └── sap_client.py

- Do not do this for small lambdas
  send-email/
  domain/
  application/
  infrastructure/
  shared/
  adapters/

  ### Setting up your Development Environment

![Development environment options](/assets/serverless-dev-env-options.png)

This image illustrates two ways to approach your environments.
Option one shows each developer connected to a separate AWS account.
Option two illustrates a single shared development account that all developers use to deploy multiple stacks.

Which of these are recommendations for structuring your development environment for serverless?

- Create separate AWS accounts for each developer if you have management
  processes in place to handle it
- Separate your production and non-production environments into different
  accounts

NOTE: It is a good idea to give each developer their own AWS sandbox account
if you have the infrastructure to manage those. Alternatively you could give all
developers access to a single sandbox account, but use a serverless framework to
simplify management of stacks and versions.

With serverless it is actually a good idea to allow developers to experiment
by spinning up a new stack, because there is little or no cost to that stack
when it's not in use, but you do want to keep production and non-production accounts separate.

## Testing and Debugging Serverless Applications

### Suggested Test Hierarchy for Serverless Applications

![Test hierarchy for serverless applications](/assets/test-herarchy-for-serverless-app.png)

This image highlights three parts to a suggested test hierarchy:

1. local testing
2. remote integration testing using an application stack in an AWS sandbox account
3. automated integration tests across multiple branches of an application that have been deployed via a CI/CD pipeline.

Which of these is an appropriate reason to use custom mocks?

- You are trying to test an application that relies on multiple services
  interacting with each other

> [!WARNING]
> NOTE: Custom mocks are generally more expensive to implement,
> but may be valuable if you meed to do testing that involves multiple services
> and Lambda functions connecting them.

### Debugging Serverless Applications

Which of these is an option for debugging your serverless applications?

- Use your IDE debugger on the Docker container provided by SAM CLI

You cannot connect remotely to Lambda via an open port,
but you can install SAM CLI and use your IDE debugger on the docker container that it provides.

Continue reading [Getting into Serverless Mindset](/blog/serverless-mindset) — an introduction to event-oriented architecture and serverless design patterns.

# AWS Lambda Foundations

Read [AWS Lambda Foundations](/src/content/blog/aws_lambda_foundations) — a practical course on writing, configuring, deploying, and troubleshooting Lambda functions.

### Amazon API Gateway for Serverless Applications

Read [Amazon API Gateway for Serverless Applications](/src/content/blog/amazon_api_gateway_for_serverless_applications.md)
