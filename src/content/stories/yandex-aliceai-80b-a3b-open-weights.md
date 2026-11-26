---
title: "Yandex releases an 80B open model with a training report and two benchmarks"
dek: "The paper documents a held-out loss that did not track downstream scores, alongside the architecture, the data pipeline and two new Russian-language tests."
channel: "ml"
research: true
publishedAt: "2026-11-26T14:00:00+05:30"
readingTime: 3
tags: ["open-weights", "mixture-of-experts", "yandex", "benchmarks"]
paper:
  title: "AliceAI-Foundation-80B-A3B-Base"
  venue: "arXiv preprint, cs.CL"
  id: "arXiv:2611.34529"
  url: "https://arxiv.org/abs/2611.34529"
sources:
  - title: "AliceAI-Foundation-80B-A3B-Base"
    url: "https://arxiv.org/abs/2611.34529"
    publisher: "arXiv"
    published: "2026-11-25"
timeline: []
claimsChecked: 0
lead: false
draft: false
---

The paper presents AliceAI-Foundation-80B-A3B-Base, a mixture-of-experts language model with 80 billion total parameters and approximately 3 billion active parameters per token. That is about 3.75 per cent of the model active on any given token. It was trained from scratch at Yandex and released under the Apache 2.0 licence.

## The architecture borrows from Kimi

The architecture combines Kimi Delta Attention with full attention. It uses Attention Residuals and was trained with Muon. The paper covers data collection and augmentation pipelines, evaluation protocols, architectural ablations and scaling-law experiments.

## 17.5 trillion tokens in three stages

Training comprised general pretraining on 17.5 trillion tokens, two context-extension stages, and a dedicated stage for reasoning and agentic interaction. The reasoning and agentic stage is separate from pretraining, which is where most of the token budget goes. The two context-extension stages sit between them.

The authors say domain-specific data selection and augmentation improve factual knowledge, mathematics and programming skills. They also say agent trajectories introduced during pretraining improve performance on agentic benchmarks after supervised fine-tuning. Both statements describe the team's own ablations rather than results from an independent group.

## Held-out loss was the wrong signal

The authors identify limitations of held-out training loss as a proxy for downstream performance. The fix they describe is an auxiliary loss on mixture-of-experts outputs, added to stabilise training at the predicted learning rate.

The authors do not treat the loss curve as sufficient evidence that a run went well. The paper says held-out loss does not reliably predict downstream results, which is why the auxiliary loss exists. That makes the report more useful than a model card: the accounting includes a measurement that misled the team.

## Two Russian benchmarks, written by the same team

The authors introduce and release two benchmarks with their evaluation protocols for Russian-language factual knowledge. WikiWebFacts tests short factual questions drawn from encyclopedic sources and search queries. HardMultiQA tests more demanding factual questions inspired by user interactions.

The model scores 86.5 per cent on WikiWebFacts and 67.9 per cent on HardMultiQA. Both protocols are released with the benchmarks, so other groups can run them on their own models. The tasks are factual rather than generative, which narrows what the scores cover. Neither benchmark has an earlier record of other models on it, since both are new.

## The comparison against larger models

DeepSeek-V4-Flash-Base, with 284 billion total and 13 billion active parameters, scores 83.2 per cent on WikiWebFacts and 65.4 per cent on HardMultiQA. Nemotron-3-Super-120B-A12B-Base, with 120 billion total and 12 billion active parameters, scores 72.8 per cent and 54.5 per cent on the same two tests.

The authors say the model outperforms both larger models on these benchmarks. Read that as a first data point rather than a ranking. The 80B model wins by 3.3 points over DeepSeek-V4-Flash-Base on WikiWebFacts and 2.5 points on HardMultiQA, margins that a differently drawn question set could move.

## 88.7 per cent pass@8 on IMO-AnswerBench

In zero-shot reasoning evaluation the authors report leading results among open base models of comparable size. The model records 88.7 per cent pass@8 on IMO-AnswerBench and 82.9 per cent pass@8 on LiveCodeBench v5-v6. Both are author-reported figures, on benchmarks the authors chose to report.

## What the report does not settle

The paper was submitted on 25 November 2026. It runs to five megabytes of source, with 35 listed authors, and is listed under Computation and Language and Machine Learning.

What it does not contain is a third-party evaluation. The two Russian benchmarks, the comparison models and the reasoning scores all pass through the same team, and the strongest claims compare models the team chose and scored itself. The data pipeline sits in the same document as the scores, so the augmentation choices can be read against the results.

The next thing to watch is whether outside groups reproduce the Russian-language scores, and whether the auxiliary loss holds up at other scales. A training report that admits its own measurement was misleading is more useful than one that does not, but the correction is only as good as the next team that tests it.
