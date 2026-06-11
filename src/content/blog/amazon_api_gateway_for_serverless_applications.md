# Amazon API Gateway for Serverless Applications

## Introduction to API Gateway

APIs are the mechanisms that facilitate two software components communicating
with each other. APIs act as the front door for applications to access data,
business logic, or functionality from backend services.

## The challenges of API management

Although there are many benefits to using APIs, you can also encounter commonly
occurring challenges while managing your APIs. Some of these challenges include:

- Handling API calls in a serverless application
- Working with multiple API versions and environments
- Controlling access and authorization
- Managing traffic spikes
- Monitoring third-party access

## Using API Gateway as the front door for APIs

Before diving into how to design and deploy APIs in API Gateway, you need to
understand what API Gateway is. API Gateway is a service that facilitates the creation,
publishing, maintenance, monitoring, and security of your APIs at any scale. API Gateway
handles all your tasks around accepting and processing hundreds of thousands of
concurrent API calls. This includes Handling traffic management, Cross Origin Resource
Sharing (CORS) support, authorization and access control, throttling, monitoring, and
API version management.

## API Gateway features

### Developer features in API Gateway

There are some important features for developers you should know.

#### Run multiple versions of an API at the same time

With API Gateway, you can run multiple version of the same API simultaneously so
that you can quickly iterate, test, and release new versions. You can make
changes to your API and host multiple versions of it for different users also.

#### Quick SDK generation

If you're using REST APIs, API Gateway can generate client Software Kits (SDKs)
for several platforms, which you can use to quickly test new APIs from your applications
and distribute SDKs to third-party developers.

The generated SDKs handle API keys and sign requests using AWS credentials. API
Gateway can generate client SDKs for Java, JavaScripts, Java for Android, Objective-C
or Swift for iOS, and Ruby. You can use AWS Command Line Interface (AWS CLI) to
generate and download and SDK of an API a supported platform by calling the
**get-sdk** command.

#### Transform or validate request-response data

With API Gateway, you can also transform and validate both incoming and outgoing
requests. With this feature, you can use API Gateway as a fully managed environment
for transforming requests as they come into your API before they are passed to your
backend

### Features for managing API access

There are also some important features for managing API access.

#### Reduce latency and throttle traffic

API Gateway provides end users with the lowest possible latency for API requests and
responses by taking advantage of the Amazon CloudFront global network of edge
locations. With this service, you can also can throttle traffic and authorize API
calls to ensure that backend operations withstand traffic spikes and backend systems
are not unnecessarily called.

#### Built-in, flexible authorization options

API Gateway gives you several options for authorization. You can authorize access to
your APIs with AWS Identify and Access Management (IAM) and Amazon Cognito. If you
use OAuth tokens, API Gateway also offers native OpenID Connect (OIDC) and
OAuth 2 support

To support custom authorization requirements, you can invoke a Lambda authorizer
from Lambda. With a Lambda authorizer, you can develop your own authorization
code using a custom Lambda function.

#### API keys for third-party developers

If you're using REST APIs, API Gateway helps you manage the ecosystem of third-party
developers accessing your APIs. You can create API keys on API Gateway, set
fine-grained access permissions on each API key, and distribute them to third-party
developers to access your APIs. API keys are not a primary authorization mechanism
for your APIs, but provide you the ability to track usage for specific users or services.

### API Gateway architecture

This architecture provides an example overview of the concepts and features you can use
with API Gateway.

![Amazon API Gateway architecture](/assets/amazon-api-gateway-architecture.png)

1. **Application clients** - There are several different types of application client that can use API Gateway as a front door.
2. **HTTPS suppot** - API Gateway has full support for HTTPS so that you can do encryption in transit for all of the API calls to your application
3. **CloudFront distribution** - The way API Gateway is designed, you have the option to use a CloudFront distribution in front of your APIs to provide low-latency access to your application.
4. **API Gateway cache** - You can also take advantage of API Gateway cache for frequently accessed content so that subsequent requests to your API can be pulled from the cache rather than the backend
5. **Backend integrations** - After the request hits API Gateway, you have several options to integrate on the backend. For you serverless application, you can have an API Gateway endpoint invoke Lambda functions that run your business logic when a request comes in to your API

You can also use API Gateway in front of server products, as a proxy to public HTTP endpoints, and for hybrid use cases where you want to invoke applications on premises. 6. **CloudWatch monitoring** - After your APIs are deployed, you can use CloudWatch to monitor and log your deployed APIs.

#### REST API

REST stands for representational state transfer. REST defines a set of functions such as GET, PUT, and DELETE that clients can use to access server data. Clients and servers exchange data using HTTP

The main feature of a REST API is statelessness. Statelessness means that servers do not save
client data between requests. Client requests to the server are similar to URLs you type in
your browser to visit a website. The response from the server is plain data, without the
typical graphical rendering of a web page.

REST APIs offer API proxy functionality and API management features in a single solution.
REST APIs also offer API management features such as usage plans, API keys, publishing, and
monetizing APIs.

![REST API](/assets/rest-api.png)

#### HTTP API

With HyperText Transfer Protocol (HTTP) APIs, you can create RESTful APIs with lower latency and lower cost thatn REST APIs. You can use HTTP APIs to send requests to Lambda functions or to any routable HTTP endpoint.

HTTP APIs are optimized for building APIs that proxy to Lambda functions or HTTP backends,
making them ideal for serverless workloads. They do not currently offer API management
functionality.

For example you can create an HTTP API taht integrates with a Lambda function on the
backend. When a client calls your API, API Gateway sends the request to the Lambda function
and returns the function's response to the client

![HTTP API](/assets/http-api.png)

#### WEBSOCKET API

WebSocket APIs offer APIs that the client can access through the WebSocket protocol.
Unlike REST and HTTP APIs, WebSocket APIs allow bidirectional communications. WebSocket APIs
are often used in real-time application such as chat applications, collaboration platforms,
multiplayer games, and financial trading platforms.

WebSocket APIs maintain a persistent connection between connected clients to facilitate
real-time message communication. With WebSocket APIs in API Gateway, you can define backend
integrations with Lambda functions, Amazon Kinesis, or any HTTP endpoint to be invoked when
messages are received from the connected clients

![WebSocket API](/assets/websocket-api.png)

### Choosing between RESTful APIs and WebSocket APIs

#### REST API

All-inclusive set of features needed to build, manage, and publish APIs at a single price point.
Building APIs that use certificates for backend authentication, AWS WAF, or resource policies.
Workloads that need an edge-optimized or private API type.

#### HTTP API

Building modern APIs that are equipped with native OIDC and OAuth 2 authorization
Building proxy APIs for Lambda or any HTTP endpoint
APIs for latency-sensitive workloads

#### WEBSOCKET API

Bidirectional communication that lets clients and services independently send messages to each other
Richer client-to-service interactions because services can push data to clients without requiring clients without requiring clients to make an explicit request
APIs for real-time communication

REST APIs are intended for APIs that require API proxy functionality and API management features
in a single solution. HTTP API are optimized for building APIs that proxy to lambda functions or
HTTP backends, making them ideal for serverless workloads. HTTP APIs are a cheaper and faster
alternative to REST APIs, but they do not currently support API management functionality. Unlike
a REST API, which receives and responds to requests, a WebSocket API supports two-way communication
between client apps and your backend. The backend can send callback messages to connected clients

## Designing WebSocket APIs

### Real-time message communication with WebSocket APIs

In a WebSocket API, the client and server can send messages to each other at any time. With a
WebSocket connection, your backend servers can push data to connected users and devices,
avoiding the need to implement complex polling mechanisms

For example, you could build a serverless application using an API Gateway WebSocket API
and Lambda function to send and receive messages to and form users in a chat room

```
 -------      --------------------     ------------
| Users | -> | Amazon API Gateway | -> | AWS Lambda |
 -------      --------------------     ------------
```

In API Gateway, you can create a WebSocket API as a stateful frontend for an AWS service, such as
Lambda or Amazon DynamoDB, or for an HTTP endpoint. The WebSocket API will then invoke
your correct backend service based on the content of the messages it receives from client applications

### Benefits and use cases of WebSocket APIs

API Gateway WebSocket APIs are designed for bidirectional communication between your client
and backend architecture. You can do this by using any WebSocket client such as a mobile app,
chat app, AWS IOT device, or application dashboard

When you connect the client to API Gateway, API Gateway will manage the persistence and state
needed to connect it to your clients. Unlike a REST API, which receives and responds to requests, a
WebSocket API supports two-way communication between your client applications and your backend

WebSocket APIs are often used in real-time application use cases such as:

- Chat applications
- Streaming dashboards
- Real-time alerts and notifications
- Collaboration platforms
- Multiplayer games
- Financial trading platforms

By using WebSockets with API Gateway, your clients can send messages to a service and the
services can independently send messages back to the clients. This bidirectional behavior
creates more valuable interactions between your clients and services because the
services can push data to clients without requiring clients to make an explicit request

### Pricing considerations for WebSocket APIs

#### Flat charge

WebSocket APIs for API Gateway charge for the message you send and receive. You can send
and receive messages up to 128KB in size. Messages are metered in 32-KB increments, so a
33-KB message is charged as two messages.

For WebSocket APIs, the API Gateway free tier currently includes one million messages
(sent or received) and 750,000 connection minutes for up to 12 months

#### Connection minutes

In addition to paying for the messages you send and receive, you are also charged for
the total number of connection minutes.

#### Additional charges

You may also incur additional charges if you use API Gateway in conjunction with other
AWS services or transfer data out of AWS

### Developing a WebSocket API in API Gateway

As you're developing your WebSocket API in API Gateway, there are a number of characteristics
you need to choose for your API. These characteristics depend on your API is use case.

For example, you might want to only allow certain clients to call your API, or you might
want it to be available to everyone. In addition, you might want an API call to invoke
a Lambda function, make a database query, or cal an application. All of these options
will change the characteristics of the API as you design and deploy it

### Creating and configuring WebSocket APIs

To create a functional API, you must have at least one route, integration, and stage
before deploying the API.

1. **Add routes** - In your WebSocket API, incoming JSON messages are directed to backend
   integrations based on routes that you configure. Non-JSON messages are directed to a $default
   route that you configure. A route includes a route key, which is the value that is expected
   once a route selection expression is evaluated

2. **Route selection expression** - The route selection expression is an attribute defined at the
   API level. It specifies a JSON property that is expected to be present in the message payload

3. **Attach integrations** - After setting up an API route, you must integrate it with an endpoint
   in the backend. A backend endpoint is also referred to as an integration endpoint and can be a
   Lambda function, an HTTP endpoint, or an AWS service action. The API integration has an integration
   request and an integration response.

4. **Add stages** - In API Gateway, stages are similar to tags. They define the path through which the deployment is accessible.

### WebSocket API integrations

After setting up an API route, you must integrate it with an endpoint in the backend. A backend
endpoints is also referred to as an integration endpoint and can be a Lambda function, an HTTP
endpoint, or an AWS service action. The API integration has an integration request and an integration
response option

##### Integration request

To set up one-way communication for your WebSocket, you will attach an integration
request to your route. Setting up an integration request involves the following:

- Choosing a route key to integrate to the backend. As shown earlier in this lesson,
  this can include a predefined route key for $connect, $disconnect, $default, or a custom route.

- Specifying the backend endpoint to invoke for each of the routes you choose,
  such as an AWS service or HTTP endpoint.

- Configuring how to transform the route request data, if necessary, into integration
  request data by specifying one or more request templates.

Integration type: Mock, Lambda, HTTP

##### Integration response

WebSocket routes can be configured for two-way or one-way communication. If a route has a
route response, it is configured for two-way communication. Otherwise, it is configured for one-way communication.

- When a route is configured for two-way communication, an integration response helps you to configure transformations on the returned message payload, similar to integration responses for REST APIs.

- If a route is configured for one-way communication then, regardless of any integration response configuration, no response will be returned over the WebSocket channel after the message is processed.

### WebSocket selection expressions

API Gateway uses selection expressions as a way to evaluate the request and response context and produce a key. This key is then used to select from a set of possible values that you provide. The selection expressions that you can use include:

- Route response selection expressions, which are used for modeling a response from the backend to the client

- API key selection expressions, which are evaluated when the service determines the given request should proceed only if the client provides a valid API key

- API mapping selection expressions, which are evaluated to determine which API stage is selected when a request is made using a custom domain

### Maintaining connections to WebSocket APIs

To understand how the WebSocket connections are maintained, you need to understand how
the client connects, sends messages, and disconnects from the API. To learn more, expand each
of the following three categories.

**Connect**
The client apps connect to your WebSocket API by sending a WebSocket upgrade request. If the
request succeeds, the $connect route is invoked while the connection is being established. Until the
invocation of the integration you associated with the $connect route is completed, the upgrade request
is pending and the actual connection will not be established. If the $connect request fails, the connection will not be made.

**Established connection**
After the connection is established, your client's JSON messages can be routed to invoke a
specific backend service based on message content. When a client sends a message over
its WebSocket connection, this results in a route request to the WebSocket API.
The request will be matched to the route with the corresponding route key in API Gateway.

**Disconnect**

The **$disconnect** route is invoked after the connection is closed. The connection can be closed by
the server or by the client. As mentioned earlier in the lesson, since the connection is already
closed when it is invoked, the **$disconnect** route is a best-effort event. API Gateway will try its
best to deliver the **$disconnect** event to your integration, but it cannot guarantee delivery.
The backend can initiate disconnection by using the **@connections** API.

## Designing REST APIs

### API Gateway REST API endpoint types

Before you start designing your APIs, you will need to decide the type of endpoint
that makes sense for the traffic and usage patterns you anticipate.

#### Regional endpoint

The regional endpoint is designed to reduce latency when calls are made from the same AWS
Region as the API. In this model, API Gateway does not its own CloudFront distribution
in front of your API. Instead, traffic destined for your API will be directed straight
at the API endpoint in the Region where you've deployed it.

This endpoint type gives you low latency for applications that are invoking your API from
within the same Region (for example, an API that is going to be accessed from EC2 instances
within the same Region)

The regional endpoint provides you with the flexibility to deploy your own CloudFront
distribution or content delivery network (CDN)

![Regional endpoint](/assets/regional-endpoint.png)

#### Edge-optimized endpoint

The edge-optimized endpoint is designed to help you reduce client latency from
anywhere on the internet. If you choose an edge-optimized endpoint, API Gateway
will automatically configure a fully managed CloudFront distribution to provide
lower latency access to your API.

![Edge-optimized endpoint](/assets/edge-optimized-endpoint.png)

#### Private endpoint

The private endpoint is designed to expose APIs only inside your selected Amazon
Virtual Private Cloud (Amazon VPC). This endpoint type is still managed by API Gateway
but requests are only routable and can only originate from within a single virtual
private cloud (VPC) that you control

This endpoint type is designed for applications that have very secure workloads, such as
healthcare or financial data that cannot be exposed publicly on the internet. There are no data transfer-out charges for private APIs. However, AWS PrivateLink charges apply when using private APIs in API Gateway.

![Private endpoint](/assets/private-endpoint.png)

### API Gateway optical cache

You can turn on API caching in API Gateway to cache your endpoint's responses. With
caching, you can reduce the number of calls made to your endpoint and also improve the
latency of requests to your API.

This is a optional configuration only available for REST APIs, but definitely an option
that you want to consider based on your use cases.

#### Why use API Gateway caching

When caching is turned on, API Gateway caches responses from your endpoint for a
specified Time-to-Live (TTL) period. API Gateway then responds to a request by
looking up the endpoint response from the cache instead of making a request to your
endpoint. There are two big benefits of using the cache:

1. It reduces overall latency for serving requests.
2. It minimizes the number of requests that need to be made to your backend

This becomes even more valuable as you scale and want to reduce the amount of calls
to your backend resources

#### Configure caching per API stage

Stages are covered in depth in a later lesson, but to provide a brief summary, a stage
is a named reference to a specific API deployment. Configuration choices for stage
caching include the following.

**Provision between 0.5 GB and 237 GB of cache**
When you turn on caching, you can configure the size of the cache anywhere from
half a gig to 237 gigabytes, and you can also configure and customize the maximum
TTL for each cache entry.

**Set TTL in seconds**
The default TTL value for API caching is 300 seconds. The maximum TTL value is
3,600 seconds. When you set TTL=0, caching is turned off within API Gateway.

**Turn on encryption of cache data**
You can also encrypt the cached data if you need to.

**Only GET methods will be cached**
When you turn on caching in a stage's cache settings, only GET methods are cached.
We recommend that you don't cache other types of calls unless you have very specific
reasons.

**Configure per method**
You can override stage-level settings for individual methods. Turn caching on or off
for specific methods, increase or decrease the TTL, or turn encryption on or off for
cached responses.

#### Managing the API Gateway cache

**Caching is charged at an hourly rate**
Keep in mind that data caching is charged at an hourly rate that is dependent on the
cache size you select, regardless of the number of API calls being cached. So be
thoughtful in choosing the cache size, and consider the amount of data you intend to
cache. Tow ways to verify caching:

1. CloudWatch Metrics: **CacheHitCount** and **CacheMissCount**
2. Create a timestamp and include it in your API response.

### Pricing considerations for REST APIs

**Flat charge**
REST APIs for API Gateway have a flat charge per million API Gateway requests. With
API Gateway, you only pay when your APIs are in use at a set cost per million requests.

API Gateway free tier includes one million API calls per month for up to 12
months

## Knowledge check

**1/3**
_Regional endpoint_ - Provides lower latency for applications that invoke your API within the same AWS Region
_Edge-optimized endpoint_ - Deploys a fully managed Amazon CloudFront distribution
_Private endpoint_ - Requests are only routable within a single virtual private cloud (VPC) that you control

**2/3**
Which of the following REST API endpoint type changes is not supported by API Gateway?
**From private to edge-optimized**
The regional, edge-optimized, and private endpoint types are supported by REST APIs. As a reminder, from private to edge-optimized is not a supported endpoint change.

To learn more about the supported REST API endpoint changes, review the "Designing REST APIs" lesson.

**3/3**
Which of these use cases are a good fit for WebSocket APIs?
**Real-time alerts and notifications**
**Two-way chat applications**
**Streaming applications**

## Building and Deploying APIs with API Gateway

**The base API invoke URL follows a pattern**

https://_restAPI_id_.execute-API._region_.amazon.com/_stage_/_resource_
_restAPI_id_ -> **Unique ID** generated by AWS
_region_ -> **AWS Region** where API is deployed
_stage_ -> **Deployment stage**
_resource_ -> **Resource / resource path**

You can make the URL more meaningful to your users by using a custom domain name as
the host and choosing a base path to map the alternative URL to you API. In most cases,
you'll want to use custom domains because they are more user friendly than the invoke
URL

### API Gateway integration types

#### Lambda function

This will result in requests being proxied to Lambda with request details available to
your function handler in the event parameter, supporting a streamlined integration setup.
The setup can evolve with the backend without requiring you to tear down the existing setup.

For integrations with Lambda functions, you will need to set an IAM role with required
permissions for API Gateway to call the backend on your behalf.

#### HTTP Endpoint

HTTP integration endpoints are useful for public web applications where you want
clients to interact with the endpoint. This type of integration lets an API expose HTTP endpoints in the backend.

When the proxy is not configured, you’ll need to configure both the integration
request and the integration response, and set up necessary data mappings between the
method request-response and the integration request-response.

If the proxy option is used, you don’t set the integration request or the integration response.
API Gateway passes the incoming request from the client to the HTTP endpoint and
passes the outgoing response from the HTTP endpoint to the client.

#### AWS Service

AWS Service is an integration type that lets an API expose AWS service actions.
For example, you might drop a message directly into an Amazon Simple Queue Service (Amazon SQS) queue.

#### Mock

Mock lets API Gateway return a response without sending the request further to the backend.
This is a good idea for a health check endpoint to test your API. Anytime you want a
hardcoded response to your API call, use a Mock integration.

#### VPC Link

With VPC Link, you can connect to a Network Load Balancer to get something in your
private VPC. For example, consider an endpoint on your EC2 instance that’s not public.
API Gateway can’t access it unless you use the VPC link and you have to have a Network Load Balancer on your backend.

For an API developer, a VPC Link is functionally equivalent to an integration endpoint.

## Knowledge check

Which of the following statements are true?
If you choose to configure resource as a proxy, it will automatically create a special HTTP method called ANY.
Integration options include Lambda Function, HTTP Endpoint, AWS Service, Mock, and VPC Link.

### Simplify version management with stage variables

As you define variables in the stage settings in the console, you can reference them
with the **$stageVariables.[variable name]** notation. You can also inject stage-dependent
items at runtime such as: URLs, Lambda functions, Any necessary variables

### Building and deploying best practices

Now that you understand how to build and deploy an API into API Gateway, here are some
best practices for you to consider using in your API Gateway architecture.

### Use API Gateway stages with Lambda aliases

To highlight something that was mentioned in the previous example, Lambda and API Gateway
are both designed to support flexible use of versions. You can do this by using aliases in
Lambda and stages in API Gateway. When you couple that with stage variables, you don't have
to hard-code components, which leads to having a smooth and safe deployment.

- In Lambda, enable versioning and use aliases to reference.
- In API Gateway, use stages for environments.
- Point API Gateway stage variables at the Lambda aliases.

### Use Canary deployments

With Canary deployments, you can send a percentage of traffic to you 'canary' while leaving
the bulk of your traffic on a known good version of your API until the new version has been verified.

Consider you want to add a new GET method to a petStore API with a **/store/products** API
resource without impacting clients. To do this, you can create a canary that sends 10 percent of traffic to
the canary with the new method.

![Canary deployments](/assets/canary-deployments.png)

### Using AWS SAM templates

AWS SAM provides templates that help you define your serverless applications.
These template specifications provide you with a straightforward and clean syntax to
describe your functions, APIs, permissions, configurations, and events.
You use an AWS SAM template file to operate on a single, deployable, versioned entity
that makes up your serverless application.

AWS SAM is an extension of AWS CloudFormation, so it gives you the deployment
capabilities and the full suite of resources available in CloudFormation.
The AWS SAM template file closely follows the format of a CloudFormation template file.

### Use Swagger and OpenAPI for more complex APIs

AWS SAM also supports OpenAPI to define more complex APIs. This can either be 2.0 for
the Swagger specification, or one of the OpenAPI 3.0 versions, like 3.0.1. OpenAPI is an
industry-standard way to document and design your APIs.

With SAM, you can document your API in an external OpenAPI or Swagger file, and then reference that in a SAM template.

## Managing API Access

API Gateway provides you with multiple, customizable options for:

- Authorizing an entity to access your APIs
- Providing more granular control
- Controlling the amount of access through throttling

### Authorization and authentication comparison

|                           | Authentication | Authorization | Signature V4 | Cognito User Pools | Third-party auth | Multiple Header Support | Additional Costs                       |
| ------------------------- | -------------- | ------------- | ------------ | ------------------ | ---------------- | ----------------------- | -------------------------------------- |
| AWS IAM                   | ✅             | ✅            | ✅           |                    |                  |                         | None                                   |
| Lambda Authorizer Token   | ✅             | ✅            |              | ✅                 | ✅               |                         | Pay per authorizer invoke              |
| Lambda Authorizer Request | ✅             | ✅            |              | ✅                 | ✅               | ✅                      | Pay per authorizer invoke              |
| Amazon Cognito            | ✅             | ✅            |              | ✅                 |                  |                         | Pay based on your monthly active users |

### Authorization for API Gateway

As shown in the comparison table, there are three main ways to authorize API calls to your API
Gateway endpoints:

1. Use IAM and Signature version 4 (also know as Sig v4) to authenticate and authorize
   entities to access your APIs
2. Use Lambda Authorizers, which you can use to support bearer token authentication
   strategies such as OAuth or SAML
3. Use Amazon Cognito with user pools.

#### Authorizing with IAM

![IAM authorizer](/assets/iam-authorizer.png)

1. When you turn on IAM authorization, all request are required to be signed using
   the AWS Version 4 signing process
2. The process uses your AWS access key and secret key to compute an HMAC signature
   using SHA 256. You can obtain these keys as an IAM user or by assuming an IAM role
3. The key information is added to the Authorization header and behind the scenes,
   API Gateway will take that signed request, parse it, and determine whether the user
   who signed the request has the IAM permissions to invoke your API

If not, API Gateway will simply deny and reject that request. So for this type of
authentication, your requestor must have AWS credentials

#### Lambda Authorizers

![Lambda authorizers](/assets/lambda-authorizers.png)

1. A Lambda Authorizer is a Lambda function that you can write to perform any custom
   authorization that you need. There are two types of Lambda Authorizers: Token and Request
2. When a client calls your API, API Gateway verifies whether a Lambda Authorizer is
   configured for the API method. If so, API Gateway calls the Lambda function.
3. In this call, API Gateway supplies the authorization token (or the request parameters
   based on the type of authorizer), and the Lambda function returns a policy that allows or
   denies the caller's request
4. API Gateway also supports an optional policy cache that you can configure for your
   Lambda Authorizer. This feature increases performance by reducing the number of invocations
   of you Lambda Authorizer for previously authorized tokens. With this cache, you can configure
   a custom TTL.

##### Lambda Authorizer token types

For token-type Lambda Authorizers, API Gateway passes the source token to the Lambda
function as a JSON input. Based on the value of this token, your Lambda function will
determine whether to allow the request

![Token type Lambda authorizer](/assets/token-type-lambda-authorizer.png)

1. API Gateway passes the source token to the Lambda function as a JSON input. Based on the
   value of this token, your Lambda function will determine whether to allow the request.

1. If the authorizer function allows the request, it will return an IAM policy
   that allows **execute-API:Invoke** on the particular API resources that you specified.

This lets a caller invoke the specified methods that are defined in the API in the JSON output.

If your Lambda function denies the request, you'll need to return a JSON policy
document that denies access to the API methods and resources specified

In this case, the client receives a 403 error.

##### Lambda Authorizer request types

![Request type Lambda authorizer](/assets/request-type-lambda-authorizer.png)

1. With request-type authorizers, you can include additional payload in the JSON
   input to your Lambda function. So if you want to make authorizations that are based
   on information found in the request header, query string parameters, or the body of
   the request, use the REQUEST type
2. The Lambda function of the REQUEST authorizer type verifies the input request
   parameters and returns an Allow IAM policy on a specified method. Otherwise, the
   authorizer function returns an Unauthorized error, without generating any IAM policy

### Cognito Authorizers

![Cognito authorizer](/assets/cognito-authorizer.png)

1. Cognito user pools provide a set of APIs that you can integrate into your
   application to provide authentication. User pools are intended for mobile or web
   applications where you handle user registration and sign-in directly in the application.
   In addition, with Cognito, you can create your own OAuth 2 resource servers and define custom scopes within them.

1. To use an Amazon Cognito user pool with your API, you must first create an
   authorizer of the COGNITO_USER_POOLS authorizer type, and then configure an API method
   to use that authorizer.

1. After a user is authenticated against the user pool, they obtain an OpenID Connect (OIDC) token
   formatted in a JSON web token. Users who have signed in to your application will have tokens
   provided to them by the user pool. Then that token can be used by your application to
   inject information into a header in subsequent API calls that you make against your API Gateway endpoint.

## Knowledge check

_IAM Authorizer_ - All requests are required to be signed using AWS Sig. v4
_Lambda authorizer_ - Amazon API Gateway supplies an authorization token to a Lambda fucntion
_Cognito Authorizer_ - After user is authenticated against the user pool, they obtain an OIDC token

### Throttling and usage plans

Beyond just allowing or denying access to your APIs, API Gateway also helps you manage the
volume of API calls that are processed through your API endpoint
