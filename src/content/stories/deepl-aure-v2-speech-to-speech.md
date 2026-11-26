---
title: "DeepL says Aure v2 halves speech translation delay with a single model"
dek: "The Tokyo launch collapses transcription, translation and speech generation into one network trained to judge when it has heard enough."
channel: "ai"
research: false
publishedAt: "2026-11-26T14:00:00+05:30"
readingTime: 4
tags: ["translation", "speech", "deepl", "voice"]
sources:
  - title: "DeepL introduces Aure v2, its fastest Voice AI translation model"
    url: "https://www.deepl.com/en/press-release/aure-v2"
    publisher: "DeepL"
    published: "2026-11-26"
timeline: []
claimsChecked: 0
lead: false
draft: false
---

DeepL launched Aure v2, a voice translation model, at its inaugural Unmute Summit in Tokyo on 26 November 2026. The model is available now to DeepL Voice customers. DeepL says it cuts translation delay by 50 per cent against Aure, the model it released earlier in November 2026, which adapted to a speaker's voice, tone and intonation during a conversation.

The comparison is DeepL's own. The company says Aure v2 achieved a 50 per cent lower median translation delay than Aure in its internal benchmarks. It also says the model reached higher translation quality than six competing systems tested, in every language pair, and produced 32 per cent fewer English-Japanese translation errors than Google Gemini 3.5 Live Translate. Those are vendor figures from the company selling the product.

## One model replaced three stages

Aure v2 uses a new end-to-end architecture that translates directly from speech to speech. The older arrangement ran separate transcription, translation and speech-generation stages. Collapsing them removes the point where a transcript has to be finished before translation can begin.

DeepL frames the change as architectural rather than a tuning exercise. The company built the model to take audio in and produce audio out.

## Reinforcement learning taught it when to start

DeepL trained the model with reinforcement learning because high-quality recordings of real-time speech translation with the right timing and expression are scarce. During training, Aure v2 was rewarded for translations that were both accurate and quick to start. The effect, as DeepL describes it, is that the model learned when it had heard enough context to begin translating.

DeepL says the timing decision matters most for languages such as German and Japanese, where essential information can arrive at the end of a sentence. A model that waits for the full clause sounds slow. One that starts too early has to guess at meaning it has not heard yet.

Sebastian Enderlein, DeepL's chief technology officer, described the trade-off as the core problem:

> "The key to real-time translation isn't simply processing speech faster - it's knowing when you have enough information to translate accurately"

## The delay figure comes from one-minute clips

The internal benchmark was a DeepL study in November 2026 on one-minute real-speech recordings across 10 language pairs, with human-validated transcripts. All models were tested over public APIs, with no application overhead added. DeepL says results may differ in real conversations.

Every measurement behind the 50 per cent figure comes from a one-minute recording. That captures how quickly a model begins speaking, and says little about a longer conversation where errors compound. The company's own caveat is the honest reading of the number.

## Six languages at launch

Aure v2 supports six languages at launch: English, German, French, Spanish, Japanese and Korean. It is available across DeepL Voice for Online Meetings, DeepL Voice for In-Person Conversations and the DeepL API for Voice. For supported languages it is enabled automatically, without additional setup.

Japanese and Korean in the first set match where DeepL reports its fastest usage growth, and the English-Japanese comparison with Gemini is the only competitor result the company names.

## Growth is reported as multiples

DeepL says DeepL Voice usage rose more than 8x year over year in Q3 2026, measured in total voice minutes, and that translated meeting minutes rose by approximately 7x. It says Q3 2026 meeting usage grew more than 7x in Japan and 5x in South Korea, and more than 6x in both the United States and Germany, measured by minutes spent in meetings.

As of October 2026, the company says the number of active DeepL Voice subscriptions with meeting usage grew approximately 12x year over year in Japan and South Korea combined, 8x in the United States and 9x in Germany. Every one of those is a multiple with no absolute base attached, so they cannot be turned into a market size from the release alone.

## What the enterprise customer is promised

DeepL says that for enterprise customers, audio, transcriptions and translations are not used to train its models. Meeting data is deleted when calls end, subject to customer-controlled retention settings. The company says it holds ISO 27001 and SOC 2 Type II certifications and supports GDPR compliance.

Those terms matter more for voice than for text. A translation model trained on customer calls would learn from exactly the material enterprises are least willing to hand over, and DeepL's answer is that it does not use it.

## The claim that needs an outside test

Only one of the six competitor comparisons is named in the material DeepL released: Gemini 3.5 Live Translate, on English-Japanese, where the company reports 32 per cent fewer errors. The other five systems, the language pairs and the quality metric are not specified in the release.

Jarek Kutylowski, DeepL's chief executive, said the more interesting question is "what this makes possible for our customers" rather than the delay figure itself.

The next thing to watch is measurement on full meetings rather than one-minute clips, by someone other than DeepL.
