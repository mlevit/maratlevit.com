---
title: 'Event-driven Security Remediation with AWS Auto Remediate'
date: '2019-03-21'
tags: ['AWS', 'Redshift', 'Data Warehouse']
draft: false
summary: 'Open source application to instantly remediate common security issues through the use of AWS Config'
---

![Photo by [James Sutton](https://unsplash.com/@jamessutton_photography?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)](https://cdn-images-1.medium.com/max/10366/0*_ihgcqvBTiihuJ9j)
_Photo by [James Sutton](https://unsplash.com/@jamessutton_photography?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)_

[Jay Kim](undefined) and I have spent the last couple of weeks developing an open source application to help with automatic security remediation based on compliance events from AWS Config.

## What is Auto Remediate?

Auto Remediate is a serverless tool built on Lambda with the help of SQS, SNS, DynamoDB, CloudWatch, and Config all tied together with the [Serverless Framework](https://serverless.com/). This makes it completely serverless with the majority of costs coming from AWS Config (charged per rule per month).

![Auto Remediate’s serverless architecture](https://cdn-images-1.medium.com/max/3476/1*3S1HeWPn6WzQMn3Pl57M2A.png)_Auto Remediate’s serverless architecture_

Simply put, Auto Remediate fixes common security issues (such as a publically open port 22 or S3 Buckets with public read/write enabled) within minutes and sometimes even seconds.

Auto Remediate supports **24** of the 27 AWS Config Rules (created by AWS Security Hub). The 3 unsupported rules relate to the root account and cannot be remediated outside of it. These rules help you align your account with the [CIS AWS Foundations Benchmark](https://d1.awsstatic.com/whitepapers/compliance/AWS_CIS_Foundations_Benchmark.pdf)_._ A full list of supported AWS Config Rules can be found in the [README](https://github.com/servian/aws-auto-remediate#config-rules) and [COVERAGE](https://github.com/servian/aws-auto-remediate/blob/COVERAGE.md) documentation.

Auto Remediate isn’t the only tool in the market that solves security issues. There are tools such as [Netflix’s Security Monkey](https://github.com/Netflix/security_monkey) and [T-Mobile’s PacBot](https://github.com/tmobile/pacbot) that offer a similar solution. However, Auto Remediate’s simple design makes it another viable option in the security space. It is small, serverless, and can be deployed in minutes. Although it isn’t as polished as PacBot or as extensible as Security Monkey, it still gets the job done.

## So why do I need it?

With cloud adoption on the rise, developers are now able to leverage a whole gamut of services and offerings. This rapid growth also exposes developers to various security pitfalls that remain hidden initially and fixing them requires extensive manual intervention.

Auto Remediate aims at exposing and resolving hidden risks and provides us a guardrail against security threats such as misconfigured config files and open ports. This allows our security, infrastructure, and DevSecOps teams to focus on more valuable business aligned workloads.

## Sweet! How do I get started?

Head on over to our GitHub repo (below) to clone and deploy the tool in your environment.

[servian/aws-auto-remediate](https://github.com/servian/aws-auto-remediate)

If you’d like to contribute, we’re more than happy to accept community remediations via pull requests.
