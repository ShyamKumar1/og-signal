---
title: "Two labs shipped open weights on the same day, 554 billion parameters apart"
dek: "MemTensor's 554B memory-native model and PrismML's 5.9GB ternary model landed on 24 November, aimed at opposite ends of deployment."
channel: "llm"
edition: "morning"
publishedAt: "2026-11-25T04:30:00+05:30"
readingTime: 4
tags: ["open-weights", "memory", "quantisation", "inference"]
sources:
  - title: "MemTensor Releases and Open-Sources MemT-1.0-Pro, a 554B Memory-Native Model"
    url: "https://technode.global/prnasia/memtensor-releases-and-open-sources-memt-1-0-pro-a-554b-memory-native-model"
    publisher: "TNGlobal / PR Newswire"
    published: "2026-11-24"
  - title: "PrismML Launches Ternary Bonsai 2.5 27B for Agentic Coding and Private Knowledge Work"
    url: "https://prismml.com/news/prismml-launches-ternary-bonsai-2-5-27b"
    publisher: "PrismML"
    published: "2026-11-24"
timeline: []
claimsChecked: 13
verifiedAt: "2026-11-25T04:50:00+05:30"
lead: true
draft: false
---

MemTensor released and open-sourced MemT-1.0-Pro on 24 November: 554 billion total parameters, 59 billion of them active, developed jointly with NVIDIA. The same day, from Pasadena, California, PrismML announced Ternary Bonsai 2.5 27B, a model that sits at 5.9GB of memory, uses ternary weights and is free to download under Apache 2.0. One of them has 554 billion parameters. The other runs on an iPhone.

## MemTensor put the work in memory

MemT-1.0-Pro is not a new backbone. It is built on NVIDIA-Nemotron-3-Ultra-550B-A55B-BF16 and trained with NVIDIA Megatron-Core and Megatron Bridge, which leaves most of the architectural change outside the base model itself. What MemTensor describes is a pairing. Dynamic local memory stores information acquired during interaction. Trainable hyper-memory components learn how to write that information and how to read it back.

That is a different target from raw reasoning. The model is being sold on what it keeps, not on what it can do in a single pass.

## The gains are on memory benchmarks

MemTensor reports 41.80 on BEAM-1M against 37.04 for MemT-1.0-Flash, an improvement of 4.76 points. On MemoryAgentBench it reports 23.87 against 17.36, a gain of 6.51 points.

Both figures are company numbers, published with the release. Both compare the new model with MemTensor's own Flash release rather than with a model from another lab. The two benchmarks also measure memory handling, which is the capability the architecture was rebuilt to improve, so the comparison is narrow by design. MemT-1.0-Pro follows the earlier Nano and Flash models, making this the third step in a line.

## PrismML went the other way

Ternary Bonsai 2.5 27B is based on Qwen 3.8 27B and uses ternary weights, a three-value weight format. The whole model sits at 5.9GB.

PrismML reports an average of 54.2 across three agentic coding benchmarks — SWE-bench Verified, DeepSWE v1.1 and Terminal-Bench 2.1 — against 37.9 for Ternary Bonsai 2 27B. Averaged across the agentic tool-calling benchmarks AppWorld and tau-3-Bench, it reports 82.2 against 60.2 for the predecessor.

Those are vendor numbers too, and again the baseline is the company's own previous model. The improvement is large enough that the interesting question is what the 27B base costs in capability outside the two benchmark families PrismML chose.

## Where each one runs

PrismML is specific about deployment. Bonsai runs on NVIDIA and Intel GPUs through llama.cpp, and on Apple devices including Mac, iPhone and iPad through MLX. It is released under Apache 2.0 and downloadable free from 24 November.

MemTensor's announcement, as reported, gives no deployment detail beyond the NVIDIA backbone and the NVIDIA training stack. That asymmetry reads as intent. One model is designed to be carried. The other is designed to be served.

## The pincer

Set side by side, the two releases mark out how wide open weights have become in a single day. At the top, 554 billion parameters and a memory subsystem that tries to hold context across turns. At the bottom, 27 billion parameters squeezed into 5.9GB so the model can run where the work happens rather than in a data centre the work has to reach.

The benchmarks do not overlap. Memory retrieval on one side, coding and tool calls on the other. Neither company compared its model with the other's, and there is no shared evaluation that would settle which approach buys more per gigabyte of memory.

## What the numbers do not cover

Every figure in both announcements comes from the lab that built the model. Neither release, as described, includes a run by an outside evaluator. Memory benchmarks are sensitive to how a harness supplies context between turns, and agentic coding scores move with the scaffolding around the model: the tools, the retry policy, the file access.

That makes the two sets of gaps descriptions of different kinds of progress rather than a ranking. A 4.76 point gain on BEAM-1M says something about retention over long context. A large gain on an average of three coding benchmarks says something about task completion. They are not the same claim, and they are not competing claims.

## The next test is a harness neither lab controls

The open question is not which model is better. It is whether a memory-native 554B model and a 5.9GB ternary model can be measured on one task, because that is the comparison a buyer eventually wants: capability per unit of memory, at a fixed price of latency.

Both are available now. Watch for the first independent evaluation that puts them in the same harness, and for any figure from MemTensor on inference cost. Its announcement, as reported, does not give one.
