---
title: "Sber releases a 708-billion-parameter GigaChat 4 under the MIT licence"
dek: "The flagship activates about 41 billion parameters per token and carries a million-token context, while trailing GLM-5.3 on the hardest coding tests."
channel: "llm"
research: false
publishedAt: "2026-11-27T06:00:00+05:30"
readingTime: 3
tags: ["sber", "gigachat", "open-weights", "mixture-of-experts"]
sources:
  - title: "GigaChat 4: Two Powerful Models, One Million Tokens, and New Agentic Capabilities"
    url: "https://giga.chat/blog/en/posts/gigachat-4"
    publisher: "Sber, GigaChat blog"
    published: "2026-11-26"
  - title: "ai-sage/GigaChat4-708B-A41B model card"
    url: "https://huggingface.co/ai-sage/GigaChat4-708B-A41B"
    publisher: "Hugging Face"
    published: "2026-11-26"
timeline: []
claimsChecked: 0
lead: true
draft: false
---

Sber presented GigaChat 4 at its AI Journey conference on 26 November 2026, and published the weights the same day. The release holds two models. The flagship has 708 billion total parameters and activates about 41 billion of them per token. The compact model has 37 billion in total and activates about 3.8 billion per token.

The flagship is out under the MIT licence. The 37B model uses a non-commercial licence for individuals. Weights sit on Hugging Face in FP8, BF16 and GGUF formats, as base models, instruction-tuned models and intermediate base checkpoints.

## Two models, one architectural family

The flagship has 64 decoder layers and a hidden size of 7,168, divided into 48 linear-attention layers and 16 sparse-attention layers. Each mixture-of-experts layer holds 256 routed experts and one shared expert, and selects 8 routed experts per token, or 3.1 per cent of the routed pool. The architecture interleaves Gated DeltaNet layers with multi-head latent attention layers that use DeepSeek Sparse Attention, in a 3:1 ratio.

That attention selects up to 2,048 earlier positions per query instead of attending over the whole sequence. The saving is what makes the context length practical rather than theoretical.

## Context grew from 32K to a million tokens

The context window is 1,048,576 tokens. Sber extended it from 32K to 128K and then to 1M. Sparse attention arrived at 128K through indexer-only training, and at 1M the indexer and the backbone were optimised jointly.

Both models answer in an instant mode or a reasoning mode, selectable per request, from a single checkpoint. GigaChat 3.5 shipped those as separate checkpoints, so the consolidation is a change in packaging as much as in capability.

## The vendor table splits both ways

The benchmark numbers are Sber's own and should be read as vendor figures. In reasoning mode the flagship reports 80.89 per cent on SWE-bench Verified, 88.82 per cent on LiveCodeBench v6, 71.26 per cent on Terminal-Bench 2.0, 82.83 per cent on GPQA Diamond and 23.91 per cent on Humanity's Last Exam without tools.

Against GLM-5.3 the picture is mixed. On Terminal-Bench 2.1 the flagship scores 69.66 per cent against 88.70, a gap of 19.04 points. On SWE-bench Verified it scores 80.89 per cent against 86.67.

The agentic and retrieval tests run the other way. Sber reports 79.55 on BFCL v4 against 68.29 for GLM-5.3, 83.31 on τ²-Bench, and 70.33 on AA-LCR against 66.70. On GraphWalks the flagship reports 74.92 against 38.00 for Sber's own GigaChat 3.5 Ultra 432B.

## Drafters, warm-up and expert load

Sber trained a diffusion drafter called DFlash2 from scratch: a separate five-layer BF16 model that predicts tokens in parallel over blocks of eight positions. A second, recurrent multi-token-prediction drafter reuses one prediction layer across draft steps. Sber says that cuts drafter parameters by about three times against the three independent blocks in GigaChat 3.5.

Training stability relied on progressive residual warm-up, projection-specific z-loss and logit softcapping. Where expert-load imbalance persisted, Sber rescaled learning rates for individual mixture-of-experts blocks. The 37B model was trained with μP, used to pick hyperparameters on a model ten times smaller and transfer them by width and depth scaling rules, and with the Muon optimiser.

After supervised fine-tuning, Sber trained expert models with reinforcement learning on mathematics, coding, tool use and multi-turn agent workflows. Those experts were then consolidated into one model through multi-teacher on-policy distillation.

## Demos run through agent harnesses

Sber says the model runs in harnesses including Claude Code, Codex CLI, pi, the DeepSeek harness and OpenHands. In demos published with the launch, the flagship edited the palette of a NES Mario cartridge dump by changing bytes in the binary and ran the game on a Mac M4. It produced an STL file for a 3D-printable vase, and wrote a music track through MCP access to the Cadenza digital audio workstation.

Those are vendor demonstrations, chosen and run by Sber. They show the model driving software it was not trained on, but they are not a benchmark.

## The second report and the missing comparison

A technical report for the 708B model is published. Sber says a separate report for the 37B model will follow.

The gap that matters here is not parameter count but the shape of the win: open weights, a long context and a lead on tool use, paired with a 19.04-point deficit on Terminal-Bench 2.1 that Sber's own table reports. Independent runs on the same harnesses would show whether the agentic advantage survives outside vendor conditions. Until the 37B report lands, the compact model is documented mostly by analogy with its larger sibling.
