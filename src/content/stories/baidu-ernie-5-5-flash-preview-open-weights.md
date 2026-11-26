---
title: "Baidu put Apache 2.0 on a 280-billion-parameter preview and called it unfinished"
dek: "ERNIE 5.5 Flash Preview ships with a million-token context and weights developers can actually use, while Baidu says post-training is still running."
channel: "llm"
edition: "morning"
publishedAt: "2026-11-26T06:00:00+05:30"
readingTime: 3
tags: ["baidu", "ernie", "open-weights", "apache-2-0"]
sources:
  - title: "baidu/ERNIE-5.5-Flash-Preview model card"
    url: "https://huggingface.co/baidu/ERNIE-5.5-Flash-Preview"
    publisher: "Baidu on Hugging Face"
    published: "2026-11-24"
  - title: "ERNIE 5.5 Flash Preview release"
    url: "https://ernie.baidu.com/release/ernie-5-5-flash-preview/"
    publisher: "Baidu ERNIE Team"
    published: "2026-11-24"
timeline: []
claimsChecked: 0
lead: false
draft: false
---

## The licence covers the preview weights only

Baidu published ERNIE 5.5 Flash Preview on Hugging Face on 24 November 2026 under the Apache License 2.0. The licence covers the preview weights only. The ERNIE 5.5 Flash Base that the preview was built from remains under a separate licence.

That split is the news. Apache 2.0 on a model of this size is a different offer from a research licence or a custom agreement, and developers can plan around it. The base model sitting outside the grant is the caveat that comes with it.

## 280 billion total, 14 billion active

The model is a mixture-of-experts with 280 billion total parameters and 14 billion active per token, and a context window of 1,048,576 tokens.

It has 43 layers, one dense and 42 mixture-of-experts, with 512 routed experts and a top-10 selection plus one shared expert. The vocabulary is 201,216 tokens. It is text in, text out, so there is no image path.

## Precision and a draft head for long tasks

Precision is blockwise FP8, with routed experts in MXFP4 under quantization-aware training, an FP8 KV cache and an FP4 indexer.

A DSpark draft head provides speculative decoding, which Baidu presents as a way to speed up long agent tasks. The weights are also published on ModelScope, with FP8 and BF16 repositories for hardware without FP4 kernels.

## Baidu's own table

On Baidu's own evaluation table, the model scores 46.5 on Terminal-Bench 4.0 against 66.4 for Claude Opus 5.5 and 56.1 for GPT-6.1 Sol. It scores 71.2 on DeepSWE v1.1, 87.4 on BrowseComp and 46.4 on HLE without tools.

The same table shows 61.9 on AutomationBench, 84.9 on DRACO and 67.9 on OfficeQA Pro V2. These are vendor figures, compiled by the team that trained the model.

Terminal-Bench is the weak line. A preview that trails a rival by 19.9 points on one agentic coding benchmark should be read as exactly that, whatever the rest of the table says.

## Games, workspaces and creation environments

Baidu says that in a single 11-hour coding task the model wrote a complete third-person wuxia game in C++ on Unreal Engine 5.8. It says the model built nearly 100 mobile mini-games from game design documents.

Baidu also says it trained the model in 300,000 workspaces for domains such as finance and law, holding 10 million reference files in more than 40 file types, and in more than 150,000 creation environments for tasks including popular-science explainers and motion comics.

Those numbers describe the training set-up, not the model's behaviour, and Baidu reports them without an outside check. They are the kind of claim that a public checkpoint can be tested against, which is the advantage of shipping weights at all.

## Thinking on by default

Thinking is on by default and can be switched off, with reasoning effort set to low, medium or high, defaulting to high.

Baidu describes the preview as an intermediate checkpoint from post-training. It says some capabilities may still fall short because training is not finished, and that post-training is ongoing. The label on the release is unusual for a vendor table this confident, and it should be taken literally.

## What shipping a checkpoint in public means

A company that releases a permissively licensed model before training finishes is asking developers to test it for free and to accept that the next checkpoint may behave differently. In exchange, they get weights they can run, fine-tune and inspect now.

The thing to watch is the final ERNIE 5.5 Flash release and whether the Apache 2.0 grant extends to it. Until then, the preview is a usable model with a documented gap on agentic coding, published under terms that make the gap cheap to measure.
