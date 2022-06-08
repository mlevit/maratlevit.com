---
title: 'Creating a virtual data warehouse in Redshift'
date: '2020-08-16'
tags: ['AWS', 'Redshift', 'Data Warehouse']
draft: false
summary: ''
---

![](https://miro.medium.com/max/1400/0*GNZFy3EqtfUV73sf)

Photo by R Mo on Unsplash

With the introduction and [general availability of materialized views](https://aws.amazon.com/about-aws/whats-new/2020/03/amazon-redshift-introduces-support-for-materialized-views/), I wanted to explore the possibility of creating “virtual” data warehouses. By virtual, I am referring to a warehouse that is built without ETL tools (i.e., Talend, Informatica, dbt, or Dataform for that matter).

Now obviously the entire warehouse can’t be completely virtual, we still generally recommend organisations build integration layers (something along the lines of Data Vault) but in all honesty, you could bypass that if you’re not integrating many source systems and if your organisation is not likely to change its core systems/ways of working.

## The data warehouse

Let’s briefly introduce a typical data warehouse architecture.

![](https://cdn-images-1.medium.com/max/6252/1*mDzhxcs5th_zvrinH5QFIA.png)

A typical warehouse consists of three layers, staging, integration, and presentation. All data for the warehouse is sourced from our data lake and made available for consumption within the presentation layer.

Now let’s overlay the above with the appropriate AWS services.

![](https://cdn-images-1.medium.com/max/6252/1*cSnuBs0sWKFP40Bq7Zs0bQ.png)

Our data lake is, of course, Amazon S3 (no surprises there), our staging layer is not actually physicalised within Redshift but actually just [Redshift Spectrum querying our Amazon S3 data lake](https://aws.amazon.com/blogs/big-data/amazon-redshift-spectrum-extends-data-warehousing-out-to-exabytes-no-loading-required/), the integration layer (if required) is comprised of tables within Redshift and finally, we have our presentation layer. Up until this point, the presentation layer has always been physicalised (think tables)… but now we can actually virtualise it without compromising on performance thanks to materialized views.

## The solution

I created a simple database within Redshift to learn about and understand materialized views. I converted MySQL’s Sakila database to Redshift ([found here on GitHub](https://github.com/servian/sakila-db-redshift)) for use in this solution.

The solution consists of one fact, rental, and four dimension tables, customer, film, staff and store. For those visual learners out there, he’s a crummy ER diagram :)

![](https://cdn-images-1.medium.com/max/4572/1*N5l122eErDIko0wQjjp65g.png)

This is the point where we begin to utilise the materialized views. Instead of typically using tables for our dimensions and facts, we instead create five materialized views. Below you’ll find an example of fact_rental and dim_customer.

![](https://cdn-images-1.medium.com/max/8000/1*v5ASR9R6tXl8QB4wVlI_vQ.png)

As you can see, materialized views act similarly to tables, [they can be distributed and sorted](https://docs.aws.amazon.com/redshift/latest/dg/materialized-view-create-sql-command.html) to ensure performant joins and queries.

To refresh the data within the materialized view, you simply run REFRESH MATERIALIZED VIEW sakila.fact_rental and Redshift will perform either an incremental refresh or a full refresh depending on the SQL constructs used within the view. This is all handled automatically by Redshift.

> In many cases, Amazon Redshift can perform an incremental refresh. In an _incremental refresh_, Amazon Redshift quickly identifies the changes to the data in the base tables since last refresh and updates the data in the materialized view.

~ [REFRESH MATERIALIZED VIEW](https://docs.aws.amazon.com/redshift/latest/dg/materialized-view-refresh-sql-command.html)

Refreshing the data within the views should be built into your data processing pipeline. Once the previous layers have been populated (new data has been ingested) a simple refresh call is made to update the presentation layer. No ETL processes, no data pipelines.

The final step is to create one denormalized view for easier consumption by our consumers (this is where distribution plays an important role, see [Amazon Redshift Performance Standards for Data Vault](https://medium.com/weareservian/amazon-redshift-performance-standards-for-data-vault-c3774139567) for tips).

![](https://cdn-images-1.medium.com/max/4568/1*t5X3ayG4lGbiPXIA6LSoyg.png)

## Final thoughts

Firstly, please don’t hang me for the not-so-realistic dimensions and facts. Yes they’re not perfect, yes there are no point-in-time joins etc :) It’s just an example.

Secondly, Redshift’s implementation of materialized views is actually quite mature. **There’s no auto-refresh of data (would be nice to see), but the fact that it allows joins between tables already puts it head and shoulders above its main competitors (i.e., Snowflake & BigQuery)**.

Thirdly, the use of Redshift Spectrum to create a virtual staging layer and materialized views to create a virtual presentation layer reduces data engineering effort and increases data delivery velocity. That’s a win-win in anyone's books.
