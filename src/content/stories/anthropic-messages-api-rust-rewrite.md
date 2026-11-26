---
title: "Anthropic moved its Messages API to Rust and found verification was the bottleneck"
dek: "Claude wrote most of the merged code, but the migration only worked once Anthropic replayed live traffic against both versions instead of trusting its test suite."
channel: "technology"
publishedAt: "2026-11-26T06:00:00+05:30"
readingTime: 3
tags: ["anthropic", "rust", "agents", "engineering"]
sources:
  - title: "Migrating our Messages API to Rust"
    url: "https://www.anthropic.com/research/migrating-api-to-rust"
    publisher: "Anthropic"
    published: "2026-11-25"
timeline: []
claimsChecked: 0
lead: false
draft: false
---

## Traffic grew roughly 1,800 times

Anthropic published an engineering account on 25 November 2026 describing its migration of the Messages API from Python to Rust. From early 2024 to autumn 2026, API traffic grew roughly 1,800 times.

The rewrite is the least interesting part of the story. The account's own conclusion is that verification, not generation, had become the bottleneck, and that conclusion travels well beyond one company's API.

An earlier partial rewrite moved only the code that parses a model's output into Rust. It cut CPU usage by about 8 per cent to 10 per cent. Anthropic rejected it because each token crossed between Python and Rust three times.

That is a useful failure to publish. A small rewrite can show a gain in isolation and still lose once the cost of the boundary is counted.

## Claude wrote the first request path

Claude wrote a first version of the API's core request path in about a week. By May 2026, Claude was writing more than 80 per cent of the code Anthropic merged.

Anthropic says the Rust API uses about 70 per cent less CPU per request and cuts median time to first token by about 20 per cent. It also says the work happened without taking the service offline or freezing feature development. Those are Anthropic's figures for Anthropic's service, and no outside party has checked them.

## 700 tests that could pass the wrong code

The team had about 700 integration tests. They ran the Python API in-process with mocked services, so a passing test could mean the test had been changed to let wrong code through. An audit found more than 100 weakened assertions.

Anthropic also counted the combinations. Twenty binary options make more than a million combinations, which it puts at 12 days of tests at a second each, for one model, before varying the prompts. Exhaustive testing was not on the table.

## 98 per cent passing, a quarter matching

The Rust API passed about 98 per cent of its tests in April, yet only about a quarter of production inputs matched. The suite was green and the systems were not equivalent.

That gap is why the rest of the account exists. A test suite encodes what someone thought to check. Production traffic encodes what customers actually send, and the two diverge quietly.

## Shadowing production traffic

To compare the two systems, Anthropic shadowed production traffic. The model ran once and its output was replayed to both versions, so no request was billed twice and Claude's nondeterminism did not appear as a false difference.

Differences were logged as checkpoints and fingerprints rather than text, so engineers never read customer requests or replies. A fingerprint records where a difference began in the prompt and how many bytes it differed by.

## Agents triaging their own diffs

A script grouped diff records every 10 to 30 minutes and alerted a coordinating agent only on a new kind of record. That agent then assigned a worker agent to the bug. Routine repeats cost nothing.

A memory loop recorded review corrections for later agents. In June an agent went through about 60 of the team's review comments, grouped the recurring problems into rules, and an engineer edited and approved them. The rules were machine-drafted and human-signed, which is the part that makes them enforceable.

## Checks that outlive the migration

Permanent checks followed. Tests now fail when Rust drifts from Python. A merge check requires anyone changing Python code to make a matching Rust change or request an exemption.

For teams moving a live service with agent help, the pattern is portable: replay real traffic against both versions, compare structure rather than content, let agents triage the noise, and leave behind a check that fails when the old path and the new one stop agreeing.
