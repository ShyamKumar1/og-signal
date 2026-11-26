---
title: "India's Chariot-1 ships an 11-billion-parameter backbone for text and speech"
dek: "The MeitY-backed lab released a language model and a speech model trained from scratch, plus a shared alphabet for Indian scripts."
channel: "llm"
research: false
publishedAt: "2026-11-26T14:00:00+05:30"
readingTime: 4
tags: ["india", "foundation-models", "speech", "sovereign-ai"]
sources:
  - title: "Chariot One launch and research showcase"
    url: "https://chariot.in/chariot-one/"
    publisher: "Chariot"
    published: "2026-11-25"
  - title: "India launches indigenous Chariot-1 Foundation Models to strengthen sovereign AI capabilities"
    url: "https://aninews.in/news/business/india-launches-indigenous-chariot-1-foundation-models-to-strengthen-sovereign-ai-capabilities20261126133539"
    publisher: "ANI, reproducing the MeitY statement"
    published: "2026-11-26"
  - title: "IndiaAI-backed Chariot-1 combines text, speech and recognition in one model"
    url: "https://thehindubusinessline.com/info-tech/indiaai-backed-chariot-1-combines-text-speech-and-recognition-in-one-model/article71743519.ece/amp"
    publisher: "The Hindu BusinessLine"
    published: "2026-11-25"
  - title: "MeitY Secretary at the launch and Research Showcase of Chariot One"
    url: "https://pib.gov.in/ShowAlbum.aspx?albumid=234728&lang=1&reg=3"
    publisher: "Press Information Bureau"
    published: "2026-11-25"
timeline: []
claimsChecked: 0
lead: true
draft: false
---

MeitY Secretary S. Krishnan inaugurated the Chariot-1 Foundation Models on 25 November 2026 at Chariot One, a launch and research showcase at Bharat Mandapam in New Delhi. The models were developed by Chariot Artificial Intelligence Pvt. Ltd., one of the first four teams selected under the IndiaAI Mission to build sovereign foundation models. The event ran from 1:00 to 4:30 PM, with the launch and research showcase from 2:00 to 3:00 PM.

Chariot is headquartered in Delhi and was co-founded by Parth Sarthi and Suvrat Bhooshan. The launch and showcase was followed by a fireside conversation between Bhooshan and NVIDIA South Asia managing director Vishal Dhupar. Krishnan used the appearance to say the government's upcoming artificial intelligence regulation papers are in their final stages and will be released shortly.

## Two models, both trained from scratch

The Chariot-1 suite comprises a Chariot-1 Large Language Model and a Chariot-1 Text-to-Speech model. According to the MeitY statement, both were pre-trained from scratch in India. That detail is the centre of the announcement: the ministry is describing work done inside the country, not adaptation of an imported checkpoint.

The suite, as announced, lists two models. The lab's earlier releases, Chariot-1-ASR Realtime for speech recognition and Chariot-1-TTS-Multilingual for speech generation, were trained further from this foundation model. Chariot-1-ASR Realtime was published on 22 October 2026 and covers real-time recognition for 10 Indian languages.

Chariot-1-TTS-Multilingual followed on 12 November 2026. It covers 11 Indic languages and English, with more than 50 voices, code-mixing, voice cloning and context-aware pronunciation.

## The language model is small for the claim

The language model is an 11-billion-parameter mixture-of-experts model with four billion active parameters per token, according to the ministry statement. That is about 36.4 per cent of its parameters in use on any given token. It ships in three variants of 10.7 billion, 1.7 billion and 745 million parameters, aimed at different computational and deployment requirements.

The statement released with the launch reports accuracy figures for the speech model and not for the language model. So the only quantified performance claims attach to speech, even though the suite is presented as a text and speech foundation.

## A speech model measured on 1,029 sentences

The text-to-speech model generates speech in English and ten Indian languages: Hindi, Bengali, Marathi, Tamil, Telugu, Kannada, Malayalam, Gujarati, Punjabi and Odia. The ministry says it recorded over 97 per cent verbalisation accuracy on the Async TTS Pronunciation Benchmark, which comprises 1,029 real-world sentences and 2,251 instances of non-standard text across 42 categories.

The ministry also says the model recorded a character error rate of 7.60 per cent in Hindi and an average character error rate of 6.47 per cent across nine other Indian languages. It describes those as the lowest among the systems evaluated in the reported tests. These are ministry figures, reported by the same body that announced the launch.

## Fewer tokens for Indian scripts

Chariot-1 incorporates IndicShift, a shared alphabet for Indian scripts. The IndiaAI Mission says it processes Indian text using 2.5 times fewer tokens. The claim is about tokenisation rather than model capability.

IndicShift is described as a shared alphabet, not a separate model. Whether the 2.5 times figure holds outside the mission's own tests is not established in the release, and the figure is not attached to a named comparison system.

## Three sizes from one training run

Chariot-1 uses Nested Training, which produces three model sizes from a single training run. The company says the method makes training 62 per cent faster. Chariot also says its Mixture of Vocabularies approach delivers 38 per cent faster training.

Both are company claims, and neither comes with the baseline used for the comparison. Read together, they describe a lab trying to make repeated pre-training runs affordable rather than a single flagship checkpoint.

## One backbone for several jobs

Co-founder Parth Sarthi said the model combines text generation, text-to-speech and automatic speech recognition in a single architecture, reducing the need for separate specialised models. He put the design goal this way:

> "it is one model, a backbone that powers all these different applications"

That framing explains the release schedule. The ASR and multilingual TTS models customers can already use were built on top of the backbone rather than alongside it.

## What the numbers do not cover

The benchmark figures in the launch material come from the organisation that built the models, and the ministry repeats them without an external evaluation. There is no reported result for reasoning, code or long-context work on the language model. The speech figures cover pronunciation and character error rates, not whether listeners prefer one voice over another.

For a sovereign programme, the more telling number may be the size of the release. Eleven billion parameters with four billion active is a deployment-first design, and the ministry's own variant list starts at 745 million. The next thing to watch is the regulation papers Krishnan said are in their final stages.
