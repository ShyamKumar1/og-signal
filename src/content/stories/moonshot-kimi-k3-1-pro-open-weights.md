---
title: "Moonshot's 2.8-trillion-parameter Kimi K3.1 Pro arrives with open weights"
dek: "The Chinese lab published a mixture-of-experts model with 104 billion parameters active per token, and a benchmark table that is strong on agents and weak on security."
channel: "llm"
edition: "morning"
publishedAt: "2026-11-26T06:00:00+05:30"
readingTime: 3
tags: ["kimi", "moonshot", "open-weights", "mixture-of-experts"]
sources:
  - title: "moonshotai/Kimi-K3.1-Pro model card"
    url: "https://huggingface.co/moonshotai/Kimi-K3.1-Pro"
    publisher: "Moonshot AI on Hugging Face"
    published: "2026-11-25"
  - title: "Kimi K3.1 Pro technical blog"
    url: "https://www.kimi.ai/blog/kimi-k3-1-pro"
    publisher: "Moonshot AI"
    published: "2026-11-25"
timeline: []
claimsChecked: 0
lead: true
draft: false
---

## 104 billion parameters active per token

Moonshot AI published Kimi K3.1 Pro on Hugging Face on 25 November 2026 under the Kimi K3.1 Pro License. The model is open-weight, and it is the first entry in the K3.1 series.

It is a mixture-of-experts design with 2.8 trillion total parameters and 104 billion activated per token. That puts roughly 3.7 per cent of the model to work on any single token. The parameters are spread across 93 layers, one of them dense.

The sparse routing holds 896 experts, with 16 selected per token and two shared experts. Sixteen out of 896 is about 1.8 per cent of the expert pool. The vocabulary is 160,000 tokens, and the context window is 1,048,576 tokens.

## Attention split between two sparse schemes

Attention is composed of 69 Kimi Delta Attention layers and 24 gated DeepSeek Sparse Attention layers. Against Kimi K3, Moonshot replaced the full-attention gated MLA layers with gated DSA layers, a change it frames as long-context efficiency.

Vision arrives through a MoonViT-V2 encoder with 401 million parameters, so the model accepts text and images. Weights are quantised to MXFP4 and activations to MXFP8, under quantization-aware training.

Moonshot says it post-trained the model from Kimi K3 with large-scale joint reinforcement learning across hundreds of downstream domains.

## Benchmarks show strong agentic scores

On Moonshot's own table, at maximum reasoning effort, Kimi K3.1 Pro scores 65.7 on Terminal-Bench 4.0 against 66.4 for Claude Opus 5.5. It scores 51.7 on SWE Marathon v1.1 against 42.5 for GPT-6 Astra. The same table gives 70.0 on HLE-Full with tools, 92.1 on BrowseComp and 43.2 on Agents' Last Exam.

These are vendor figures. Moonshot compiled the table and reports the comparison numbers for rival models itself, so treat them as claims rather than independent measurements.

## Security and science scores are much lower

The gaps sit in the same table. Kimi K3.1 Pro records 74.7 on ExploitBench against 100 for GPT-6 Astra, and 20.7 on ExploitGym against 42.4 for GPT-6 Astra. On Terminal-Bench-Science 0.1 it records 38.1 against 68.1.

On Moonshot's internal hallucination benchmark, where lower is better, the model records 8.3 with tools against 5.5 for GPT-6 Astra.

So the release is not a uniform step forward. It is a model that trades blows on agentic coding and browsing, and falls well behind on exploit work and science. Open weights mean those weaknesses ship too.

## Reasoning effort defaults to the top setting

Reasoning effort is set through a field that accepts low, high and max, and it defaults to max. Anyone running the model on their own hardware sets that value themselves, which makes a published score a configuration choice as much as a property of the model.

Moonshot recommends vLLM, SGLang or TokenSpeed for self-hosting. It also offers an API at platform.kimi.ai, with OpenAI-compatible and Anthropic-compatible endpoints, so the same weights are reachable without the hardware.

## Multi-turn tool use has one requirement

Moonshot says multi-turn tool use requires passing the full assistant message back into the conversation, including the reasoning content and tool calls. Drop the reasoning content and the tool loop degrades in ways that look like model errors rather than integration errors.

That detail matters more at this scale than at smaller ones. A 2.8-trillion-parameter model is expensive to debug by trial, and the documented contract is the cheapest guide available.

## What the release changes

The release carries weights and a hosted API at the same time. Moonshot recommends three serving stacks for self-hosting, and the API offers OpenAI-compatible and Anthropic-compatible endpoints, so a team can move between its own hardware and the hosted service without rewriting client code.

The uneven table is the part worth watching. If Moonshot's next checkpoint closes the ExploitBench and science gaps, the open-weight argument gets stronger. If it does not, buyers get a capable agent model with documented holes, which is still a different proposition from a model they cannot inspect at all.
