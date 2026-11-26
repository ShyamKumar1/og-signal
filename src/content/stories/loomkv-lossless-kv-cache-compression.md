---
title: "LoomKV keeps the KV cache bit-exact while storing it at 0.71 of raw size"
dek: "The serving system compresses a model's cache in both flash and GPU memory, and the largest gains land at the point where a cache starts evicting."
channel: "technology"
research: true
publishedAt: "2026-11-26T14:00:00+05:30"
readingTime: 3
tags: ["kv-cache", "inference", "compression", "llm-serving"]
paper:
  title: "LoomKV: Lossless KV Cache Compression from GPU Memory to SSD for LLM Serving"
  venue: "arXiv preprint, cs.AI"
  id: "arXiv:2611.32954"
  url: "https://arxiv.org/abs/2611.32954"
sources:
  - title: "LoomKV: Lossless KV Cache Compression from GPU Memory to SSD for LLM Serving"
    url: "https://arxiv.org/abs/2611.32954"
    publisher: "arXiv"
    published: "2026-11-24"
timeline: []
claimsChecked: 0
lead: false
draft: false
---

LoomKV brings lossless KV cache compression to both external tiers and the GPU KV pool on an unmodified serving engine. The authors call the two placements tier mode and pool mode. The system was built with LMCache and vLLM.

The compression uses a calibrated per-head two-level 3-bit code over BF16 high bytes, covering the sign and the upper seven exponent bits. Three bits per head, applied to the high bytes rather than the whole number.

## 0.71 of raw size across nine models

LoomKV stores BF16 KV at 0.71 of its raw size across nine models, a reduction of about 29 per cent. It stores FP8 KV at 0.85 to 0.87 of raw size.

Those ratios are the foundation of every other gain in the paper. A cache that takes up less room per token can hold more tokens in the same budget, whether that budget is flash or HBM.

## Tier mode leaves eviction alone

In tier mode, TileStream writes exact-length records with length readback off the load path. Tier storage, eviction and prefetch stay unchanged. Fetched records decompress straight into scattered GPU pages.

Keeping eviction unchanged is the design constraint that makes the result usable in an existing stack. A serving system's replacement policy is tuned to its workload, and a compression layer that changes when a cache evicts would change the workload too.

## Pool mode packs pages for a fused kernel

In pool mode, FragPack packs variable-length records into smaller shared-budget GPU pages. Those pages are read in place by a fused decode-attention kernel, which the authors say is faster than FlashAttention-3 on BF16.

The packing is what lets pool mode fit more tokens without changing the attention computation itself.

## The gains arrive at the eviction cliff

LoomKV makes compressed tiers act as 1.4x larger raw tiers on AgentX. Across LMCache's LRU eviction cliff, tier mode delivers 2.7x to 3.6x the goodput of raw storage and 1.9x to 3.1x lower mean time to first token.

The authors report that the cliff shifts identically under other simulated replacement policies. Tier mode also cuts repeated-prompt time to first token by up to 1.7x through SSD-to-DRAM promotion.

The pattern is that compression pays most where the cache is under pressure. On AgentX, with the tiers holding the working set, a compressed tier behaves like a larger one.

## Fitting more tokens in the pool

When the tiers hold the working set, pool mode fits 1.31x to 1.34x as many GPU tokens. It admits 12 long requests with roughly the queue and goodput of 8 requests without compression. The comparison is admission capacity at equivalent queueing, not peak throughput.

On an AI IDE trace where both the tiers and the GPU pool are constrained, tier mode raises goodput by 1.24x and pool mode by 1.59x. The two modes therefore help different bottlenecks on the same trace.

## What it costs when capacity is enough

Where raw capacity suffices, compression costs at most 2.2 per cent throughput. The system is not free; the cost is bounded.

That number is the one to hold against the cliff results. Most of the large gains in the paper come from avoiding eviction, not from making each individual read cheaper.

## Bit-exactness is the claim to check

The authors report tier mode is bit-exact with raw tiers, and pool mode matches FlashAttention-3's numerical accuracy. Lossless in the title refers to the stored cache, and the paper's evidence for it is the authors' own comparison against an uncompressed baseline.

That is the difference from most cache compression work, which accepts some loss in the stored values and measures the quality impact afterwards. If the authors' claim holds, there is no quality question to measure.

The paper was submitted on 24 November 2026 and runs to 16 pages with 12 figures and 5 tables. The authors are Wentao Zhu, Ziao Sheng, Peng Deng, Huiqi Hu, Xuan Zhou, Xing Wei and Zhuang Wang. The next thing to watch is whether the gains survive outside the two systems it was built on, since LMCache and vLLM were also the test harness.
