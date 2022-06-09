---
title: 'Finding the right AWS compute service for your workload'
date: '2021-12-06'
tags:
  [
    'AWS',
    'compute',
    'decision tree',
    'analytical',
    'application',
    'machine learning',
    'open source',
  ]
draft: false
images: 'https://cdn-images-1.medium.com/max/11520/0*iBmg2h8ZKovKWHCi'
summary: 'Version 2, harder, better, faster, stronger.'
---

![Photo by [veeterzy](https://unsplash.com/@veeterzy?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)](https://cdn-images-1.medium.com/max/11520/0*iBmg2h8ZKovKWHCi)
_Photo by [veeterzy](https://unsplash.com/@veeterzy?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)_

In April of 2020, I decided to tackle a long-standing problem with AWS: how does one decide on the appropriate service for their undertaking? To “solve” or at the very least assist with this problem, I released the [AWS Compute Decision Tree](https://servian.dev/choosing-a-suitable-aws-compute-product-a-decision-tree-1dc46caef824). The decision tree requires you, the reader, to answer a bunch of questions until you finally reach a recommended AWS service.

The original decision tree was by no means perfect. Several workloads were missing, some decision lines were just plain invalid, and as always, AWS released a slew of new services which the tree doesn’t cater for. So, I decided to take another stab and create version 2.

## What’s changed?

The underlying premise is exactly the same. You still have three streams, analytics, application, and machine learning. You still answer a bunch of questions, and you still get those sweet sweet AWS service recommendations at the end.

But, a few things have changed.

### Streaming

The original tree didn’t cater for streaming workloads. It’s quite a significant oversight but one that has now been addressed. I’ve added Amazon Kinesis Data Analytics, AWS Glue, and Amazon EMR to support streaming workloads using either SQL or PySpark. Pick your poison.

### Serverless

re:Invent 2021 released a whole host of serverless services, including but not limited to Amazon Redshift Serverless and Amazon EMR Serverless. Again, we’ve updated the decision tree to differentiate between the serverfull and serverless variants.

### Edge Compute

Whilst still nowhere near complete, I’ve finally added some edge compute capabilities through the use of AWS Panorama and AWS IoT Greengrass.

Future iterations would possibly add AWS Outpost, AWS Snowball, AWS Snowcone and more. I’m no edge compute specialist, so I’d rather not rush this one.

## It comes in two flavours!

The original decision tree was a single PDF that was reasonably easy to consume but hard to maintain. Version 2 tries to solve this by creating three draw.io diagrams (one for each stream) as well as a choose your own adventure style storyboard.

So now, without further ado:

### Application

![AWS Application Compute Decision Tree](https://cdn-images-1.medium.com/max/8248/1*2tWWOM2bvQuxmd9p4j014w.png)_AWS Application Compute Decision Tree_

### Analytics

![She’s a big one… AWS Analytics Compute Decision Tree](https://cdn-images-1.medium.com/max/9632/1*wfUV6PyVytxS3ngbtIXiJA.png)_She’s a big one… AWS Analytics Compute Decision Tree_

### Machine Learning

![AWS Machine Learning Compute Decision Tree](https://cdn-images-1.medium.com/max/8328/1*1lgOBWbmaqV--lfm323X0g.png)_AWS Machine Learning Compute Decision Tree_

### Choose your own adventure

You’re going to love this one. Head on over and play what is probably the least exciting choose your own adventure game :)

[AWS Compute Decision Tree Story Board](https://storyboard.viget.com/aws-compute-decision-tree-2)

## I’ve open-sourced it!

I decided to open-source the decision tree. Do I hope someone will contribute? A little. Do I think people will? Probably not. But that’s OK. Whatever makes it easier for people to find, share, get value, or even modify for themselves is a win in my book.

If you’d like to contribute, provide commentary, or star the repo to get notified of any changes, head on over to: [servian/aws-compute-decision-tree](https://github.com/servian/aws-compute-decision-tree)

I had fun updating the tree and adding support for new and missing services. If you have any feedback, comments or suggestions, please let me know in the comment section below or raise them as an Issue in GitHub.
