---
title: 'Automated AWS Resource Cleanup'
date: '2019-04-15'
tags: ['AWS', 'application', 'serverless', 'open source', 'cleanup']
draft: false
images: 'https://cdn-images-1.medium.com/max/12032/0*byh2t-TLH3zDjk0K'
summary: 'Auto Cleanup is an open source application built on the Serverless Framework'
---

![Photo by [Samantha Gades](https://unsplash.com/@srosinger3997?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)](https://cdn-images-1.medium.com/max/12032/0*byh2t-TLH3zDjk0K)
_Photo by [Samantha Gades](https://unsplash.com/@srosinger3997?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)_

At [Servian](https://www.servian.com/cloud/), we have close to 10 AWS accounts. Some are production accounts for our clients, others are for hosting our own internal applications and the remainder exist for consultant upskilling, experimentation, training, and presales activities.

A big problem with giving our consultants nearly free rein over our AWS accounts is having to deal with a lot of abandoned AWS resources that end up costing Servian hundreds if not thousands of dollars every month. One can argue that each and every consultant is responsible for tearing down whatever resources they stood up in the first place, but the burden of payment is still on Servian to bear.

Enter Auto Cleanup. A serverless application built using the [Serverless Framework](https://serverless.com/).

![Auto Cleanup AWS architecture](https://cdn-images-1.medium.com/max/2000/1*CppFNHrSFvugQR7IKshsgg.png)_Auto Cleanup AWS architecture_

In simple terms, Auto Cleanup will scan your account’s AWS resources (currently supports CloudFormation, DynamoDB, EC2, Lambda, RDS, and EC2). Once the application finds old abandoned resources, it promptly removes them from your account. In case users wanted to ensure certain resources are not removed, they can simply add them to the whitelist table.

To get started, simply head over to the GitHub page below and follow the installation instructions.

[servian/aws-auto-cleanup](https://github.com/servian/aws-auto-cleanup)
