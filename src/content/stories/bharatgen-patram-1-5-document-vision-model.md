---
title: "BharatGen's Patram 1.5 reads documents as images and says what it cannot"
dek: "The 7-billion-parameter model ships as open weights and was trained to flag illegible fields rather than guess, with its benchmark due out shortly."
channel: "ai"
research: false
publishedAt: "2026-11-27T06:00:00+05:30"
readingTime: 4
tags: ["bharatgen", "document-ai", "vision-language", "open-weights"]
sources:
  - title: "BharatGen launches Patram 1.5, an Indian vision-language model for documents and images"
    url: "https://bharatgen.com/assets/media-kit/files/press/patram-1-5-press-release.pdf"
    publisher: "BharatGen"
    published: "2026-11-26"
timeline: []
claimsChecked: 0
lead: false
draft: false
---

BharatGen launched Patram 1.5 on 26 November 2026 in New Delhi. It is a 7-billion-parameter vision-language model, released as open weights on Hugging Face. Seven billion parameters is small enough, in principle, to run inside an institution's own hardware rather than behind someone else's API, which is the argument the release is built around.

## The page is an image, not a text extraction

Patram 1.5 reads documents as images, including scans, photographs of pages and forms. It also handles photographs and diagrams, and several images in one request. It returns text including Markdown, HTML and JSON. It supports English and English mixed with Indian languages, with a context length of up to 32K tokens.

BharatGen calls its approach OCR 3.0. A user describes in plain language only the information needed, and the model returns it in the structure the user's own systems use. That removes the separate extraction step that most document pipelines place in front of a language model, and with it a stage where errors are introduced before the model sees anything.

## Trained to state what it cannot read

The design decision BharatGen stresses is refusal. When a field is blank or a figure is illegible, the model was trained to state what it cannot read and why, rather than guessing. Where it does make a reasonable guess, it flags the guess for a person to check. When a question is ambiguous, such as a date on a bill that shows several dates, the model asks which one is meant.

That is a different target from raw transcription accuracy. A model that fills a blank field with a plausible number is worse than useless in a lending file, because the error travels without a marker. BharatGen's claim is that the marker is part of the output.

## A benchmark that is not public yet

BharatGen evaluated Patram 1.5 on 49 tests: 34 public benchmarks and 15 tasks from PatramBench, its own benchmark built from 8,773 pages of Indian documents. PatramBench contains 11,828 test items and is to be released on Hugging Face in the coming days. The comparison set covered 20 other image-reading models, both specialist and general-purpose, of up to 763 billion parameters, and seven specialist OCR systems.

The results are BharatGen's own, on a benchmark BharatGen built, and the items are not yet downloadable. Until PatramBench is out, the comparison is a vendor claim with a publication date attached, not a reproducible one.

## A consortium, not a startup

BharatGen is a Section 8 not-for-profit AI company, backed by the Department of Science and Technology and the IndiaAI Mission under MeitY. It was established in October 2024, is anchored at IIT Bombay and draws on a consortium of nine Indian academic institutions. The Patram family began with Patram 1 in June 2025.

Rishi Bal, BharatGen's chief executive:

> A model alone can only take you so far. The BharatGen Playground gives the world a full stack for document intelligence, with models, solutions and workflows working together.

## The playground carries the workflow

Patram 1.5 is available on the BharatGen Playground, which offers Chat plus ready-made Parse, Extract, Classify, Split and Section tools. Digitize, Translate and Edit are announced as coming soon. The framing is deliberate: the model is one component of a document pipeline rather than a chat endpoint, and the named tools map onto steps that a back-office team already runs by hand.

Ravi Kiran Sarvadevabhatla, a professor at IIIT Hyderabad and a consortium member, described the release as charting "a new capability frontier for sovereign vision models and document understanding workflows". The word sovereign is the tell. The pitch is not that Patram 1.5 beats the largest general models on documents, but that an Indian institution can hold the weights, the data path and the workflow inside its own perimeter.

## Small models and the sovereign argument

The 7-billion-parameter size sets what the release can claim. A model that fits on modest hardware can be audited, fine-tuned on a bank's own forms and kept off a foreign vendor's servers. The trade is capability: the comparison set reaches 763 billion parameters.

The behaviour around illegible fields is the part worth testing first. If the model reports a blank where a blank exists, and asks which date is meant when a bill shows several, then the error rate a reviewer sees is closer to the error rate the model makes. If it does not, the pipeline inherits silent failures at the first step.

## The next item to check

PatramBench, 11,828 items on Hugging Face, is the document that turns the 49-test evaluation into something another lab can run. Watch whether the 15 PatramBench tasks in the launch material hold their margins once the scorer is public.
