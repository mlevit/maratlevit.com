---
title: '(R)Evolution of Redshift in 2019'
date: '2019-12-04'
tags: ['AWS', 'Amazon Redshift', 'cloud', 'data warehouse', 'data']
draft: false
summary: ''
---

![](https://miro.medium.com/max/1400/0*DohoWSuS2wqCw7-n)
_Photo by Rishi Deep on Unsplash_

After another great keynote from Andy Jassy, I decided to recap and provide my opinions on the recent Redshift announcements in 2019, including the latest from the keynote this morning.

### RA3 nodes with managed storage ([link](https://aws.amazon.com/about-aws/whats-new/2019/12/amazon-redshift-announces-ra3-nodes-managed-storage/))

RA3 nodes are high performing compute nodes with relatively small local SSD storage used for local caching. The remainder of your data is stored on S3.

> RA3 nodes enable you to scale and pay for compute and storage independently allowing you to size your cluster based only on your compute needs.

**Opinion** — While this is a step in the right direction (i.e., separation of compute and storage), there are still several drawbacks compared to its competition.

- A single RA3 compute node has 48 vCPU’s, 384 GiB of RAM and 64TB of storage. This is a significant node, and you need a minimum of two to run an RA3 cluster. Looking at the Australian market (where I work) there aren’t many (if any) companies that would have anywhere near 128TB of structured data.

- Technically what AWS is offering here is more storage per compute unit (vCPU). They’re not offering a complete solution that enables infinite stored without scaling compute as each R3A node can reference a maximum of 64TB of storage.

- Scaling a cluster or “pausing” a cluster has not been addressed either. Therefore you’re still limited to a slow and tedious classic scale or a quick but limited elastic scale.

### Federated Query ([link](https://aws.amazon.com/about-aws/whats-new/2019/12/amazon-redshift-federated-query-preview/))

Utilising psql customers could query Redshift from their PostgreSQL databases. However useful it was, AWS decided to flip that around and finally offer the opposing option. Federated Querying enables Redshift to query data directly from Amazon RDS PostgreSQL and Amazon Aurora PostgreSQL

**Opinion** — This is a compelling and useful feature that will only improve as more database engines are added.

- Reduces the number of ETL workloads organisations need to build to extract data from their operational databases.

- Data warehouses are generally accompanied by control frameworks — a set of tables that control and audit the loading of a data warehouse. Having the ability to join the two together enables DevOps teams to quickly and easily match data warehousing records with their respective audit records from the control framework.

### Data Lake Export ([link](https://aws.amazon.com/about-aws/whats-new/2019/12/announcing-amazon-redshift-data-lake-export/))

Unloaded Redshift data into S3 has been around forever. However, your only option was CSV. Today that changed as Parquet (a data lake friendly columnar file format) become available.

**Opinion** — It’s a great addition but not one worth a shout out at a re:Invent keynote.

## Pre re:Invent

There were several Redshift releases leading up to re:Invent that are worth looking into with plenty of quality-of-life changes.

### Materialized Views ([link](https://aws.amazon.com/about-aws/whats-new/2019/11/amazon-redshift-introduces-support-for-materialized-views-preview/))

Hallelujah, we have materialized views. Materialized views store pre-computed queries decreasing query times for ETL and BI workloads. Materialized views are also self-updating when underlying data sources change. Thus providing you with the benefit of both a view (always up to date data) and a table (physical data source).

**Opinion** — There’s very little to fault here. Unlike Snowflake, Redshift’s materialized views are capable of table joins (i.e., querying multiple tables). Materialized views with table joins enables organisations to build out virtual presentation layers (think dimensions and facts) straight off their integration layer. No need to build, orchestrate, and run ETL workflows to load your presentation layer. Plus, as the underlying data changes, your presentation is automatically updated.

### Automatic Table Sort ([link](https://aws.amazon.com/about-aws/whats-new/2019/11/amazon-redshift-introduces-automatic-table-sort-alternative-vacuum-sort/))

Sort keys on a table enhance the speed at which Redshift is capable of filtering your data set before returning the final result to you. A general rule of thumb to follow is to sort on the column(s) that your customers filter on (think where clause).

**Opinion** — Knowing the column or combination of columns to sort on is harder than you think. Having this taken over by Redshift and updated for me automatically is a win in my books.

### Console UI Refresh ([link](https://aws.amazon.com/about-aws/whats-new/2019/11/amazon-redshift-announces-console-refresh-to-improve-management-and-monitoring-of-data-warehouse/))

![](https://cdn-images-1.medium.com/max/5528/1*85M9QKcrTshfllhqcH-qpw.png)

The new console user interface is a breath of fresh air. It’s clean, it’s modern, and best of all it easy to use. You can see everything you need to about your Redshift cluster(s) and with the [Query Editor](https://aws.amazon.com/about-aws/whats-new/2018/10/amazon_redshift_announces_query_editor_to_run_queries_directly_from_the_aws_console/), you can execute queries directly against your Redshift cluster.

**Opinion** — I don’t have much to say here. AWS has done a great job modernising the user interface, and they should be applauded for that.

### AZ64 Compression ([link](https://aws.amazon.com/about-aws/whats-new/2019/10/amazon-redshift-introduces-az64-a-new-compression-encoding-for-optimized-storage-and-high-query-performance/))

Compression is critically essential to the performance of any data store, be it a data lake, database or a data warehouse. AWS has developed a proprietary column compressed algorithm called AZ64. According to AWS, it’s miles ahead of the competition:

> _Compared to RAW encoding, AZ64 consumed 60–70% less storage, and was 25–30% faster._ > _Compared to LZO encoding, AZ64 consumed 35% less storage, and was 40% faster._ > _Compared to ZSTD encoding, AZ64 consumed 5–10% less storage, and was 70% faster._

**Opinion** — I love it. The better the compression, the less space my data consumes and the faster my queries executes. I’d only wish Redshift would update my column compression for me when a better choice is available instead of just [informing me of a better option](https://docs.aws.amazon.com/redshift/latest/dg/r_ANALYZE_COMPRESSION.html).

### Automatic Workload Management

Workload management is key to a well functioning contention-free data warehouse. Set it up incorrectly, and every user is running against the same queue while a significant portion of your cluster goes unutilised.

> Automatic workload management (WLM) uses machine learning to dynamically manage memory and concurrency helping maximize query throughput.

**Opinion** — What’s not to like? This feature has been a long time coming, and it is finally here. Organisations no longer need database administrators to monitor and optimise Redshift workload queues to achieve optimal performance.

### Distribution Key Recommendation ([link](https://aws.amazon.com/about-aws/whats-new/2019/08/amazon-redshift-now-recommends-distribution-keys-for-improved-query-performance/))

If you’ve ever worked on a distributed data system before (think Hadoop, Spark, any MPP database) you would know that the key to achieving excellent performance is picking the right key to distribute your data on. Redshift is no different. Creating a table required a user to select a distribution strategy (be it a round-robin, attribute, or broadcast-based).

Identifying the right distribution strategy can sometimes be harder than it looks.

> Amazon Redshift Advisor now recommends the most appropriate distribution key for frequently queried tables to improve query performance. The Advisor generates tailored recommendations by analyzing the cluster’s performance and query patterns.

**Opinion** — AWS has done the hard yards here but stopped short. They’ve built a system to analyse and recommend optimal distribution keys, yet they decided to place the onus of altering the distribution key on the DBAs.

There has been no slowing down for AWS’s Redshift team. New features have been rolling out all year long, and the platform has only been improving. I look forward to the changes the team has in store for 2020.

If you’re interested in all Amazon Redshift feature releases in 2019 see the below link

[What’s New at AWS — Cloud Innovation & News](https://aws.amazon.com/new/?whats-new-content-all.sort-by=item.additionalFields.postDateTime&whats-new-content-all.sort-order=desc&wn-featured-announcements.sort-by=item.additionalFields.numericSort&wn-featured-announcements.sort-order=asc&whats-new-content-all.q=redshift&whats-new-content-all.q_operator=AND&awsf.whats-new-year=year%232019&awsf.whats-new-products=general-products%23amazon-redshift&awsm.page-whats-new-content-all=1)
