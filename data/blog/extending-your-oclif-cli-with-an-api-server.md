---
title: 'Extending your oclif CLI with an API server'
date: '2021-12-14'
tags: ['oclif', 'api', 'Express.js', 'Node.js']
draft: false
summary: 'Two for the price of one baby!'
---

![Photo by [Najla Cam](https://unsplash.com/@najlacam?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)](https://cdn-images-1.medium.com/max/15054/0*EUaI_bq4AOza7Mx8)_Photo by [Najla Cam](https://unsplash.com/@najlacam?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)_

Recently I needed to build a CLI for one of my internally maintained Servian frameworks. Since the framework utilised [Knex.js](https://knexjs.org/), a Node.js SQL query builder, I was on the lookout for a tool that would help accelerate the development of the CLI tool.

Before I go on, a side note. I am in no way a Node.js developer. I know some JavaScript, and I can piece together Frankenstein's monsters for one purpose or another. Please don't judge ❤

## Let’s create the CLI

We’ll be using [oclif](https://oclif.io/) to do most of the heavy lifting here. oclif is a framework (open sourced by Heroku) that helps accelerate the development of Node.js based CLIs.

Let's start by creating a super simple CLI with oclif.

- Install oclif

  npm install -g oclif

- Create the CLI

![](https://cdn-images-1.medium.com/max/3588/1*1xvm2G9pzvlk-eqO5RlCfw.png)

- Install the new CLI

  cd mynewcli && npm install -g

- View the new CLI help menu (just cause)

![](https://cdn-images-1.medium.com/max/2616/1*zlRQu1xbq2vYipPMpwPV8g.png)

- Run the hello CLI command

![](https://cdn-images-1.medium.com/max/2832/1*15wdw82KZl2FY-iVNNXFhw.png)

And that’s it. Our new CLI is up and running. Next, we create the API.

## It's API building time! _cracks knuckles_

Now that your CLI is built and does… stuff, let's go ahead and create that API I’ve been promising.

### Create a new CLI command

We're going to be creating a new command within our CLI to start the API server. Yes, our CLI is also going to host and run our API. Inception!

- Create the new API command

![](https://cdn-images-1.medium.com/max/2940/1*vmJLt9W7dD81tfW600f-Ug.png)

- Run the new command

![](https://cdn-images-1.medium.com/max/3444/1*UFUI5uDJ12S4WrzE9ShZvg.png)

Could this get any easier? I think not!

### Creating an API server

Now that we have our new CLI command to start our API server, let's modify our command and make it the API of our dreams!

- Add an api flag to the hello command

We're going to add a new api flag and tweak some of the code to return the output instead of printing it to the screen. This allows the command to function as an API and a CLI.

Note: You could also use this opportunity to tweak your response for API or CLI outputs. I won't, but maybe you should.

![](https://cdn-images-1.medium.com/max/3048/1*37cdVwVyiV7U--bk21bdDg.png)

- Install [Express.js](https://expressjs.com/)

  npm install -s express

- Add Express.js to the api command

Let's add a single catch-all GET route. This route will take all GET requests sent to our new API, translate the request path into a Node.js classpath so we can require the hello.js file and finally execute the run method within each oclif command.

For more information on running oclif commands programmatically, [see this article](https://oclif.io/docs/running_programmatically).

![](https://cdn-images-1.medium.com/max/3192/1*VnzrakdLF48P2Q6zKU6xxg.png)

And with just that, we’ve created a single command that can handle all CLI commands.

- Start the API

![](https://cdn-images-1.medium.com/max/2760/1*itM2mdy4mLs7WRKoYpp5TQ.png)

- Head on over to http://localhost:3000/hello to see the API in action

![](https://cdn-images-1.medium.com/max/3176/1*XlJSCyV_Bb42b6FzwWy2Tw.png)

- Now, let's pass the name parameter the CLI accepts as a standard GET query parameter by heading over to http://localhost:3000/hello?name=Marat

![](https://cdn-images-1.medium.com/max/3176/1*M_4bEkc3nZjpMvPgSjbiVA.png)

## That's it

There's nothing more to be done to improve it. It's perfect! Best it could ever be.

Nah! Of course you can improve it. I'm sure there are probably some better ways of doing this too. But this worked for me with minimal effort, and the nice thing is that the API will work for all future commands without requiring any changes 🤞.

To make it easier for you to get started, you can find all the above code in the below GitHub repo: [GitHub - servian/oclif-api](https://github.com/servian/oclif-api)
