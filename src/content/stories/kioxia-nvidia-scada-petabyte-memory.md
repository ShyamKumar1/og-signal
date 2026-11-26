---
title: "Kioxia and NVIDIA put a 2-trillion-vector database on 144 SSDs"
dek: "The demonstration pushes a vector index out of high-bandwidth memory and into flash, and reports capacity rather than speed."
channel: "technology"
research: false
publishedAt: "2026-11-26T14:00:00+05:30"
readingTime: 3
tags: ["memory", "storage", "nvidia", "kioxia", "inference"]
sources:
  - title: "Kioxia and NVIDIA Collaborate to Expand Effective High-Bandwidth Memory Capacity with SSDs"
    url: "https://www.kioxia.com/en-jp/business/news/2026/20261126-1.html"
    publisher: "Kioxia"
    published: "2026-11-26"
timeline: []
claimsChecked: 0
lead: false
draft: false
---

Kioxia announced on 26 November 2026 a collaboration with NVIDIA demonstrating the potential to extend effective GPU memory capacity to petabyte scale. The work uses NVIDIA SCADA software and Kioxia SSDs and supports NVIDIA's Storage-Next initiative. Kioxia calls the result a demonstration, and the numbers it released are capacity figures rather than throughput figures.

## A 2-trillion-vector database on one rack

The demonstration processed a database of 2 trillion vectors on an NVIDIA GB200 NVL72 rack-scale system. The rack carried 144 Kioxia XD8 Series 7.68 TB E1.S NVMe SSDs. At 7.68 TB per drive, the flash in the rack comes to just over 1.1 PB.

The proof of concept used 18 server nodes and about 1.1 PB of raw SSD capacity. Those three descriptions, 144 drives, 18 nodes and 1.1 PB, are the whole hardware picture given in the announcement.

## Eight drives per node and nearly 60 TB of extended memory

Each node supported eight SSDs. The configuration supports nearly 60 TB of flash-based extended memory capacity per node. Across 18 nodes that comes to 1,080 TB, or about 1.08 PB.

The distinction between raw capacity and extended memory capacity is the one worth keeping straight. The first is what the drives hold. The second is how much of that flash the GPU can address as though it were part of its own memory, which is the quantity the demonstration is about.

## Why high-bandwidth memory runs out

Kioxia says rapid growth in AI datasets is placing increasing pressure on high-bandwidth memory capacity. Processing those datasets with HBM alone can require dividing workloads into smaller segments and repeatedly moving data between memory and slower storage. Each of those moves costs time that the GPU spends waiting.

The company presents the SSD tier as a way around the segmentation. Instead of breaking a large index into pieces that fit in HBM, the index lives on flash and the GPU reads from it through the SCADA library. The segmentation is what turns a capacity limit into a scheduling problem.

## SCADA is the software layer

NVIDIA SCADA stands for Scaled Accelerated Data Access. It is a software library designed to extend effective GPU memory capacity using NVMe SSDs, including fine-grained data access with small block sizes. In this configuration it is the component that lets the GPU address flash directly.

The hardware alone would not produce the result. The kit is a rack of NVMe drives; the claim rests on the library's ability to serve small reads.

## 512-byte access is the point

The system supports 512-byte accesses, with the potential to support 2 trillion 512-byte vectors across the architecture. Those are the two figures the release attaches to the architecture: the access size, and the number of vectors it can address.

Neither comes with a stated latency for a lookup at that scale.

## Where the claim stops

Kioxia says the approach can support large-scale vector databases and the processing of large datasets used in graph neural networks. Both are described as capabilities rather than as workloads measured in the release. The announcement gives no comparison of latency, throughput or cost against a system that keeps the same index in HBM.

Kioxia says the proof-of-concept testing was performed by Kioxia and NVIDIA as of 26 November 2026. The two companies say they remain engaged in evaluating the technical feasibility and performance of NVIDIA SCADA and the Storage-Next architecture. Kioxia also says it continues development of the XD8 Series and its GP Series Super High IOPS SSDs.

## What would settle the question

The capacity argument rests on the density figures above. The open question is what a vector query costs when it has to cross the boundary between HBM and flash, and the release does not answer it.

A measured workload, with latency and throughput alongside the capacity figures, would turn the demonstration into a result. Until then, the honest reading is that the memory wall has a proposed answer, not a proven one. The two companies' own wording, that they remain engaged in evaluating feasibility, is the closest thing to a status report in the announcement.
