---
title: "Anthropic finds unlearning methods hide dangerous knowledge rather than delete it"
dek: "Two alignment posts make the case for reading models through single neurons, then use that reading to test whether safety training works."
research: true
channel: "ml"
publishedAt: "2026-11-25T06:15:00+05:30"
readingTime: 3
tags: ["anthropic", "interpretability", "unlearning", "alignment"]
sources:
  - title: "Returning to the Neuron Basis for Interpretability, Part 1: Answering Three Objections"
    url: "https://alignment.anthropic.com/2026/neuron-basis-theory"
    publisher: "Anthropic Alignment Science"
    published: "2026-11-23"
  - title: "Returning to the Neuron Basis for Interpretability, Part 2: Using Neurons For Safety Applications"
    url: "https://alignment.anthropic.com/2026/neuron-basis-applications"
    publisher: "Anthropic Alignment Science"
    published: "2026-11-23"
timeline: []
claimsChecked: 0
lead: false
draft: false
---

Anthropic published two alignment posts on 23 November 2026 arguing that individual neurons remain a usable unit for reading a model, and then used the method to show that most of the unlearning techniques it tested appear to hide hazardous knowledge rather than remove it.

The pair is built as argument and test. Part 1 answers three standing objections to neuron-level interpretability. Part 2 applies the answer to safety work in open-weight models, where the weights are available to whoever wants to look.

## The three objections

The first is that a single neuron often fires on several unrelated inputs. Anthropic reports that a neuron will contribute two unrelated concepts at once in about 1 percent or fewer of the cases it sampled.

The second is that the way a concept is represented can change between two layers. Anthropic reports that a neuron's output keeps roughly the same meaning across most layers.

The third is that facts seem to be spread across many neurons. Anthropic reports that although it usually takes changing many neurons to make a model get a fact wrong, the neurons involved generally represent concepts related to that fact. Distributed, the authors argue, and still readable.

## How a neuron is read

The method interprets each neuron's output vector, the direction it adds to the residual stream. A J-lens finds the tokens each output vector makes the model most likely to produce. Hypotheses are then tested with interventions: ablating neuron activation values, injecting their output vectors at other layers, and steering with them.

That combination is the reason the posts are worth reading as measurement rather than description. A label that survives ablation and injection is doing more work than a label attached to an activation.

## Detectors built without labels

Part 2 selects neurons by what makes them fire and what they contribute to a model's output. On 16 safety evaluation sets, neuron-based detectors selected without labeled examples outperformed text search on 11 sets, the authors report.

The same detectors matched or beat probes trained on 40 labeled examples on seven sets, and matched probes trained on 400 labels on four sets. A match was defined as performance within 0.02 between methods.

Anthropic reports that neurons generally detect harmful text better than keyword or similarity search, though usually less well than classifiers trained on labeled examples. Neurons chosen from their descriptions and readouts also beat sparse-autoencoder latents chosen from descriptions, alone or with the same readouts.

Selected neuron output vectors were about as effective as trained steering vectors at producing a target chatbot behaviour, with both approaches producing the target behaviour in 21 percent of responses.

## Unlearning that hides instead of deleting

The finding with consequences outside interpretability is about unlearning. Anthropic reports that most of the methods it tested appear to hide hazardous knowledge rather than remove it, and that neurons help show how.

The test used public WMDP-cyber checkpoints. WMDP-cyber is the cybersecurity subset of the WMDP benchmark, set up so that unlearning methods train a model to forget hazardous cybersecurity passages from GitHub while keeping performance on a retain corpus. Evaluation uses 1,987 multiple-choice questions about knowledge that could help a cyberattack.

That benchmark design makes a good score mean two things at once: the model still answers ordinary questions well and no longer answers the hazardous ones. The posts argue the second result can be achieved by suppression, which would leave the capability in place and the score looking clean.

## Auditing fine-tuned models

Anthropic reports that neurons also help an auditor find hidden behaviours in fine-tuned models. The company applied the method to model organisms of backdoors, emergent misalignment and subliminal learning.

These are deliberately constructed cases, which cuts both ways. A method that finds a planted backdoor has shown it can find a backdoor, not that it will find an unplanted one.

## What the posts do not claim

Anthropic states that the work does not claim a language model can be understood by inspecting single neurons alone. The neuron is a handle, not an explanation, and the safety results rest on selecting many of them and testing what their removal changes.

The unlearning result is the one to carry forward. A benchmark score for forgetting is evidence about behaviour on that benchmark. Whether the knowledge is gone or merely quiet is a separate question, and one that now has a published method for asking it.
