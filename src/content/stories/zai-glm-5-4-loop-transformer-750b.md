---
title: "Z.ai's GLM-5.4 runs the same 28 layers twice to buy reasoning"
dek: "The loop transformer adds depth without adding parameters, and Z.ai says the 750-billion-parameter model matches rivals several times larger."
channel: "llm"
edition: "morning"
publishedAt: "2026-11-25T06:15:00+05:30"
readingTime: 3
tags: ["zai", "glm", "model-architecture", "reasoning"]
sources:
  - title: "GLM-5.4: Toward Generalized Coding with Our First Loop Transformer"
    url: "https://z.ai/blog/glm-5.4"
    publisher: "Z.ai"
    published: "2026-11-23"
timeline: []
claimsChecked: 0
lead: false
draft: false
---

Z.ai published GLM-5.4 on 23 November 2026 and described it as the company's first flagship model built on a Loop Transformer architecture. The mechanism is narrow and legible: rather than adding parameters, the model runs 28 layers of its GLM-5 base for two iterations.

Z.ai states that GLM-5.4 reaches intelligence levels comparable to 2-trillion- to 3-trillion-parameter models. That is a company claim, not an independently verified result.

## A deeper network without more weights

In a standard transformer each layer runs once per forward pass. In a loop transformer a group of weight-shared layers runs for multiple iterations, refining the hidden states from the previous pass. The network computes deeper without the parameter count rising.

Z.ai did not pre-train the looped model from scratch. It says that approach still lags unshared models at equal pre-training compute, so it adapted an already pre-trained base model into a loop transformer through continued training. GLM-5.4 loops 28 layers of the GLM-5 base twice.

## Three fixes for the cost of a second pass

At 750 billion parameters the extra iteration has to pay for itself in deployment, not just in benchmarks. Z.ai made three changes: gated progressive updates, a hybrid KV cache with global sharing and an independent sliding window, and sparse attention index reuse.

The gates are independent per token for each iteration. The first pass builds global context and writes conservatively. The second pass reuses that state and opens the gates to write full updates.

The cache change is the deployment one. An extra loop costs one sliding window of KV cache rather than a full context cache, which Z.ai says keeps the increase over GLM-5.3 under control at a 1-million-token context length. Serving a second pass through the same weights is cheap in memory and expensive in time, and the cache design is what limits the second cost.

## What the controlled comparison showed

Z.ai reports an iso-parameter comparison on a 30-billion-parameter model with the same architecture as its 750-billion base. With identical parameter counts and about 10 percent more total training compute, the looped version showed clear gains.

The largest gains appeared in mathematics, scientific reasoning and long-context tasks. Those are Z.ai's figures from its own test, which is the only comparison in the post that isolates the loop from everything else.

## Shorter answers at the same scores

On benchmarks including GPQA-Diamond and MMLU-Pro, Z.ai reports that average output length dropped by 10 to 14 percent, mostly from shorter chains of thought. The company's explanation is that part of the reasoning has moved into the implicit depth of the loop.

Throughput is quoted at up to 200 tokens per second during off-peak hours and 70 to 80 tokens per second at peak load. Those are serving figures from the vendor, not measured by a third party.

## The failure mode Z.ai names

Z.ai acknowledges that the model still tends to get caught in overly long marathon thinking loops. It argues that the prolonged reflection and self-correction improves accuracy beyond the model's parameter count.

Both statements can hold at once. A model that keeps thinking past the point of usefulness and a model that reasons better because it thinks longer are the same behaviour observed from two directions, and the design gives it more room to do either.

## Where it runs, and what is missing

GLM-5.4 is available through the Z.ai Coding Plan, ZCode and Z.ai Chat. API access is listed as coming soon. Z.ai says it plans to open-source the weights after completing safety hardening, which leaves the architecture public and the weights withheld for now.

The measured claims will be hard to check until those weights appear. Z.ai says it is exploring adaptive compute, so that harder tokens get more iterations, and that its next, significantly larger model will carry the loop architecture forward. The comparison to 2-trillion- and 3-trillion-parameter models is the claim that model will have to support.
