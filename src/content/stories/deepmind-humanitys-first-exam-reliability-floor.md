---
title: "DeepMind's new exam scores the floor, and the best model manages 92.4 per cent"
dek: "Humanity's First Exam asks 544 elementary questions in 136 families, and Google's report finds 73 per cent of wrong answers come from visual perception."
research: true
channel: "ml"
publishedAt: "2026-11-26T06:00:00+05:30"
readingTime: 3
tags: ["benchmarks", "deepmind", "reliability", "evaluation"]
sources:
  - title: "We're launching Humanity's First Exam and a Kaggle hackathon to test LLM reliability"
    url: "https://blog.google/innovation-and-ai/models-and-research/google-deepmind/humanitys-first-exam/"
    publisher: "Google"
    published: "2026-11-24"
  - title: "Humanity's First Exam: Measuring the Reliability Floor of LLMs (technical report)"
    url: "https://storage.googleapis.com/deepmind-media/papers/hfe_tech_paper.pdf"
    publisher: "Google DeepMind"
    published: "2026-11-24"
timeline: []
claimsChecked: 0
lead: false
draft: false
---

## 544 prompts in 136 families

Google DeepMind launched a benchmark called Humanity's First Exam on Kaggle on 24 November 2026. Research scientist Oran Kelly announced it in a blog post. The dataset is 544 elementary text and image prompts across 20 foundational capabilities.

The prompts are grouped into four-prompt families: one seed prompt and three variants, which gives 136 families. The family structure is the whole design. A model that answers one phrasing correctly has not shown that it can answer the same question four ways.

## A calibration panel set the difficulty

A seed prompt had to fail on at least one model before it was accepted. The calibration panel was Gemini 3.1 Flash-Lite, Gemini 3.1 Pro, Claude Opus 4.7, Claude Sonnet 4.6 and GPT-5.5, and the prompts were written between May and June 2026.

The technical report evaluates 18 frontier and fast-tier models. Google released a public subset of 112 prompts across 28 families under a CC-BY-4.0 licence and held back 432 prompts across 108 families. The held-back set is what keeps the leaderboard meaningful after publication.

## Pass@1 looks nearly solved

The top five models reach 96 per cent to 98 per cent on pass@1. All five reach 100 per cent on family pass@4. Read those two numbers alone and the exam looks finished.

The same models average only 85.8 per cent on family pass4, with a range of 80.5 per cent to 92.4 per cent. The names are close and the meanings are not. Family pass@4 allows four attempts; family pass4 does not.

Google calls the distance between the two the Family Reliability Gap. Across the 18 models it ranged from 7.6 to 80.1 percentage points.

## The top and the bottom of the table

Family pass4 maxes out at 92.4 per cent for GPT-6.2 Astra, followed by 86.9 per cent for GPT-6.2 Sol and 85.8 per cent for Gemini 4 Neon.

The report also lists GPT-6 Astra at 83.4 per cent family pass4, Claude Fable 5.2 at 73.7 per cent and Claude Opus 5.5 at 63.0 per cent. On the report's own figures that leaves Claude Opus 5.5 29.4 percentage points behind GPT-6.2 Astra.

The scoring rules explain why the numbers separate. For a single prompt, the model must get it right in all six rollouts, with partial credit for five and four correct. Family pass4 requires 16 consecutive successes per family.

That makes the exam a reliability measure rather than a capability measure. A model can reason its way to an answer and still fail by being inconsistent about it.

## Failures sit in visual perception

Failures are heavily concentrated in visual perception, which accounts for 73 per cent of wrong answers. That is the finding worth carrying out of the report. The models are not mainly failing to reason. They are misreading images.

Extra test-time reasoning raises the reliability floor far less on image tasks than on text and symbolic tasks. More thinking does not fix a misread sign.

One public example prompt asks for the colour of the third letter of each word on a neon sign, in order. The answer given is green; yellow; white; blue; blue.

## A public competition through 15 December

A three-week Kaggle competition runs through 15 December 2026 and asks people to submit everyday questions that models still get wrong. It is a data collection exercise with a leaderboard attached.

Google says frontier models made significant progress on the exam over the previous six months, and that the leaderboard is live on Kaggle. Both statements are Google's, and so is the benchmark.

## What the floor means for buyers

Headline scores measure the ceiling. A floor score answers a different question: how often will this model be right when the same task arrives again tomorrow.

For anyone putting a model behind a product, the 85.8 per cent average and the 7.6-to-80.1 spread say more than a 98 per cent pass@1. The next thing to watch is whether the competition produces prompts that move the floor, or only prompts that add to the pile.
