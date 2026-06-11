---
title: Elevator Pitch
description: Personal elevator pitch and interview stories using CAR and STAR frameworks.
pubDatetime: 2026-06-11T00:00:00Z
tags:
  - career
  - interview
  - communication
draft: true
---

# Elevator Pitch

Hi, my name is Allan Gallo. I'm a Software Engineer with more than 13 years of professional
experience building backend and frontend applications, APIs, integrations, and cloud-based solutions.

I spent nearly 9 years at Universidad del Valle de Guatemala, where
I worked on software development, infrastructure initiatives,
Microsoft technologies, and cross-functional projects involving academic,
administrative, and financial systems. During that time, I also took leadership
responsibilities, including recruiting engineers, mentoring team members,
coordinating projects, and participating in technical decision-making.

For the last 4 years, I've been working at 3Pillar, building cloud-native
applications and enterprise solutions using technologies such as Node.js, React,
Python, AWS, PostgreSQL, and serverless architectures. My work has focused on
scalable APIs, system integrations, process automation, and business-critical applications.

One of my strengths is understanding both the technical and business sides of
a problem. For example, while investigating a production issue in a logistics platform,
I discovered an opportunity to simplify the shipment process by redesigning how truck
records were created. The solution improved data consistency, reduced unnecessary
database records, and simplified the overall workflow.

I'm passionate about clean architecture, API design, cloud technologies,
and building solutions that create measurable business value. More recently,
I've also been expanding my knowledge in AI-related technologies and modern software engineering practices.

# Project using CAR Frameworks

## Context

One project I worked on was an implementation between our internal academic system
and the Canvas LMS platform to synchronize student grades and academic
information.

The business problem was that grades were being managed across different
systems, which created delays, inconsistencies, and manual work for teachers and
academic staff.

The objective of the project was to automate and centralize the synchronization
process between Canvas LMS and our internal platform so that student information
and grades could be updated more efficiently and reliably.

My main stakeholders included teachers, academic directors, and internal
administrative teams. I worked closely with them to understand how grades were
managed, how synchronization should behave, and what business rules needed to
be applied.

I was also responsible for communicating progress, discussing technical limitations,
and validating changes during the project lifecycle through regular meetings and
feedback sessions

## Action

My main responsibility was leading the technical analysis and backend
implementation of the integration.

I gathered requirements directly from academic stakeholders and analyzed the APIs
provided by Canvas LMS to understand the available data and synchronization
capabilities.

I created the project backlog, defined priorities, and organized development tasks to
ensure incremental delivery.

On the technical side, I designed and implemented the synchronization process
between systems, including handling student grades, validation rules, and data
consistency.

Initially, we implemented the integration using the REST APIs provided by Canvas
LMS. Later, after identifying performance limitations and synchronization delays,
I proposed migration part of the integration to GraphQL API to optimize data retrieval
and reduce synchronization times.

Throughout the project, I had to balance technical priorities with academic deadlines
because synchronization periods were critical during grading cycles.

I also worked proactively with stakeholders to validate edge cases and ensure the
integration aligned with real academic processes.

## Result

The project successfully automated the synchronization of grades between systems,
reducing manual work and improving data consistency for teachers academic
staff.

After moving part of the integration to GraphQL, synchronization times improved
significantly, allowing data updates to happen faster and more efficiently.

The integration also reduced operational issues caused by manual data handling and
improved visibility of academic information across departments.

From a technical perspective, the project improved system scalability and created
a more maintainable integration architecture for future academic features.

## Context

I was investigating a production bug related to shipment processing. During the investigation, I discovered that trucks could be created through two different channels: the web administration portal and the mobile application. Although both creation flows generated trucks with the same structure, there were inconsistencies because the system ultimately returned only a single truck at the shipment level.

## Action

I analyzed the database, reviewed both creation workflows, and traced how truck records were being used throughout the shipment lifecycle. During that analysis, I realized the system was creating truck records for every order, even though the business process only required a truck at the shipment level. I proposed simplifying the process by moving truck creation from the order level to the shipment level and worked with the team to implement the change.

## Result

The change eliminated unnecessary truck records, resolved inconsistencies between the web and mobile workflows, improved data integrity, and simplified the shipment process.

What started as a bug investigation became a process improvement initiative. By understanding the business workflow instead of only fixing the symptom, we were able to simplify the architecture and remove unnecessary complexity from the system.

# STAR resumido para memorizar

## Situation

I was investigating a production issue in a logistics platform where truck information was inconsistent between web and mobile workflows.

## Task

My goal was to identify the root cause of the issue and ensure data consistency across the shipment process.

## Action

I analyzed the database model, reviewed both creation flows, and discovered that the system was creating truck records at the order level even though the business process only required a truck at the shipment level. I proposed a redesign and worked with the team to implement it.

## Result

We eliminated unnecessary records, improved data consistency, simplified the architecture, and reduced future maintenance effort.
