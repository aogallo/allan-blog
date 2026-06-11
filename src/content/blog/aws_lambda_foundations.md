# AWS Lambda foundations

## Introduction

AWS Lambda is an event-driven, serverless compute service that lets you run
code without provisioning or managing servers. This course focuses on what you
need to start building Lambda functions and serverless applications. You will
learn how AWS Lambda works and how to write and configure Lambda functions.
You will explore deployment and testing considerations and end with a discussion
on monitoring and troubleshooting lambda functions.

You should be able to do the following:

- Define Lambda and describe how it works
- Describe the benefits of using lambda and identify use cases
- Examine lambda function permission and security
- Demonstrate best practices for writing lambda functions
- Deploy and test your serverless applications
- Explore Lambda configuration considerations
- Monitor and troubleshoot Lambda functions

## Introduction to Serverless

One of the major benefits of cloud computing is its ability to abstract (hide) the
infrastructure layer. This ability eliminates the need to manually manage the underlying
physical hardware. In a serverless environment, this abstraction allows you to focus on
the code for your applications without spending time building and maintaining the
underlying infrastructure. With serverless applications, there are never instances,
operating systems, or servers to manage. AWS handles everything required to run and
scale your application. By building serverless applications, your developers can focus
on the code that makes your business unique

## AWS serverless platform

Includes a number of fully managed services that are tightly
integrated with AWS Lambda and well-suited for serverless applications. Developer tools,
including the AWS Serverless Application Model (AWS SAM), help simplify deployment of
your lambda functions and serverless applications

| Service category       | Services                                                                |
| ---------------------- | ----------------------------------------------------------------------- |
| Compute                | AWS Lambda, Lambda@Edge                                                 |
| Orchestration          | AWS Step Functions                                                      |
| Storage                | Amazon S3                                                               |
| Data stores            | Amazon DynamoDB                                                         |
| Event bus              | Amanzon EventBridge                                                     |
| Interprocess messaging | Amazon SNS, Amazon SQS                                                  |
| API Integration        | Amazon API Gateway, AWS Appsync                                         |
| Developer tools        | AWS Cloud Development kit (CDK), AWS Serverless Application Model (SAM) |

What is AWS Lambda?

AWS Lambda is a compute service. You can use it to run code without provisioning or
managing servers. Lambda runs your code on a high-availability compute infrastructure.
It operates and maintains all of the compute resources, including server and operating
system maintenance, capacity provisioning and automatic scaling, code monitoring, and
logging. With Lambda, you can run code for almost any type of application or backend
service.

Some benefits of using Lambda include the following:

- You can run code without provisioning or maintaining servers
- It initiates functions for you in response to events
- It scales automatically
- It provides built-in code monitoring and logging via Amazon CloudWatch

AWS Lambda features

### Bring your own code

You can write the code for lambda using languages you already know and are comfortable
using. Development in Lambda is not tightly coupled to AWS, so you can easily port
code in and out of AWS.

### Integrates with and extends other AWS service

Within your Lambda function, you can do anything traditional applications can do,
including calling an AWS SDK or invoking a third-party API, whether on AWS, in
your data center, or on the internet

### Flexible resource and concurrency model

Instead of scaling by adding servers, Lambda scales in response to events. You
configure memory settings and AWS handles details such as CPU, network,
and I/O throughput

### Flexible permissions model

The lambda permissions model uses AWS Identity & Access Management AWS
Identity & Access Management (IAM) to securely grant access to the desired
resources and provide fine-grained control to invoke your functions

### Availability and fault tolerance are built in

Because lambda is a fully managed service, high availability and fault
tolerance are built into the service without needing you to perform any
additional configuration

### Pay for value

Lambda functions only run when you initiate them. You pay only for the compute
time that you consume. When the code is invoked, you are billed in 1-millisecond
increments.

## Event-driven architectures

An event-driven architecture uses events to initiate actions and communication
between decoupled services. An event is a change in state, a user request,
or an update, like an item being placed in a shopping cart in a e-commerce website.
When an event occurs, the information is published for other services to consume it.
In event-driven architectures, events are the primary mechanism for sharing information
across services. These events are observable, such as a new message in a log file,
rather than directed, such as a command to specifically do something.

## Producers, routers, consumers

AWS Lambda is an example of an event-driven architecture. Most AWS services
generate events and act as an event source for lambda. Lambda runs custom code
(functions) in response to events. Lambda functions are designed to process
these events and, once invoked, may initiate other actions or subsequent events

![Producer routes consumers](/assets/producer-routes-cosumers.png)

### 1 Events and event producers

An event is a change in state of whatever you are monitoring, for example an updated
shopping cart, an entry in a log file, or a new file uploaded to Amazon Simple Storage (S3).

Events contain all of the information required for a consumer to take action on
the event. Producers create events. Producers are only aware of the event router.
Examples of event producers and events include customers submitting a question
on a mobile app (a question event) customers placing a new order through a retail
website (an order event), and customers returning an item in a store at a
point-of-sale terminal (an inventory event).

### 2 Events

An event is a change in state of whatever you are monitoring, for example an
updated shopping cart, an entry in a log file, or a new file uploaded to Amazon
Simple Storage Service (Amazon S3). Examples shown in the diagram include
a question event (from the mobile app) an order event (from the retail website)
and a inventory event (from the customer return).

### 3 Event router

The router ingests, filters, and pushes events to the appropriate consumers. It
uses a set of rules or another service such as Amazon Simple Notification Service
(Amazon SNS) to send the messages. Amazon EventBridge is shown as the Event
router in this diagram

### 4 Event consumers

Consumers either subscribe to receive notification about events or they monitor
an even stream and only act on events that pertain to them. Specific example are
identified in items 7, 8, and 9

### 5 Amazon EventBridge

EventBridge can ingest and filter events using rules to forward them only to the
consumers who need to know

### 6 Events sent

The events are sent only to the consumers who subscribed to them. For example, the
warehouse would subscribe to Order, Inventory, and Question events. The warehouse needs to
see complete orders and returns, and needs to answer customer questions about
whether an item is out of stock

The financial system would subscribe to Order and Inventory events so they could
charge and refund credits. It does not need to answer customer questions, so
it would not subscribe to Question events

### 7 Warehouse Management Database

The Question, Order, and Return events prompts the warehouse to update inventory
and item availability

### 8 Financial system

The Order and Inventory events prompt the finance system to update based
on the sale and return of the items

### 9 Customer Service

Customer service would subscribe to Order and Question events so the customer
service team can respond. They wouldn't subscribe to the Inventory events because
inventory is not a function of their job

## What is a lambda function?

The code you run on AWS Lambda is called a _Lambda function_. Think of a function as
a small, self-contained application. After you create your Lambda function,
it is ready to run as soon as it is initiated. Each function includes your code as
well as some associated configuration information, including the function name
and resource requirements.

Lambda functions are stateless, with no affinity to the underlying infrastructure.
Lambda can rapidly launch as many copies of the function as needed to scale to
rate of incoming events.

After you upload your code to AWS Lambda, you can configure an event source,
such as an Amazon Simple Storage Service (Amazon S3) event, Amazon DyanmoDB stream,
Amazon Kinesis stream, or Amazon Simple Notification Service (Amazon SNS)
notification. When the resource changes and event is initiated, Lambda will run
your function and manage the compute resources as needed to keep up with incoming
requests.

![AWS Lambda function A](/assets/aws-lambda-function-a.png)

### 1. Access permissions

Define what services Lambda is permitted to interact with

### 2. Triggering events

Specify which events or event sources can initiate the function

### 3. Code

Provide the code and any dependencies or libraries necessary to run your code

### 4. Configuration

Define the execution parameters, such as memory, timeout, and concurrency

## The following are features of Lambda

- You can run code without provisioning or managing servers.
- It initiates functions on your behalf in response to events.
- It scales automatically.
- It provides built-in monitoring and logging.

With AWS Lambda, you can run code without provisioning or managing servers.
Lambda initiates events on your behalf, scales automatically, and provides built-in
monitoring and logging. You can write code in your preferred language. You do configure
the memory for your function, but not CPU. You don't work with the OS. AWS provides
the operating environment at runtime.

## How AWS Lambda Works

Invocation models for running Lambda functions

Event sources can invoke a Lambda function in three general patterns. These patterns
are called invocation models. Each invocation model is unique and addresses a
different application and developer needs. The Invocation model you use for your
Lambda function often depends on the event source you are using. It's important
to understand how each invocation model initializes functions and handles errors
and retries

### Synchronous invocation

When you invoke a function synchronously, Lambda runs the function and waits for a
response. When the function completes, Lambda returns the response from the
function's code with additional data, such as the version of the function that was
invoked. Synchronous events expect an immediate response from the function
invocation

With this model, there are no built-in retries. You must manage your retry strategy
within your application code. Lambda sends event directly to the function and
sends the function response directly back to the invoker.

### Synchronous AWS service

The following AWS services invoke Lambda synchronously:

- Amazon API Gateway
- Amazon Cognito
- AWS CloudFormation
- Amazon Alexa
- Amazon Lex
- Amazon CloudFront

## Asynchronous invocation

When you invoke a function asynchronously, events are queued and the requester
doesn't wait for the function to complete. This model is appropriate when the client
doesn't need and immediate response.

With the asynchronous model, you can make use of destinations. Use destinations to
send records of asynchronous invocations to other services. (Select the destinations
tab for more information.)

### Asynch AWS service integration

The following AWS services invoke Lambda asynchronously:

- Amazon SNS
- Amazon S3
- Amazon EventBridge

### Destinations

A destination can send records of asynchronous invocations to other services. You can
configure separate destinations for events that fail processing and for events that
process successfully. You can configure destinations on a function, a version, or an
alias, similarly to how you can configure error handling settings. With destinations,
you can address errors and successes without needing to write more code

## Polling invocation

This invocation model is designed to integrate with AWS streaming and queuing
based services with no coder or server management. Lambda will poll (or watch) these
services, retrieve any matching events, and invoke your functions. This invocation
model supports the following services:

- Amazon Kinesis
- Amazon SQS
- Amazon DynamoDB Streams

With this Type of integration, AWS will manage the poller on your behalf and perform
synchronous invocation of your function.

With this model, the retry behavior varies depending on the event source and its configuration

## Event Source Mapping

The configuration of services as event triggers is known as event source mapping.
This process occurs when you configure event sources to launch your Lambda functions
and the grant theses sources IAM permissions to access the Lambda function

Lambda read events from the following services:

- Amazon DynamoDB
- Amazon Kinesis
- Amazon MQ
- Amazon Managed Streaming for Apache Kafka (MSK)
- self-managed Apache Kafka
- Amazon SQS

# Invocation model error behavior

When deciding how to build your functions, consider how each invocation method
handles errors. The following chart provides a quick outline of the error
handling behavior of each invocation model

| Invocation model | Error behavior           |
| ---------------- | ------------------------ |
| Synchronous      | No retires               |
| Asynchronous     | Built in-retries twice   |
| Polling          | Dependes on event source |

## Amazon invocation models are correct

- Amazon S3 triggers Lambda via an asynchronous push
- Amazon API Gateway triggers Lambda synchronously
- Amazon SQS triggers Lambda via the polling invocation model

# Lambda execution environment

Lambda invokes your function in an execution environment, which is a secure and
isolated environment. The execution environment manages the resources required to
run your function. The execution extension associated with your function

![Execution environment lifecycle](/assets/execution-environment-lifecycle.png)

When you create your Lambda function, you specify configuration information, such as
the amount of available memory and the maximum invocation time allowed for your
function. Lambda uses this information to set up the execution environment

The function's runtime and each external extension are processes that run within
the execution environment. Permissions, resources, credentials, and environment variables
are shared between the function and the extensions

### Init phase

![Init phase](/assets/init-phase.png)

In this phase, Lambda creates or unfreezes an execution environment with the
configured resources, downloads the code for the function and all layers,
initializes any extensions, initializes the runtime, and then runs the function's
initialization code (the code outside the main handler)

The init phase happens either during the first invocation, or before function
invocations if you have enabled provisioned concurrency

The init phase is split into three sub-phases

1. Extension init - starts all extensions
2. Runtime init - bootstraps the runtime
3. Function init - runs the function's static code

These sub-phases ensure that all extensions and the runtime complete their setup
tasks before the function code runs

### Invoke phase

![Invoke phase](/assets/invoke-phase.png)

In this phase, Lambda invokes the function handler after the init phase has
completed and the environment is ready to process events. The runtime runs the
function handler code with the event payload. After the handler completes, the
runtime prepares to handle the next invocation.

### Shutdown phase

![Shutdown phase](/assets/shutdown-phase.png)

If no invocations occur for a period of time, the execution environment is
frozen and eventually shut down by the Lambda service. The shutdown phase
alerts external extensions and the runtime to wrap up and terminate gracefully.
After shutdown completes, the environment is removed and any resources are
cleaned up.

# AWS Lambda execution environment

![Understanding the Lambda execution environment life cycle](https://docs.aws.amazon.com/lambda/latest/dg/lambda-runtime-environment.html)

## Performance optimization

Serverless applications can be extremely performant, thanks to the ease of parallelization
and concurrency. While the Lambda service manages scaling automatically, you can
optimize the individual Lambda functions used in your application to reduce latency
and increase throughput

## Cold and warm starts

![Cold and warm start](/assets/cold-and-warm-start.png)

### 1 Start container and download code

When a function is invoked, AWS starts the runtime environment and downloads
your code to that environment

### 2 initialize the runtime

Lambda initializes the environment for the selected runtime

### 3 Initialize packages and dependencies

Lambda initializes your packages and dependencies

### 4 Invoke code

The function code runs in the prepared environment

### 5 Cold start

When an invocation is routed to a new execution environment, Lambda must
initialize the environment, download the code, initialize the runtime, and
initialize any packages or dependencies required by your function. This is the
"cold start" latency

### 6 Warm start

When an invocation gets routed to an environment that is already for the function,
it gets a _warm start_ and Lambda only needs to run the code

### 7 AWS optimization

AWS is responsible for optimizing the time it takes to start up
the environment and initialize the runtime

### 8 Your optimization

You are responsible for optimizing the speed with which the packages and
dependencies required for the function are initialized

### 9 Billing begins

Billing starts after the runtime has been initialized

## Best practice: Minimize cold start time

When you invoke a Lambda function, the invocation is routed to an execution
environment to process the request. If the environment is not already initialized,
the start-up time of the environment adds to latency. If a function has not
been used for some time, if more concurrent invocations are required, or if you
update a function, new environment are created. Creation of these environment
can introduce latency for the invocations that are routed to a new environment.
This latency is implied when using the term cold start. For most applications,
this additional latency is not a problem. However, for some synchronous models,
this latency can inhibit optimal performance. It is critical to understand
latency requirements and try to optimize your function for peak performance

After optimizing your function, another way to minimize cold starts is to
use provisioned concurrency

## Provisioned concurrency

Provisioned concurrency is a Lambda feature that prepares concurrent execution
environments before invocations. If you need predictable function start times for your
workload, provisioned concurrency ensures the lowest possible latency. This feature
keeps your functions initialized and warm, and ready to response in double-digit
milliseconds at the scale you provision. Unlike with on-demand Lambda, this means
that all setup activities happen before invocation, including running the
initialization code.

## Best practice: Write functions to take advantage of warm starts

1. Store and reference dependencies locally
2. Limit re-initialization of variables
3. Add code to check for and reuse existing connections
4. Use tmp space as transient cache
5. Check that background processes have completed

## Lambda lifecycle steps

![Lambda lifecycle steps](/assets/lambda-lifecycle-steps.png)

# AWS Lambda function permissions

## Two types of IAM policies used with Lambda functions

With Lambda functions, there are two sides that define the necessary scope of
permissions - permission to invoke the function, and permission of the Lambda
function itself to act upon other services. Because Lambda is fully integrated
with AWS identify and Access Management (IAM), you can control the exact actions
of each side of the Lambda function

Permissions to invoke the function are controlled using an IAM resource-based
policy. An IAM execution role defines the permissions that control what the function
is allowed to do when interacting with other AWS services. Look at the full interaction
of these two permission types and then explore each one in further detail

![IAM resource policy role](/assets/iam-resource-policy-role.png)

### Execution role

The execution role gives your function permissions to interact with other services.
You provide this role when you create a function is invoked. The policy for this
role defines the actions the role is allowed to take - for example, writing to a
DynamoDB table. The role must include a trust policy that allows lambda to
'AssumeRole' so that it can take that action for another service. You can write
the role or use the managed roles (with predefined permissions) provided by
Lambda to simplify the process of creating an execution role. You can add or
remove permissions from a function's role at any time, or configure your
function to use a different role

You can also use IAM Access Analyzer to help identify the required permissions for
the IAM execution role. IAM Access Analyzer reviews your AWS CloudTrail Logs over
the date range that your specify and generates a policy template with only the permissions
that the function used during that time

### Example: Execution role definitions

#### IAM policy

![IAM policy](/assets/iam-policy.png)

This IAM policy allows the function to perform the 'Action': 'dynamodb:PutItem' action
againt a DynamoDB table called 'test' in the us-west-2 region

#### Trust policy

![Trust policy](/assets/trust-policy.png)

A trust policy defines what actions your role can assume. The trust policy allows
Lambda to use the role's by giving the service principal lambda.amazon.com permission
to call the AWS Security Token Service (AWS STS) AssumeRole action

## Resource-based policy

Resource policies make it easy to grant access to the Lambda function across separate
AWS accounts. For example, if you need an S3 bucket in the production account to
invoke your Lambda function in the Prod-2 account, you can create a new IAM role
in Prod-2 and allow production to assume that role. Alternatively, you can include
a resource-based policy that allows production to invoke the function in Prod-2

## Policy comparison

| Resource-based policy                                            | Execution role                                           |
| ---------------------------------------------------------------- | -------------------------------------------------------- |
| Lambda resource-based (function) policy                          | Role select or created when you create a Lambda function |
| Associated with a 'push' event source such as Amazon API Gateway | IAM policy includes actions you can take with resource   |
| Created when you add a trigger to a Lambda function              | Trust policy that allows Lambda to AssumeRole            |
| Allows the event source to take the lambda:InvokeFunction action | Creator mush have permission for iam:PassRole            |

## Distinct permissions for distinct purposes

![Distinct permissions](/assets/distinct-permissions.png)

![Resource policy comparison](/assets/resource-policy-comparison.png)

![Resource policy execution role](/assets/resource-policy-execution-role.png)

## Example resource policy

- The policy has an Effect of 'Allow'. The effect can be Deny or Allow
- The principal is the Amazon S3 's3.amazonaws.com' service. This policy is allowing the Amazon S3 service to perform an Action
- The Action that S3 is allowed to perform is the ability to invoke a Lambda function 'lambda:InvokeFunction' called 'my-s3-function'

```json
{
  "Version": "2012-10-17",
  "Effect": "Allow",
  "Principal": {
    "Service": "s3.amazonaws.com"
  },
  "Action": "lambda:InvokeFunction",
  "Resource": "arn:aws:lambda:us-west-2:xxx:function:my-s3-function",
  "Condition": {
    "StringEquals": {
      "AWS:SourceAccount": "xxxx"
    },
    "ArnLike": {
      "AWS:SourceArn": "arn:aws:s3:::lambda-lambda-2"
    }
  }
}
```

## Accessing resource in a VPC

Enabling your Lambda function to access resources inside your virtual private cloud
(VPC) requires additional VPC-specific configuration information, such as **VPC
subnet IDs and security IDs**. This functionality allows Lambda to access
resources in the VPC. It does not change how the function is secured. You also need
an execution role with permission to create, describe, and delete elastic network
interfaces. Lambda provides a permissions policy for this purpose named
'AWSLambdaVPCAccessExecutionRole'

## Lambda and AWS PrivateLink

To establish a private connection between your VPC and Lambda, create an interface
VPC endpoint. Interface endpoints are powered by AWS PrivateLink, which enables
you to privately access Lambda APIs without an internet gateway, NAT device,
VPN connection, or AWS Direct Connect connection

## Questions

1. What IAM entities must be included in an execution role for a Lambda function
   to interact with other services, such as DynamoDB

- IAM policy that defines the actions that can be taken within DynamoDB
- Trust policy that grans 'AssumeRole' permission to Lambda to act on DynamoDB

1. Which of these statements describe a resource policy

- Can give Amazon S3 permission to initiate a Lambda function
- Can grant access to the Lambda function across AWS accounts
- Determines who has access to invoke the function

# Authoring AWS Lambda Functions

## Start with the handler method

The Lambda function handler is the method in your function code that processes events.
When your function is invoked, Lambda runs the handler method. When the handler
exits or returns a response, it becomes available to handle another event.
The handler method takes two objects – the event object and the context object.

### Event object (Required)

- Event object is required
- When your lambda function is invoked in one of the supported languages, one of the parameters provided to your handler function is an **event object**.
- The event object differs in structure and contents, depending on which event source created it
- The contents of the event parameter include all of the data and metadata your lambda function needs to drive its logic.

> For example, an event created by Amazon API Gateway will contain details related to the HTTPS
> request that was made by the API client (for example, path, query string, request body).
> An event created by Amazon S3 when a new object is created will include details about the bucket and the new object.

### Context Object (Optional)

- The context object allows your function code to interact with the Lambda execution environment
- The contents and structure of the context object vary, based on the language runtime your
  Lambda function is using. At minimum it contains the elements:

> AWS RequestID – Used to track specific invocations.
> Runtime – The amount of time in milliseconds remaining before a function timeout.
> Logging – Information about which Amazon CloudWatch Logs stream your log statements will be sent.

## Design best practices

When designing and writing Lambda functions, regardless of the runtime you’re using,
it is best practice to separate the business logic (the part of the code the
defines the real-world business need) from the handler method. This makes your code
more portable and you can target unit-tests at the code without worrying about
the configuration of the function.

It is also a best practice to make your functions modular. For example,
instead of having one function that does compression, thumb-nailing, and indexing,
consider having three different functions that each serve a single purpose.

Because your functions only exist when there is work to be done, it is particularly important
for serverless applications to treat each function as stateless. That is,
no information about state should be saved within the context of the function itself.

### Separate business logic

![Separate business logic](/assets/separate-business-logic.png)

Separate your core business logic from the handler event. As illustrated in the graphic,
function configuration and Lambda-specific code are part of the Handler,
but no business logic resides in the handler. This makes your code more portable and
you can target unit-tests on the business logic without worrying about the configuration of the function.

### Write modular functions

![Write modular functions](/assets/write-modular-functions.png)

Module functions will reduce the amount of time that it takes for your deployment
package to be downloaded and unpacked before invocation. As illustrated in
the following graphic, if your file processor function consists of three modular
components (compress file, create thumbnail, and index file), consider having
three different functions that each serve a single purpose (CompressFile function,
CreateThumbnail function, and IndexFile function) instead of a larger file processing function.

### Treat functions as stateless

No information about state should be saved within the context of the function itself.
Because your functions only exist when there is work to be done, it is particularly
important for serverless applications to treat each function as stateless.
Consider one of the following options for storing state data:

- Amazon DynamoDB is serverless and scales horizontally to handle your Lambda invocations. It also has single-millisecond latency, which makes it a great choice for storing state information.
- Amazon ElastiCache may be less expensive than DynamoDB if you have to put your Lambda function in a VPC.
- Amazon S3 can be used as an inexpensive way to store state data if throughput is not critical and the type of state data you are saving will not change rapidly.

### Only include what you need

Minimize both your deployment package dependencies and its size.
This can have a significant impact on the startup time for your function.
For example, only choose the modules that you need — do not include an entire AWS SDK.

When using TypeScript, you can consider bundling and tree shaking your dependencies.

In Java, opt for simpler dependency injection (inversion of control [IoC]) frameworks.
For example, choose Dagger or Guice over more complex ones such as Spring Framework.

Reduce the time it takes Lambda to unpack deployment packages authored in Java.
Put your dependency .jar files in a separate /lib directory.

## Best practices for writing code

### Include logging statements

Lambda functions can and should include logging statements, which are written to CloudWatch.

Implement structured logging throughout your applications. Most runtimes provide
libraries to help use structured logging. See [Lambda Powertools Python Homepage](https://awslabs.github.io/aws-lambda-powertools-python/latest/)
for Python examples, or [Lambda Powertools Java Homepage](https://awslabs.github.io/aws-lambda-powertools-java/) for Java examples.

The following code snippet provides an example of logging using the logger function in python.

```python
import os
import logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    logger.info("## Environment variables")
    logger.info(os.environ)
```

### Use return coding

Functions must give Lambda information about the results of their actions.

Use the return coding appropriate for your selected programming language to exit
your code. For languages such as Node.js, Lambda provides additional methods on
the context object for callbacks. You use these context-object methods to
tell Lambda to terminate your function and optionally return values to the caller.

The following code snippet logs context information and returns the location of the logs.
This example was copied from the [Using the Lambda context object to retrieve Node.js function information](https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html)
page of the AWS Lambda Developer Guide.

```js
exports.handler = async function (event, context) {
  console.log("Remaining time:", context.getRemainingTimeInMilis());
  console.log("Function name:", context.functionName);
  return context.logStreamName;
};
```

### Provide environment variables

Take advantage of environment variables for operational parameters.

You can use these parameters to pass updated configuration settings without changes
to the code itself. You create an environment variable on your function by defining
a key and a value. Your function uses the name of the key to retrieve the value of environment variable.

You can also use environment variables to store sensitive information required by the function.

Lambda encrypts the environment variables with a key that it creates in your account
(an AWS managed customer master key [CMK]). Use of this key is free. You can also choose
to provide your own key for Lambda to use instead of the default key. Customer managed CMKs
incur standard AWS Key Management Service (AWS KMS) charges.

### Add secret and reference data

AWS Secrets Manager helps you organize and manage important configuration data
such as credentials, passwords, and license keys.

Parameter Store, a capability of AWS Systems Manager, is integrated with Secrets Manager
so you can retrieve Secrets Manager secrets when using AWS Lambda. By using Parameter Store
to reference Secrets Manager secrets, you create a consistent and secure process
for calling and using secrets and reference data in your code and configuration scripts.
Parameter Store also integrates with AWS Identity and Access Management (IAM),
giving you fine-grained access control to individual parameters or branches of a hierarchical tree.

Additionally, you can use AWS AppConfig to source, validate, deploy, and monitor configurations
stored in Parameter Store, System Manager Document Store, Amazon S3, and more.

### Avoid recursive code

Avoid a situation in which a function calls itself.

Recursive code could lead to uncontrolled scaling of invocations that
would make you lose control of your concurrency.

_IMPORTANT_ If you accidentally deploy recursive code, you can quickly set
the concurrent execution limit to zero by using the console or command line to
immediately throttle requests while you fix the code.

### Gather metrics with Amazon Cloud Watch

The CloudWatch embedded metric format (EMF) is a JSON specification used to
instruct CloudWatch Logs to automatically extract metric values embedded
in structured log events. You can use CloudWatch to graph and create alarms
on the extracted metric values.

You can use EMF to ingest complex high-cardinality application data in
the form of logs and easily generate actionable metrics from them. Traditionally,
it has been hard to generate actionable custom metrics from your ephemeral resources
such as Lambda functions and containers.

### Reuse execution context

Take advantage of an existing execution context when you get a warm start by doing the following:

1. Store dependencies locally.
2. Limit re-initialization of variables.
3. Reuse existing connections.
4. Use tmp space as transient cache.
5. Check that background processes have completed.

## Questions

Handler method: An entry point that AWS Lambda calls to initiate your Lambda function
Context object: This is generated by AWS and provides metadata about the action
Event object: An object with information about the event that initiated the Lambda function

## Building Lambda functions

### Lambda console editor

When working with Lambda through the console, note that when you save your Lambda
function the Lambda service creates a deployment package that it can run. Once this
deployment package is created, your function

From the Lambda console Create function window, you have the following three options
for how to create your function

- Author from scratch: Start with a simple Hello World example
- Use a blueprint: Build a lambda application from sample code and configuration presents fro common use cases
- Use container images: select a container image to deploy for your function

### Deployment packages

Your Lambda function's code consists of scripts or compiled programs
and their dependencies. As developers increase their skills and advance beyond using
the AWS Lambda console, they start using deployment packages to deploy the function code.
Lambda supports two types of deployment packages – container images and
.zip file archives. You can create and upload a .zip file to S3 or use a container image
and push to Amazon Elastic Container Registry (Amazon ECR).

For information on Lambda and Amazon ECR, see Using container image support for [AWS Lambda with AWS SAM](https://aws.amazon.com/blogs/compute/using-container-image-support-for-aws-lambda-with-aws-sam/) in the AWS Compute Blog.

### Automate using tools

Serverless applications built using Lambda are a combination of Lambda functions, event
sources, and other resources defined using the AWS Serverless Application
Model (AWS SAM). You can automate the deployment process of your applications
by using AWS SAM and other AWS services, such as AWS CodeBuild, AWS CodeDeploy,
and AWS CodePipeline

The best purpose for authoring using the AWS Management Console is simple one-function
with no custom libraries and experimentation

## What is AWS SAM?

AWS SAM is an open-source framework for building serverless application. It provides
shorthand syntax to express functions, APIs, databases, and event source mappings.
With just a few lines per resource, you can define the application you want and
model it using YAML. You provide AWS SAM with simplified instructions for
your environment and during deployment AWS SAM transforms and expands the AWS SAM

![AWS SAM](/assets/aws-sam.png)

1. AWS SAM is an application framework that simplifies creation and deployment of
   serverless applications

SAM is an extension of AWS CloudFormation, All CloudFormation options are still
available within AWS SAM, but with SAM you can build CloudFormation templates
using a streamlinied set of commands and a less verbose format 2. AWS SAM transforms the SAM template into CloudFormation. You provide AWS SAM with
simplified instructions for you environment. AWS SAM transforms that information into
the fully detailed AWS CloudFormation template that you can use to build your
stack into any account 3. CloudFormation build the stack. CloudFormation uses the transformed
template to build your stack

## AWS SAM prebuilt policies

AWS SAM provides a number of predefined, commonly used templates that you can use
to build for least privilege security access. The list of policy templates scope
the permissions of your Lambda functions to only the resources used by your application.
These policies require minimal input to run and can save time on developing and deploying.

To review the list of predefined policies, see [AWS SAM policy templates](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-policy-templates.html) in the AWS Serverless Application Module Developer Guide.

```yaml
AWSTemplateFormatVersion: "2010-09-09"
Transform:
  AWS::Serverless-2016-10-31 # This line tells CloudFormation that this a
  # SAM template that it needs to transform
Description: |
  sam-app
  Sample SAM Template for sam-app

Globals: # This section defines properties common to all your Serverless functions and APIs
  # This specifies that all functions in this project will have a default timeout
  # of 3 seconds and default memory of 128MB
  Function:
    Timeout: 3
    MemorySize: 128

Resources:
  HelloWorldFunction:
    Type:
      AWS::Serverless::Function # This line in the Resources section defines the
      # resource named **HelloWorldFunction** as a
      # Lambda function
    Properties:
      # The properties section under the HelloWorldFunction
      # resource defines function characteristics
      # and includes these tree lines
      CodeUri: hello-world/ # This line specifies that the code for this lambda
      Handler: app.lambdaHandler # specifies that the entrypoint is a function named
      Runtime: nodejs16.x # nodejs16.x specifies that the function language is Node.js
      Architectures:
        - x86_64
      Events: # This section specifies the different events
        # that will trigger the Lambda function
        # This specifies an HTTP GET request to an
        # API Gateway with an endpoint of `/hello`
        HelloWorld:
          Type: Api
          Properties:
            Path: /hello
            Method: get

Outputs: # This section is optional and it declares output
  # values that you can import into other CloudFormation
  # stacks
  HelloWorldApi:
    Description: API Gateway endpoint for Prod stage for Hello World function
    Value: !Sub https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/Hello
  HelloWorldFunction:
    Description: Hello World Lambda Function ARN
    Value: !GetAtt HelloWorldFunction.Arn
  HelloWorldFunctionIamRole:
    Description: Implicit IAM Role created for Hello World function
    Value: !GetAtt HelloWorldFunctionIamRole.Arn
```

## AWS SAM CLI helps you test and deploy

AWS SAM CLI launches a Docker container that you can interact with to test and
debug your Lambda functions.

### AWS SAM CLI for testing

With AWS SAM CLI for testing, you can do the following:

- Invoke functions and automated tests locally
- Generate sample event source payloads
- Run API Gateway locally
- Debug code
- Review Lambda functions logs
- Validate AWS SAM templates

![AWS SAM CLI](/assets/aws-sam-cli.png)

AWS SAM CLI launches a Docker container you can interact with to test
and debug your Lambda function code before deploying to the cloud

1. **init**: Initializes a serverless application
2. **local**: Runs your application locally
3. **validate**: Validates an AWS SAM template
4. **deploy**: Deploys an AWS SAM application. This command comes with interactive mode,
   which you can enable by specifying the guided parameter. The interactive mode walks
   you through the parameters required for deployment, provides default options, and saves
   these options in an configuration file in your project folder. Deploying Lambda functions
   through AWS CloudFormation requires an Amazon S3 bucket for the Lambda deployment package.
   The SAM CLI creates and manges this Amazon S3 bucket for you
5. **build**: Builds a serverless application and prepares it for subsequent steps in your
   workflow. The **sam build** command processes your AWS SAM template file, application code,
   and any applicable language-specific files and dependencies

### Serverless CI/CD pipeline

![Serverless CI/CD pipeline](/assets/serverless-ci-cd-pipeline.png)

Two application pipelines - one for service A and one for service B. Both Service A
and Service B pipelines have build, deploy, and test steps to deploy stack A and stack B
in a test account. The tested stack for each service is deployed to production as
the last step in each pipeline.

You can incorporate additional tools to create an automated CI/CD pipeline
for your serverless applications that integrate with AWS SAM.

**CodeBuild** – Automate the process of packaging code and running tests before the code is deployed.
**CodeDeploy** – Use version management options to ensure safe deployments to production.

**AWS SAM Template**: Streamlined CloudFormation Template for serverless applications
**CloudFormation template**: Like a house blueprint - you can treat infrastructure as code
**AWS SAM CLI**: Tool for local testing and debugging of serverless applications
**Deploy**: AWS SAM CLI command for deploying AWS SAM template

## Configuring your Lambda Functions

When building and testing a function, you must specify three primary configuration
settings: memory, timeout, and concurrency.

### Memory

You can allocate up to 10 GB of memory to a Lambda function. Lambda allocates CPU
and other resources linearly in proportion to the amount of memory configured.
Any increase in memory size triggers an equivalent increase in CPU available to your function.

### Timeout

The AWS Lambda timeout value dictates how long a function can run before Lambda terminates
the Lambda function. At the time of this publication, the maximum timeout for a
Lambda function is 900 seconds. This limit means that a single invocation of a
Lambda function cannot run longer than 900 seconds (which is 15 minutes).

## Lambda billing costs

You are charged based on the number of request for your functions and
the duration, the time it takes for your code to run

**Duration** is calculated from the time your code begins running until it returns
or otherwise terminates, rounded up to the nearest 1ms

**Price** depends on the amount of memory you allocate to your function. If you
allocate 10GB to a function and the function only uses 2GB, you are charged for
10GB. This is another reason to test your functions using different memory
allocations to determine which is the most beneficial for the function

## The balance between power and duration

Depending on the function, you might find that the higher memory level might
actually cost less because the function can complete much more quickly that
at a lower memory configuration

You can use an open-source tool called Lambda Power Tuning to find the best
configuration for a function. The tool runs in your own AWS account powered by
AWS Step Functions and supports three optimization strategies: cost, speed,
and balanced. It's language-agnostic so that you can optimize any Lambda functions
in any of your languages

### Scenario

A developer has been asked to troubleshoot a Lambda function that is in production.
They've been told that it runs for 5 minutes and has been asked to reduce its
duration to save on billable costs. Which actions should the developer take?

- Confirm whether 5 minutes is the typical duration through production monitoring.
- Test at higher memory configurations and compare the duration and cost at each configuration.
- Check whether any unecessary SDK components are in the deployment package.

> [!TIP]
> A developer must make sure that a 5-minute duration isn't reflective of a single
> invocation. Instead of running it once from the console, they need to examine
> how it exactly runs in production
>
> Decreasing the timeout would save costs, but i would probably mean that the function
> would frequently fall to complete. A best practice is to experiment with different
> memory configurations and estimate whether a higher memory configuration would
> actually be less expensive. They can also determine whether there are unnecessary in
> the functions itself that could be removed to speed up its initialization

### Concurrency and scaling

Concurrency is the third major configuration that affects your function's performance
and its ability to scale on demand. Concurrency is the number of invocations your
function runs at any given moment. When your function is invoked, Lambda launches an
instance of the function to process the event. When the function code finishes running,
it can handle another request. If the function is invoked again while the first request is
still being processed, another instance is allocated. Having more than one invocation running at
the same time is the function's concurrency.

#### Concurrent invocations

As an analogy, you can think of concurrency as the total capacity of a restaurant
for serving a certain number of diners at one time. If you have seats in the
restaurant for 100 diners, only 100 people can sit at the same time. Anyone who
comes while the restaurant is full must wait for a current diner to leave before
a seat is available. If you use a reservation system, and a dinner party has
called to reserve 20 seats, only 80 of those 100 seats are available for people
without a reservation. Lambda functions also have a concurrency limit and a
reservation system that can be used to set aside runtime for specific instances

![Seats available](/assets/seats-available.png)

Concurrency can be compared to the seating limit in a restaurant. If there are
100 total seats and 40 are in use and 20 are reserved, only 40 seats are
available (100-40-20 = 40 seats) for people arriving without a reservation.

### Concurrency types

#### Unreserved concurrency

The amount of concurrency that is not allocated to any specific set of functions.
The minimum is 100 unreserved concurrency. This allows functions that do not
have any provisioned concurrency to still be able to run. If you provision all
your concurrency to one or two functions, no concurrency is left for any
other function. Having at least 100 available allows all your functions to
run when they are invoked.

#### Reserved concurrency

Guarantees the maximum number of concurrent instances for the function.
When a function has reserved concurrency, no other function can use that
concurrency. No charge is incurred for configuring reserved concurrency for
a function.

#### Provisioned concurrency

Initializes a requested number of runtime environments so that they are
prepared to respond immediately to your function's invocations. This option is used
when you need high performance and low latency.

You pay for the amount of provisioned concurrency that you configure and for
the period of time that you have it configured.

For example, you might want to increase provisioned concurrency when you are
expecting a significant increase in traffic. To avoid paying for unnecessary
warm environments, you scale back down when the event is over.

### Reasons for setting concurrency limits

#### Limit Concurrency

Limit a function's concurrency to achieve the following:

- Limit costs
- Regulate how long it takes you to process a batch of events
- Match it with a downstream resource that cannot scale as quickly as Lambda

#### Reserve Concurrency

Reserve function concurrency to achieve the following:

- Ensure that you can handle peak expected volume for a critical function
- Address invocation errors

## How concurrency bursts are managed

A burst is when there is a sudden increase in the number of instances needed to
fulfill the requested number of running functions. An example is an increase in
orders on a website during a limited time sale. The burst concurrency quota is
not per function. It applies to all of your functions in the Region

The burst quotas differ by region:

- 3000 - US West (Oregon), US East (N. Virginia), Europe (Ireland)
- 1000 - Asia Pacific (Tokyo), Europe (Frankfurt), US East (Ohio)
- 500 - Other Regions

### Example

Bursts are handled based on a combination of your limits and a predetermined
Immediate Concurrency Increase amount that is dependent on the Region where
your Lambda function is running. In this example, the account limit is set for
5,000 concurrent invocations in a Region with an immediate concurrency increase of 3,000.

![1](/assets/1.png)
In this example, if the concurrent invocations burst from 100 to 4,000, Lambda will respond by adding the Immediate Concurrency Increase of 3,000 to the 100 concurrent invocations that were running before the burst.

![2](/assets/2.png)
After one minute, Lambda evaluates whether more are needed. If the account limit or the burst level has not been reached, Lambda adds 500 additional concurrent invocations. In this example, 500 more concurrent invocations are added.
![3](/assets/3.png)
After a second minute, another 500 concurrent invocations are added. After another minute, Lambda evaluates that there are enough concurrent invocations available to handle the burst, and the evaluate/add cycle ends.
![4](/assets/4.png)
If you consider the same burst for a function that has a concurrency limit set for 1,000, Lambda would immediately increase the concurrent invocations to 1,000. By having reached the function limit. Lambda would start throttling invocations to keep the concurrent invocations no higher than 1,000.

## CloudWatch metrics for concurrency

When your function finishes processing an event, Lambda sends metrics about the
invocation to Amazon CloudWatch. You can build graphs and dashboards with these
metrics in the CloudWatch console. You can also set alarms to respond to changes
in use, performance, or error rates.

### ConcurrentExecutions

Shows the sum of concurrent invocations for a given function at a given point in
time. Provides historical data on how functions are performing.

You can view all functions in the account or only the functions that have a custom
concurrency limit specified.

### UnreservedConcurrentExecutions

Shows the sum of the concurrency for the functions that do not have a custom
concurrency limit specified.

## Testing concurrency

The most important factor for your concurrency, memory, and timeout settings is
to verify application testing against real-world conditions.
To do this, follow these suggestions:

- Run performance tests that simulate peak levels of invocations.
  > - View the metrics for the amount of throttling that occurs during performance peaks.
- Determine whether the existing backend can handle the speed of requests sent to it.
  > - Don't test in isolation. If you’re connecting to Amazon Relational Database Service (Amazon RDS), ensure that you test that the concurrency levels for your function can be processed by the database.
- Does your error handling work as expected?
  > - Tests should include pushing the application beyond the concurrency settings to verify correct error handling.

### Check Knowledge

What are some reasons a developer would set a concurrency limit (or reserve) on a function?

- Manage costs
- Regulate how long it takes to process a batch of events
- Match the limit with a downstream resource

> [!TIP]
> Regular batch processing
> → Controlar el throughput general del procesamiento.
> Match downstream resource
> → Proteger dependencias que no pueden escalar igual que Lambda.

## Deploying and testing Serverless Applications

This lesson also introduces how an application framework, such as the AWS
Serverless Application Model (AWS SAM), can simplify your deployment practices.
AWS SAM can make the move to serverless more efficient.

The server-based model is the existing house that you can move into.

Before you move in, you understand the layout and the rooms and how your
family will fit into the house. You don’t need to know how the wood holds the
house together or the types of nails used. You work with what’s physically
already there. For example, the house has three bedrooms, two bathrooms, and a kitchen.

## How a serverless deployment differs from an server-based deployment

**A serverless deployment is like designing and building a house using detail specifications**

When you design and build a house, you must tell the builders every detail of the house:

- Number of rooms to build
- Room size
- Number of windows, doors, and light sockets
- Where to put the light sockets

These details are conveyed to the building contractors through the blueprints.
A blueprint is a template of how to build every component of the house.
With this blueprint, you can visualize what the house looks like, and
you can use that same blueprint to build many identical houses. With serverless,
everything that your Lambda functions needs is included in the blue print,
called the CloudFormation Template

![Build 1](/assets/build-1.png)

Serverless can be compared to building a house by using a blueprint. With
this blueprint, you can build the same house anywhere in the world

![Build 2](/assets/build-2.png)

When you deploy lambda functions the blueprint takes the form of an AWS
CloudFormation template

**The AWS CloudFormation template is considered the blueprint for the Lambda function.**

The CloudFormation template specifies every detail of the Lambda function and the
environment required for the lambda function to run. CloudFormation provides
a common language and format that all parts of AWS can read and understand

**CloudFormation is infrastructure as code**

The entire infrastructure needed for your Lambda function is written to a text
file. This file (template) then deploys your desired stack. A stack is a collection
of AWS resources that you can manage as a single unit. The template becomes the
single source of truth for deploying identical stack into any AWS account. Each
time the Lambda function is invoked, it runs by using information provided in
the CloudFormation template

![Build 3](/assets/build-3.png)

A single template can deploy identical Lambda functions within multiple AWS accounts

### Server-based development environments

In general, a developer workflow includes the following basic steps:

1. Author code
2. Test and debug changes in isolation
3. Merge your code into the larger application code and perform application testing

In a server-based deployment, this workflow is achieved by doing the following:

1. pulling down a local copy of the application
2. Working locally through your IDE to code
3. Testing and debugging your code
4. Checking your changes into source control

The updated code is then picked up by a build-and-deploy process. For many developers,
this is when they pass the code to a DevOps team member. DevOps validates the build
and deploys the updated application to designated instances. As a developer, you then
have access to a particular set of development and test instances. These are the
environments where you perform additional application and integration testing and
debugging

After testing is successful, DevOps follows a similar deployment process to update production instances with the tested application components. The build scripts and the environment that your code is deployed into are already established and waiting for your application code. This process is like the prebuilt house that is ready and waiting for you to move in.

![Test and debug serverless applications](/assets/test-and-debug.png)

1. Code is written locally in the integrated development environment (IDE).
2. The code is tested and debugged locally until the developer feels confident in the code.
3. The code is checked into a source control repository where it can be versioned ant the DevOps team can access it.
4. A DevOps team member validates the build and deploys the updated application to designed test or development instances.
5. Developers have access to defined test instances to perform application/integration testing and debugging.
6. After application is deployed in the development environment, the developer must test and debug the application code.

### Serverless development environments

In a serverless deployment, you provide all the components necessary to deploy your function:

- Code, bundled with any necessary dependencies
- CloudFormation template, which is the blueprint for building the serverless environment

**A key difference in the developer workflow is how the code and the application are tested.**

Because serverless is hosted in the cloud, no option is available to check out a local
copy of the application to do localize testing. You cannot recreate the environment
specified in your CloudFormation template locally. Instead, you must have access to
designated AWS accounts for testing. You can then perform realistic testing
of your application in the cloud. With the appropriate access permissions, you can deploy
an test your stack to any development, testing, staging, or production account in your organization

![Test and debug AWS test account](/assets/test-and-debug-aws-test-account.png)

**AWS SAM makes serverless development easier.**
**AWS SAM is a simplified set of CloudFormation commands that makes serverless development easier.**

**Ensures environment parity**
AWS SAM streamlines the tasks for creating a stack and deploying the same stack to each account.

**Simplifies experimentation**
Without the overhead of maintaining instances, you can use AWS SAM to quickly start stacks
for different feature branches. You can experiment without incurring costs outside of the actual
invocations that run on that environment

**The application framework ensures that you can always deploy the same stack to each account.**

### Reduce risk using versions and aliases

One potential challenge to serverless deployments is that when function is deployed, it
becomes live immediately. This means that a function can potentially go live without
testing it, which puts your working application at risk. This risk is especially true
if you move toward an automated CI/CD pipeline and need to easily promote new code or roll back
if there's problem. To mitigate this risk, you can version your lambda functions and add
aliases to ensure safe deployment

#### Versioning

You can use versions to manage the deployment of your functions. For example, you can
publish a new version of a function for beta testing without affecting users of the stable
production version. Lambda creates a new version of your function each time that you publish
the function. The new version is a copy of the unpublished version of the function

When you create a Lambda function, only one version exists which is identified
by **$LATEST** at the end of the Amazon Resource Name (ARN)

_Example_: arn:aws:lambda:aws-region:acct-id:function:helloworld:**$LATEST**

#### Publish

Publish makes a snapshot copy of $LATEST

Enable versioning to create immutable snapshots of your function every time you publish it.

- Publish as many versions as you need
- Each version number to the function ARN to reference it
- The snapshot becomes the new version and is immutable

_Example_: arn:aws:lambda:aws-region:acct-id:function:helloworld:**1**

#### Aliases

A Lambda alias is like a pointer to a specific function version. You can access
the function version using the alias ARN. Each alias has a unique ARN. An alias can point
only to a function version, not to another alias. You can update an alias to point
to a new version of the function

_Example_: arn:aws:lambda:aws-region:acct-id:function:helloworld:**Test**

### Test using alias routing

You can also use routing configuration on an alias to send a portion of traffic
to a second function version. For example, you can reduce the risk of deploying
a new version by configuring the alias to send most of the traffic to the existing
version and only a small percentage of traffic to the new version.

You can point an alias to a maximum of two Lambda function versions. The versions
must meet the following criteria:

- Both versions must have the same runtime role
- Both versions must have the same dead-letter queue configuration, or no dead-letter queue configuration
- Both versions must be published. The alias cannot point to $LATEST

When alias is updated to point to a new version, incoming requests immediately point
to the new version. If the new version encounters problems, it could potentially
affect 100% of your users

One way to mitigate risk in testing is to use weighted aliases on your Lambda
function so that only a portion of the traffic goes to the new version. In this example,
if the new version encounters any errors, only 10% of your users are affected

### Integrate with AWS CodeDeploy

Lambda is integrated with AWS CodeDeploy for automated rollout with traffic shifting.
CodeDeploy supports multiple traffic shifting methods, in addition to alarms and hooks.
CodeDeploy supports the following traffic-shifting patterns:

- **Canary** - Traffic is shifted in tow increments. If the first increment is successful,
  the second is completed based on the time specified in the deployment.
- **Linear** - With linear traffic shifting, traffic is slowly shifted in a predetermined
  percentage every X minutes based on how you have it configured
- **All-at-once** - Shifts all traffic from the original Lambda function to the updated
  Lambda function version at once

Additionally, it supports the following testing options:

- **Alarms** - These instruct CloudWatch to monitor deployment and trigger an alarm
  if any errors occurred during rollout. Any alarms would automatically roll back your
  deployment
- **Hooks** - Give you the option to run pre-traffic and post-traffic test functions that run
  sanity checks before traffic-shifting starts to the new version and after traffic-shifting
  completes

**Note**: When the alarms or hooks trigger a rollback, everything in the CloudFormation template being deployed is rolled back. Best practice is to keep your AWS SAM templates and CloudFormation templates as concise in scope as possible. As a guideline, examine no fewer than one template per service that you are deploying.

### Shift traffic for Lambda using AWS CodeDeploy

You can use AWS SAM to configure your CodeDeploy traffic-shifting options. Review the
additions to your AWS SAM template that can add safe deployment checks when using
CodeDeploy

```yml
# Detect when new code is being deployed.
# Publish update version.
# Create an alias and point to updated version.
AutoPublishAlias: live
```

Include the AutoPublishAlias configuration to direct AWS SAM to publish an alias and
automatically increment the version on every deployment. In this example the
AutoPublishAlias is set to "live". This setting detects when new code is being deployed,
publishes the updated version, creates an alias, and points to the updated version.

```yml
AutoPublishAlias: live
# Implement traffic shifting as described
DeploymentPreference:
  Type: Canary10Percent10minutes
```

Use the **DeploymentPreference** option to specify which traffic-shifting pattern to use.
In this example, it is set for a type of Canary10Percent10minutes. In addition to canary
and linear options, you can use the all-at-once option to shift all traffic from the
original Lambda function to the updated Lambda function version at once

```yml
AutoPublishAlias: live
# Roll back deployment based on specified CloudWatch alarms.
DeploymentPreference:
  Type: Canary10Percent10minutes
  Alarms:
    - !Ref AliasErrorMetricGreaterThanZeroAlarm
    - !Ref LatestVersionErrorMetricGreaterThanZeroAlarm
```

You can use the Alarms option to instruct CloudWatch to monitor the deployment and
trigger an alarm if any errors occur during rollout. Alarms would automatically
roll back your deployment. In this example, alarms include AliasErrorMetricGreaterThanZeroAlarm
and LatestVersionErrorMetricGreaterThanZeroAlarm

```yml
AutoPublishAlias: live
DeploymentPreference:
  Type: Canary10Percent10minutes
  Alarms:
    - !Ref AliasErrorMetricGreaterThanZeroAlarm
    - !Ref LatestVersionErrorMetricGreaterThanZeroAlarm
  # Run tehse checks before traffic-shifting starts and after
  # traffic-shifting completes
  Hooks:
    PreTraffic: !Ref PreTrafficLambdaFunction
    PostTraffic: !Ref PostTrafficLambdaFunction
```

Use Hooks to run **PreTraffic** and **PostTraffic** test functions that run
sanity checks before traffic shifting starts and after traffic shifting completes.
In this example, the PreTraffic hook is PreTrafficLambdaFunction and the
PostTraffic hook is PostTrafficLambdaFunction

**Note:** When the alarms or hooks trigger a rollback, **everything** in the CloudFormation
template being deployed is rolled back. Keep your AWS SAM templates and CloudFormation
templates as concise in scope as possible

**When you create a Lambda function, only one version exists: the $LATEST version.**
**You can reference any version with an alias.**
**You can reference a version or an alias in the Amazon Resource Name (ARN).**

## Monitoring and Troubleshooting

### Types of monitoring graphs

AWS Lambda automatically monitors Lambda functions on your behalf and reports
metrics through Amazon CloudWatch. To help you monitor your code when it runs,
Lambda automatically tracks the following:

- Number of requests
- Invocation duration per request
- Number of requests that result in an error

Amazon CloudWatch provides built-in metrics to help monitor your Lambda functions

#### Invocations

The number of times your function code is run, including successful runs and runs
that result in a function error. If the invocation request is throttled or otherwise
resulted in an invocation error, invocations aren't recorded.

#### Duration

The amount of time that your function code spends processing an event. The billed
duration for an invocations is the value of Duration rounded up to the nearest
millisecond

#### Errors

The number of invocations that result in a function error. Function errors include
exceptions thrown by your code and exceptions thrown by the Lambda runtime. The
runtime returns errors for issues such as timeouts and configurations errors.

#### Throttles

The number of times that a process failed because of concurrency limits. When all
function instances are processing requests and no concurrency is available to scale up,
lambda rejects additional requests.

#### IteratorAge

Pertains to event source mappings that read from streams. The age of the last record
in the event. The age is the amount of time between when the stream receives the
record and when the event source mapping sends the event to the function.

#### DeadLetterErrors

For asynchronous invocation, this is the number of times lambda attempts to send
an event to a dead-letter queue but fails

#### ConcurrentExecutions

The number of function instances that are processing events.

You can also view metrics for the following:

- **UnreservedConcurrentExecutions** - The number of events that are being processed
  by functions that don't have reserved concurrency

- **ProvisionedConcurrentExecutions** - The number of function instances that are
  processing events on provisioned concurrency. For each invocation of an alias or
  version with provisioned concurrency, Lambda emits the current count.

### Amazon CloudWatch Lambda Insights

Amazon CloudWatch Lambda Insights is a monitoring and troubleshooting solution for
serverless applications running on Lambda. Lambda Insights collects, aggregates,
and summarizes system-level metrics. It also summarizes diagnostic information such as cold
starts and Lambda worker shutdowns to help you isolate issues with your Lambda
functions and resolve them quickly.

Lambda Insights uses a CloudWatch Lambda extension, which is provided as a Lambda
layer. When you enable this extension on a Lambda function, it collects system-level
metrics and emits a single performance log event for every invocation of that lambda
function. CloudWatch uses embedded metric formatting (EMF) to extract metrics from
the log events

### Lambda Insights dashboard

The Lambda Insights dashboard has two views in the CloudWatch console: the multi-function
overview and the single-function view. The multi-function overview aggregates the
runtime metrics for the lambda functions in the current AWS account and Region.
The single-function view shows the available runtime metrics for a single Lambda function

You can use the Lambda Insights dashboard multi-function overview in the CloudWatch
console to identify over-and under-utilized Lambda functions. You can use the Lambda
Insights dashboard single-function view in the CloudWatch console to troubleshoot
individual requests

### Monitoring Lambda functions using AWS X-Ray

You can use AWS X-Ray to visualize the components of your applications, identify
performance bottlenecks, and troubleshoot requests that resulted in an error. Your
Lambda functions send trace data to X-Ray, and X-Ray processes the data to generate a
service amp and searchable trace summaries

AWS X-Ray records how the lambda functions are running. You can use X-Ray for:

- Tuning performance
- Identifying the call flow of Lambda functions and API calls
- Tracing path and timing of an invocation to locate bottlenecks and failures

### Additional monitoring and troubleshooting

#### AWS CloudTrail

AWS CloudTrail helps audit your application by recording all the API actions made
against the application. These logs can be exported to the analysis tool of your
choice for additional analysis

CloudTrail logging provides the following options:

- The default Lambda CloudTrail logging is for control plane (management) events.
- Optional logging: CloudTrail also logs data events. You can turn on data event logging so that you log an event every time Lambda functions are invoked.

CloudTrail can be an important tool for auditing serverless deployments and rolling back unplanned deployments.

#### Dead-Letter Queues

Dead-Letter queues help you capture application errors that must receive a response,
such as an e-commerce application that processes orders. If an order fails, you cannot
ignore that order error. You move that error into the dead-letter queue and manually
look at the queue and fix the problems

- Use dead-letter queues to _analyze failures_ for follow-up or code corrections
- Dead-Letter queues are available for _asynchronous_ and _non-stream polling events_
- A dead-letter can be an _Amazon Simple Notification Service (Amazon SNS) topic_ or an
  _Amazon Simple Queue Service (Amazon SQS) queue)_.

Amazon CloudWatch: Review metrics on invocations, errors, and throttling for a Lambda function.
Dead-Letter queue: Manually review errors for Lambda invocations that failed and must be addressed.
AWS X-Ray: Review trace details about an invocation to identify potential bottlenecks.
AWS CloudTrail: Audit actions made against your applications.

## Additional Resources

- <https://skillbuilder.aws/search?searchText=serverless&page=1&typeId=learning_plan>
- <https://serverlessland.com/>
- <https://serverlessland.com/learn?type=Workshops>
- <https://aws.amazon.com/serverless/>
- <https://docs.aws.amazon.com/lambda/latest/dg/welcome.html>
- <https://docs.aws.amazon.com/whitepapers/latest/security-overview-aws-lambda/security-overview-aws-lambda.pdf>
- <https://docs.aws.amazon.com/wellarchitected/latest/serverless-applications-lens/>
- <https://docs.aws.amazon.com/whitepapers/latest/serverless-multi-tier-architectures-api-gateway-lambda/introduction.html>
- <https://aws.amazon.com/blogs/compute/category/compute/aws-lambda/>
- <https://aws.amazon.com/lambda/resources/webinars-and-talks/>

1. Which feature can a developer enable to create a copy of a function for testing? **Versioning**
   You can use versions to manage the deployment of your functions. For example, you can publish a new version of a function for beta testing without affecting users of the stable production version. AWS Lambda creates a new version of your function each time that you publish the function. The new version is a copy of the unpublished version of the function.

2. Which patterns are Lambda invocation models? (Select THREE.) **Polling, Synchronous, Asynchronous**
   Event sources can invoke a Lambda function in three general design patterns. These patterns are called invocation models: synchronous, asynchronous, and polling.

3. What does an AWS Identity and Access Management (IAM) resource-based policy control?
   **Permissions to invoke the function**

4. Match the terms on the left with the appropriate definition.
   **Cosumer: Subscribe and are notified when events occur**
   **Router: Ingests and filters events using rules**
   **Producer: Create events with all required information**
   **Producers** are users who create the events. Events contain all the necessary information required for the consumers to take action on the event.
   The **router** ingests, filters, and pushes the events to the appropriate consumers. It does this by using a set of rules or another service, such as Amazon Simple Notification Service (Amazon SNS), to send the messages.
   **Consumers** subscribe to be notified about the events, or they can monitor an event stream and act on events that pertain only to them.

5. Which capabilities are features of Lambda? (Select THREE.)
   **Triggers Lambda functions on your behalf in response to events**
   **Scales automatically**
   **Runs code without you provisioning or managing servers**
   You can write code for Lambda in a programming language that you already know. Development in Lambda is not tightly coupled to AWS so you can easily port code in and out of AWS. Instead of scaling by adding servers, Lambda scales in response to events. You configure memory settings, and AWS handles details such as CPU, network, and I/O throughput.

6. Which monitoring tool provides the ability to visualize the components of an application and the flow of API calls? **AWS X-Ray**
   You can use AWS X-Ray to visualize the components of your application, identify performance bottlenecks, and troubleshoot requests that resulted in an error. Your Lambda functions send trace data to X-Ray, and X-Ray processes the data to generate a service map and searchable trace summaries. AWS X-Ray records how the Lambda functions are running. Use it to identify the call flow of your Lambda function and the performance of every API call within your application.

7. What is the importance of the IAM execution role? **Gives your function permissions to interact with other services**
   The IAM execution role grant your function permissions to interact with other services. You specify this execution role when you create a function. AWS Lambda assumes the execution role when your function is invoked. The policy for this execution role defines the actions the execution role is allowed to take—for example, writing to a DynamoDB table.

8. What are the reasons for setting a concurrency limit (or reserve) on a function? (Select THREE.)
   **Match the limit with a downstream resource**
   **Manage costs**
   **Regulate how long it takes to process a batch of events**

9. Which of these statements describe a resource policy? (Select THREE.)
   **Determines who has access to invoke the function**
   **Can grant access to the Lambda function across AWS accounts**
   **Can give Amazon S3 permission to initiate a Lambda function**

A resource policy determines who is allowed in (who can initiate your function, such as Amazon S3), and it can be used to grant access across accounts.
An execution role must be created or selected when creating your function, and it controls what Lambda is allowed to do (such as writing to a DynamoDB table). It includes a trust policy with AssumeRole.
