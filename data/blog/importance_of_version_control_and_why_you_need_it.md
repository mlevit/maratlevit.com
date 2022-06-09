---
title: 'Importance of Version Control and Why You Need It'
date: '2018-05-22'
tags: ['Git', 'continuous integration', 'version control', 'code review', 'Gitflow', 'CI/CD']
draft: false
images: 'https://miro.medium.com/max/1400/0*NDB_mVN4AFfuS3Fr.'
summary: ''
---

![](https://miro.medium.com/max/1400/0*NDB_mVN4AFfuS3Fr.)
_Photo by Patryk Grądys on Unsplash_

Version control (also known as source control) is the management of file changes within a version control system. These systems automatically maintain character level changes for all files stored within allowing for a complete retrace of all versions of each file, the author of those versions and a complete rollback of all changes from the beginning of version control.

For developer-oriented work, it is critical to utilise version control systems for all non-binary files (read Notepad readable) to enable multiple developers or teams to work in an isolated fashion without impacting the work of others. This isolation enables features to be built, tested, integrated or even scrapped in a controllable, transparent and, maintainable manner.

_For the purpose of this post, [Git](https://git-scm.com/) as the worlds leading version control system will replace the words “version control system”._

## Basic Functionality

The basics of version control are the ability to save changes made to files, whilst retaining the changes from all previous versions. All changes made within Git receive a unique version identifier alongside a user-written comment where the changes can be described.

### Commits

Changes to files are monitored at the character level. When changes are made in a developer's local workspace they are committed\* _(saved locally) and, then pushed (sent to the repository) within Git, this makes them available for consumption by other developers in the team. Those developers pull_ \*(fetch new updates from the repository) all the changes to their own local workspace. This flow allows developers to work on a range of features within a project without impacting the work of others. Once they have completed their feature, it is pushed to the repository and made available to others.

### Branches

Branching within Git is a way of taking a copy of the code into what's called a branch. This allows the developers to isolate all their changes within that branch before merging (applying the changes to the main copy of the code) once the feature that has been worked on is complete. Multiple developers can work on a branch simultaneously.

Branches should always be used when making changes to existing code. Those changes should never be done directly on the main copy of the code as the changes (when incomplete) will break the code impacting other developers.

## Gitflow

Implementing Git within a workplace might seem daunting as there are myriad ways of organising a repository around your workflow. Gitflow is a universal branching solution that can be implemented (and even comes inbuilt in [Sourcetree](https://www.sourcetreeapp.com/), my personal Git application of choice) in order to simply and formalise the correct usage of branching in Git.

The basics of Gitflow is as follows:

- The production version of your code sits in a branch named master.

- The development version of your code (ready to be tested and productionised) sits in a branch named develop.

- When development on a new feature is started, a new branch is created off of the develop branch. This is a feature branch.

- When the development has completed, the feature branch is either merged back into the develop branch if the changes are to be taken into production, or left in their respective branch if they are not.

- When the code in the develop branch is finally ready to be released into production, a new release branch is created.

- When the release branch is approved for release, it is merged into the master branch **and** develop branch to capture any fixes that may have been done directly on the release branch.

- If a defect is found within production that requires a quick fix (not running through the normal release lifecycle of develop, test, integrate) a hotfix branch can be created off the master branch.

- The hotfix branch will be worked on to develop the fix to the defect. After development has concluded, the hotfix branch is merged into the master branch **and** develop branch (to ensure the fix is applied in the lower branches where it doesn’t exist yet).

The result of the above flow is illustrated below.

![[Source: Atlassian] Gitflow lifecycle](https://cdn-images-1.medium.com/max/2000/1*8glFPIFZb2tmShzV1TjtYQ.png)_[Source: Atlassian] Gitflow lifecycle_

A fantastic (and more detailed) write up on Gitflow can be found below by Atlassian.
[**Gitflow Workflow | Atlassian Git Tutorial**
*A deep dive into the Gitflow Workflow. Learn if this Git workflow is right for you and your team with this…*www.atlassian.com](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)

## Code Review

When working on larger projects (think open source) there is a strict set of rules to be followed when making changes to code. In addition to Git, a code review process is added to ensure all merges of feature branches are well developed, tested and, even desired.

[Gerrit](https://www.gerritcodereview.com/), a popular web-based code review manager works on top of Git adding the extra functionality needed for larger projects to maintain standards and quality in a decentralised manner.

![[Source: Gerrit] Review comments based on changes](https://cdn-images-1.medium.com/max/2000/1*ELw8loprtidAP_z_aQyY4g.png)_[Source: Gerrit] Review comments based on changes_

Gerrit can integrate with other services including continuous integration applications which can feedback the status of the code compilation and testing based on the changes made within the feature branch.

When the code has been reviewed and approved based on all the evidence presented within Gerrit, it is merged into the develop branch to await release.

The Chromium Project (open source project that is the basis for Google Chrome) utilises Gerrit for their code review. [You can view their public Gerrit here](https://chromium-review.googlesource.com) to get a better understanding of how an open-source project utilises the review process for all changes.

## Continuous Integration

Continuous integration is the practice of integrating feature branches into the main branch of code to be built and tested automatically. Since this is an automatic practice, this can be done anywhere from several times a day to several times a week.

![[Source: [www.pepgotesting.com](http://www.pepgotesting.com/)] CI Process](https://cdn-images-1.medium.com/max/3852/1*8hYrQVHInQcAZE1X4nKa5w.png)_[Source: [www.pepgotesting.com](http://www.pepgotesting.com/)] CI Process_

The use of a Git repository acts as a trigger for the build server to compile, execute and, test the code changes. If code changes cause the automated test cases to fail, an alarm will be raised to inform the developers that their change was a failure. The developers will then either rollback their changes to the previously successful version of the code or roll forward by releasing a fix to the code that caused the failure.

Implementing continuous integration allows teams to fail fast and fail often. Continuous integration is the agile development lifecycle compared to the traditional waterfall where the development phase would run for weeks to months before integration and testing phases.
