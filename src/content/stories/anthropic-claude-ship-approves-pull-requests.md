---
title: "Anthropic's Claude Ship can approve a pull request without a human"
dek: "Approval rules live in a file inside the repository, and Anthropic warns the system can miss bugs and security holes."
channel: "ai"
publishedAt: "2026-11-25T06:15:00+05:30"
readingTime: 3
tags: ["anthropic", "claude", "developer-tools", "code-review"]
sources:
  - title: "Introducing Claude Ship"
    url: "https://claude.com/resources/articles/introducing-claude-ship"
    publisher: "Anthropic"
    published: "2026-11-23"
timeline: []
claimsChecked: 0
lead: false
draft: false
---

Anthropic opened Claude Ship to beta on Claude Team and Enterprise plans, for repositories on GitHub. It contains three things: Code Review, which is generally available, and two beta agents, PR Steward and Claude Approvals. The third can approve a routine pull request without a person reading it, if a policy file in the repository says it may.

That is the governance question in one line. The rule that decides when an AI may merge code is version-controlled alongside the code.

## What Code Review does

Code Review performs an in-depth review of pull requests against the codebase through multiple lenses. It collects findings, verifies them adversarially, categorises them and posts them to the pull request. Each repository can be set to Quick, Standard or Deep.

Anthropic reports that on the Claude Code team, where Claude's review is one layer of a broader process, merged pull requests more than doubled from June to September while the share reverted fell by more than 40 percent. Those are vendor numbers from one internal team, not a controlled study of customers.

## PR Steward keeps the branch green

PR Steward is designed not to approve or merge pull requests. It intervenes on failing CI checks, merge conflicts and review feedback, and comments after every push with what it changed and how to undo it.

The separation is deliberate. The agent that edits your branch is not the agent allowed to sign off on it.

## The approval policy is a file

Claude Approvals applies an approval policy the team writes as a file in the repository. Anthropic describes it as working like a smarter CODEOWNERS file. Claude can approve routine changes on its own where the policy allows, or require deeper human sign-off for certain scenarios.

The recommended rollout is observe-only first, then branch protection requiring its green light. Anthropic's own advice implies the first weeks are for finding out what the policy actually does, before it has authority to do anything.

## Anthropic's limits, in its own words

Anthropic states that Claude Ship uses AI and may miss bugs, security vulnerabilities or other issues, and that teams control where it runs and which changes still need a person. That caveat sits on the same page as the approval feature, which is where it belongs.

## What it costs

Usage is billed on tokens, so turning it on can add to an organisation's costs. Admins can set spend limits for Code Review and PR Steward. Claude Approvals has no base charge, but classifiers in a policy are billed on the tokens they use, and a policy that uses Claude's review triggers a billed Code Review even in observe mode.

Three configurations are excluded outright: organisations with Zero Data Retention, the HIPAA configuration, and customer-managed encryption keys.

Eligible Claude Enterprise organisations can claim at least 10,000 US dollars in Claude Ship credits, to be used within 30 days of claiming and by 15 January 2027.

## /ship, and the evening merge

Developers can run a new /ship command in Claude Code and the desktop app. It pushes a change, opens the pull request, reviews it and works on feedback and failing checks. It began rolling out on the day of the announcement.

Anthropic says it runs Claude Ship on many of its own pull requests, and that a product manager can now have a fix opened, reviewed, approved and merged in an evening. TELUS said in the announcement that there were numerous cases where Claude Code Review caught real issues before a human reviewer reached the pull request, and that a human stays in the loop.

## The part to watch

The observability claim and the autonomy claim pull against each other. A policy that lets Claude approve routine changes is only as good as its classification of routine, and that classification is a file the customer writes and the customer maintains.

There is also a cost shape worth noticing. Every gate in a policy that calls Claude's review adds a billed review, so a cautious policy is the expensive one. An organisation under budget pressure is nudged towards fewer checks, not more.

The first organisations to enable Claude Approvals will produce the only evidence that matters: revert rates on the changes it waved through, and whether those rates differ from the ones humans approved. Anthropic has published its internal numbers for Code Review. It has not published a figure for Approvals, which is the feature that removes the person.
