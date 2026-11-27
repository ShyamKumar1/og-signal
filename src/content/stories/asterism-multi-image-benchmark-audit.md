---
title: "A quarter of multi-image benchmark items can be answered from one image"
dek: "An audit of about 33,000 items from 19 public benchmarks rebuilt the test set around the items that genuinely need more than one picture."
channel: "ml"
research: true
publishedAt: "2026-11-27T06:00:00+05:30"
readingTime: 3
tags: ["multimodal", "benchmarks", "reinforcement-learning", "arxiv"]
sources:
  - title: "ASTERISM: Do Multimodal LLMs Actually Look at All the Images?"
    url: "https://arxiv.org/abs/2611.32316"
    publisher: "arXiv"
    published: "2026-11-24"
paper:
  title: "ASTERISM: Do Multimodal LLMs Actually Look at All the Images?"
  venue: "arXiv preprint, cs.CV"
  id: "arXiv:2611.32316"
  url: "https://arxiv.org/abs/2611.32316"
timeline: []
claimsChecked: 0
lead: false
draft: false
---

The paper audits about 33,000 items drawn from 19 public multi-image benchmarks. A two-stage single-image filter found that one image, or the question alone, settles 24.2 per cent of those items. That is roughly one item in four on a test set whose purpose is to measure reasoning across several images.

ASTERISM: Do Multimodal LLMs Actually Look at All the Images? is by Chanseul Cho, Dongwoo Kim, Noori Bae, Seungjae Moon, Seongsu Lee and Youngmin Ro. It was submitted on 24 November 2026 and appeared in arXiv's new listings on 26 November.

## The shortcut, measured

On those items, multimodal models recover a median 78 per cent of the accuracy that all images together add over text alone, using a single image. The authors call this the single-image shortcut. It is a specific claim about where accuracy comes from, not a general statement that models cannot look at several images at once.

The number to hold on to is the median: half the items of this kind give up more than 78 per cent of the multi-image gain, half give up less. The shortcut is not a rare failure mode at the tail of the distribution.

## Wrong answers that repeat

The authors report that models take the shortcut even on items where one image is not enough. On such items, most wrong answers repeat an answer the model gives from one image, at a rate above chance. That pattern is what separates a shortcut from a guess. A model that has genuinely tried to combine two images tends to fail in new ways; a model that has read one image fails the way it already failed.

The finding also shifts where the problem sits. If the benchmark items can be answered from one image, then a high score on them says less about multi-image reasoning than the score suggests.

## Rebuilding the set around hard items

The authors build ASTERISM by keeping only the items that need more than one image. That leaves 18.7 thousand items, about 56.7 per cent of the audited pool, with 2.0k of them corrected or rewritten, about 10.7 per cent of what survived. The set uses one format, one scorer and seven task categories.

They release ASTERISM-Train with 49k training items, and ASTERISM-Lite, a hard subset whose items were verified by hand one by one. On ASTERISM-Lite the strongest proprietary multimodal model scores 68 per cent.

That is the headline result of the rebuild: the best closed model, on items that survived an audit for single-image answerability, scores 68 per cent. The figure is the authors' measurement on their own set, and the set is new, so there is no history to compare it against.

## Why the reward favours one image

The authors argue that reinforcement learning with verifiable rewards rewards the shortcut. An answer read off one image earns the same reward as one that combines images, because the verifier checks the answer and not the route. They find that existing RLVR objectives add little to the ASTERISM score.

The argument is about credit assignment rather than data. If a training item can be solved from one image, the gradient points at the behaviour that solves it, and the behaviour is looking at less.

## Credit assigned across images

They propose cross-image credit assignment, CICA, an extension of RLVR that moves credit toward the tokens that need more than one image. On three open-source multimodal models, CICA raises the ASTERISM score by 2.6 to 6.0 points. The authors say that is more than twice the gain of each general and vision-specific reinforcement learning objective trained on the same data.

A gain of 2.6 to 6.0 points is modest in absolute terms and comes from the authors' own method on their own benchmark. The comparison that carries weight is the one against other objectives trained on identical data, because that controls for the data and isolates the credit assignment.

## What the paper does not settle

The audit covers public benchmarks, and the 24.2 per cent figure is an estimate from a two-stage filter, not a manual review of all 33,000 items. The hand verification is confined to ASTERISM-Lite.

The useful reading is narrower than "multimodal models cannot reason across images". It is that a measurable share of the tests used to make that claim does not require it, that models exploit the gap, and that changing how reward is assigned moves the score more than changing the objective. Code and datasets are published at github.com/chanseul01/ASTERISM. The next check is whether CICA's gain survives on benchmarks the authors did not build.
