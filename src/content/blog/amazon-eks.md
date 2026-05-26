---
title: Amazon Elastic Kubernetes Service
description: A brief of Amazon EKS
pubDatetime: 2026-04-23
tags:
  - aws
  - Amazon EKS
---

# Amazon EKS

Creates and manages the Kubernetes control infrastructure for you across
multiple AWS Availability Zones to eliminate a single point of failure. In
addition to managing the control plan, Amazon EKS can manage elements of the data
plane (worker nodes), if you choose.

Amazon EKS is tightly integrated with other AWS services and features,
such as Elastic Load Balancing for load distribution, AWS Identity and Access
Management (IAM) for role-based access control, and Amazon Virtual Private
Cloud (Amazon VPC) for pod networking.

AWS actively works with the Kubernetes community, including making
contributions to the Kubernetes code base that help Amazon EKS users take
advantage of AWS services and features.

Amazon EKS runs native, upstream Kubernetes. It is certified to be
Kubernetes-confromant, so you can use all the existing plugins and tooling from
the Kubernetes community. Applications running on Amazon EKS are fully compatible
with applications running on any standard Kubernetes environment. You can migrate
any standard Kubernetes application to Amazon EKS without needing to refactor your code.

# Kubernetes Review

Kubernetes objects

_Cluster_: A set of worker machines, called nodes, that run containerized
applications. Every cluster has at least one worker node. A cluster also has a
control plane that runs services that manage the cluster.

Control Pane -> It is the manager that has at least one cluster

_Node_: Kubernetes runs your workload by grouping containers into pods and
assigning those pods to run on nodes. A node can be a virtual or physical machine,
depending on the cluster. Each node is managed by the control plane and contains the
services necessary to run pods.

_Pod_: A group of one or more containers. Pods are defined by a PodSpec file,
a specificaction for how to run the containers. Pods are the basic building block
within Kubernetes for deployment, scaling, and replication

_Ephemeral volume_: Applications in a pod have access to shared volumes to facilitate
data sharing in the pod and persistence of data across container restarts. When a pod
ceases to exist, Kubernetes destroys ephemeral volumes.

_Persistent volume_: A persistent volume functions similarly to an ephemeral volume but
has a life cycle independent of any individual pod that uses them. Persistent volumes
are backed by storage subsystems independent of cluster nodes.

_Service_: In Kubernetes, a service is alogical collections of pods and a means to access
them. The service is continually updated with the set of pods available, eliminating the need
for pods to track other pods

_Namespace_: A virtual cluster that is backed by the same physical cluster. Physical clusters
can have resources with the same name as long as they are in different namespaces.
Namespaces are especially useful when you have multiple teams or projects using the same cluster.

_ReplicaSet_: Ensures that a specific number of pod replicas are running at any given time

_Deployment_: Owns and manages ReplicaSets or individual pods. You can describe a desired state
in the deployment. The deployment then changes the actual state of the cluster to the desired
state at a controlled rate.

_ConfigMap_: A ConfigMap is an API object that stores nonconfidential data as key-value
pairs used by other Kubernetes objects, such as pods. Use ConfigMap to follow the
best practice of protability by separating your configuration data from your
application code.

_Secrets_: All confidential data, such as AWS credentials, should be stored
as Kubernetes secrets. Secrets restrict access to sensitive information. Optionally,
encriptation can be turned on to improve security.

**Pod scheduling**

You can schedule pods with the Kubernetes scheduler. The scheduler checks the resources required
by your pods and uses that information to influence the scheduling decision. The scheduler runs
a serie of filters to exclude ineligible nodes for pod placement

**Control plan and data plane**

_Control plan_: Control plane nodes manage the worker nodes and the pods in the cluster.

_Data plane_: Worker nodes host the pods that are the components of the application workload

Kubernetes service is logical collection of pods and a means to access them

This amazon provide

Control plane:

- Control plane nodes
- etcd - key:value
- controller manager
- cloud controller
- scheduler
- api server

My control:
Data Plane

- worker nodes
- kube proxy
- docker
- kubelete
- pod

# Kubernetes EKS control plane

**Amazon EKS API**
You use the amazon EKS API for anything that Amazon EKS manages.

As you have learned, this includes entire control plane (creating and managing
the cluster). In the later modules, you learn how Amazon EKS can also manage
parts of the data plane using features such as managed node groups and
AWS Fargate.

| Task                                   | Sample Command                                                           |
| -------------------------------------- | ------------------------------------------------------------------------ |
| Create a cluster                       | eksctl create cluster                                                    |
| Delete a managed node group            | eksctl delete nodegroup --cluster=${clusterName} --name=${nodegroupName} |
| Get the Fargate profile of the cluster | eksctl get fargateprofile --cluster ${clusterName}                       |

**Kubernetes API**

Use the Kubernetes API for managing Kubernetes objects such as pods, deployments, and namespaces.

| Task                                         | Command Example                    |
| -------------------------------------------- | ---------------------------------- |
| Get a list of pods in the default namespace  | kubectl get pods                   |
| Get a list of namespaces                     | kubectl get namespaces             |
| Create a deployment in the default namespace | kubectl apply -f nginx-deploy.yaml |

# Amazon EKS data plane

Why have Amazon EKS manage your data plane?
Managing a complex infrastructure of many worker nodes and worrying about
automatic scaling and updates is challenging. Additionally, you may have many
different teams provisioning nodes in a cluster, and they might all be doing it
differently. These differences make standardization difficult.

By allowing Amazon EKS to manage some or all of your data plane, you can
simplify your infrastructure and maintain standardization

## Self-managed nodes

Only the control plane is managed by Amazon EKS. You completely control and
manage your data plane nodes (including provisioning, updating, monitoring,
and other tasks)

## Managed node groups

Managed node groups use the Amazon EKS API to start and manage the Amazon
Elastic Compute Cloud (Amazon EC2) instances that run containers for an Amazon
EKS cluster. Although the managed node groups are started and managed for you,
you can still see all the resources being used in your AWS account, such as EC2
instances and Auto Scaling groups. You still get all the control, security, and
visibility, with less work.

**Provisioning**: With one command, deploy a managed node group. Amazon EKS then
creates nodes using the latest Amazon EKS optimized Amazon Machine Images (AMIs).
The AWS service deploys them into multiple Availability Zones and backs them with
an Auto Scaling group. You can change the scaling parameters.

**Managing**: Amazon EKS takes care of health monitoring of your managed node
groups. Amazon EKS automatically informs you of issues, including required
resources that are being deleted, are unreachable, or are unavailable. Amazon
EKS also informs you of update issues, limits that are exceeded, and creation or
deletion failures. You also can obtain logs from node-level Secure Shell (SSH)
access, open source log routers, or Amazon CloudWatch. All managed node group
events are also recorded in AWS CloudTrail.

**Updating**: With one command, you can update a managed node group when needed.
Amazon EKS then handles the termiantion of the nodes for rolling updates and
automatically updates to the latest AMI version for your Kubernetes version.

**Scaling**: Managed node groups take care of scaling your nodes for you. However,
you still have control of the scaling parameters, such as Kubernetes labels, AWS
tags, and the size of the node groups.

**Tooling**: Youc an ese eksctl to provision managed node groups

## AWS Fargate

With managed node groups, you spend less time on infrastructure management. But
maybe you want to focus on creating your applications and have Amazon EKS fully
manage your data plane. You can do this by running your pods on Fargate.

Fargate manages the complete infrastructure of your Kubernetes data plane. You
need to worry only about running your pods.

- Native - Fargate runs native Kubernetes pods. No need to change or configure anything for AWS.
- Rightsized - Fargate dynamically provisions the resources you need for your pods and resources; no more, no less.
- Fast an simple - Fargate quickly scales for you. No need to set up a cluster autoscaler.
- Optimized - You pay onlky for the pods when they run and you get pod-level billing visibility.

## Using Fargate

To use Fargate with Amazon EKS, you must create Fargate profiles.

Fargate profiles scpecify which pods should be scheduled on Fargate. You can
choose to run all your pods on Fargate or only some. Fargate profiles use selectors,
which include a namespace and labels. Any pods that match the namespace and all
the labels of a selecto rin the profile are scheduled with Fargate.

Fargate profiles also specify the (private) subnets the pods will be launched into and the podExecutionRole, the IAM role that determines the permission the pod has to make calls to AWS APIs. This IAM role is also added to Kubernetes role-based access control (RBAC) for authorization.

|                | Unmanaged Nodes | Managed Nodes        | Fargate         |
| -------------- | --------------- | -------------------- | --------------- |
| Units for work | Pod and EC2     | Pod and EC2          | Pod             |
| Unit of charge | EC2             | EC2                  | Pod             |
| Host lifcycle  | Customer        | AWS (SSH is allowed) | No visible host |
| Host:Pods      | 1 : many        | 1 : many             | 1 : 1           |

Which API Should you use?

Amazon EKS API

- Create cluster
- Delete a managed node group
- Get the Fargate prfoile

Kubernetes API

- Create a deployment
- Get all the namespaces
