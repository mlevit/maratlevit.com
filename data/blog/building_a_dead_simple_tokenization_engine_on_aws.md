---
title: 'Building a Dead Simple Tokenization Engine on AWS'
date: '2020-03-02'
tags: ['AWS', 'tokenization', 'security', 'encryption', 'hashing', 'cryptography']
draft: false
summary: ''
---

![](https://miro.medium.com/max/1400/0*nVr5Q-nEo6r9V9wY)
_Photo by Markus Spiske on Unsplash_

Tokenisation is the concept of replacing a sensitive value (i.e., credit card number, social security number, etc.) with a token, not a hash or ciphertext.

A token is randomly generated without the input of the original sensitive value. On its own, it has **no** value.

A hash is (generally) an encoding method of producing a fixed-width value. A hash cannot be reversed. The only way to “break” a hash is via a [rainbow table](https://en.wikipedia.org/wiki/Rainbow_table).

The ciphertext is the result of a cryptographic operation (or encryption). The ciphertext is produced utilising an encryption cipher along with a private key. Ciphertext can be decrypted if the private key, along with the encryption algorithm, is known.

## The Tools

Let’s briefly discuss the necessary products and services we’ll be using to build the tokenisation engine.

**DynamoDB** — A NoSQL, easy to set up database service capable of storing and retrieving millions of records with crazy high TPS rates.

**KMS** — AWS native encryption service. Capable of maintaining up to 10,000 API calls per second (in APAC, and 30,000 in some other regions).

**Compute** — Any compute service provided by AWS. Be it EC2 (as per below), ECS, Glue Python Shell, or Lambda.

**Storage** — Any storage service to store both input and output records. It can be S3 (as per below) or a database service.

## The Method

![](https://cdn-images-1.medium.com/max/2394/1*ECAHYwZOM6hhG5yIUwRf2g.png)

### Tokenisation

Now that we have a brief understanding of the products, services, and flow of our tokenisation engine, let’s discuss how we tokenise our data.

- Read the sensitive value we’ll be tokenising (called a secret from now on)

- Hash the secret to create a re-usable checksum

- Use the checksum to look for an existing token in our DynamoDB table (the checksum being the partition key in the DynamoDB table)

- If a record is found, return the token

- If a record is not found, encrypt the secret using KMS

- Store the hash, encrypted secret (called ciphertext), and a randomly generated UUID (called a token) into our DynamoDB table

- Replace the secret with the token within the input source

### Permission Model

Ensuring our compute instance aligns with the principle of least privilege is critical to the success of this engine.

We need to ensure our compute instance is only allowed to call kms:Encrypt and never kms:Decrypt, as this will prevent the compute instance from being able to decrypt any existing DynamoDB records.

That’s pretty much it. The flow is quite simple, and of course, you still need to be able to reverse a token to its original value when required (but that’s a topic for another day).

Let me know what you think and also if you’ve implemented this a similar engine using a different architecture.
