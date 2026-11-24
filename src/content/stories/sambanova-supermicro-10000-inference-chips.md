---
title: "SambaNova and Supermicro plan 10,000 inference chips for neoclouds"
dek: "The first racks of SN50 systems go to neoclouds and sovereign clouds, mixing inference accelerators with GPUs before enterprises get a look."
channel: "technology"
edition: "morning"
publishedAt: "2026-11-25T04:30:00+05:30"
readingTime: 3
tags: ["inference", "silicon", "data centres", "sovereign cloud"]
sources:
  - title: "SambaNova SN50 Chips to Power Supermicro's New Inference Racks"
    url: "https://storagenewsletter.com/2026/11/24/sambanova-sn50-chips-to-power-supermicros-new-inference-racks"
    publisher: "StorageNewsletter"
    published: "2026-11-24"
timeline: []
claimsChecked: 8
verifiedAt: "2026-11-25T04:50:00+05:30"
lead: false
draft: false
---

SambaNova and Supermicro announced a strategic collaboration on 24 November that initially plans for 10,000 SN50 RDU chips from SambaNova. The chips go into disaggregated inference systems that combine RDUs with GPUs, sold as part of Supermicro's Data Center Building Block Solutions portfolio. Supermicro will integrate, test, deliver and support the systems, including on-site service.

## Ten thousand chips is a first batch, not a market

The number is specific enough to mean something and small enough to be a pilot. Ten thousand accelerators is a meaningful order for a challenger chip, and small against what the largest buyers commit. Neither company put a value on it.

The framing is also narrower than a general hardware partnership. These are inference systems, not training clusters, and the customer list starts with neoclouds and sovereign clouds before it reaches enterprises running AI in their own data centres. That ordering says where the two companies expect the first revenue to come from.

## RDUs sit beside GPUs in one rack

The architecture is deliberately mixed. Disaggregated inference systems combine SambaNova's RDUs with GPUs rather than replacing the GPUs outright, which keeps a buyer's existing accelerator investment in the rack and adds specialised inference capacity alongside it.

Charles Liang, president, chief executive and chief business officer of Supermicro, said the collaboration expands the DCBBS portfolio by enabling heterogeneous architectures that integrate GPU computing with specialised inference acceleration. That is the commercial argument in one sentence: the rack changes shape without the customer changing vendor.

Heterogeneous racks are harder to operate than uniform ones. Someone has to make the scheduler treat two kinds of accelerator as one pool, and someone has to support the result when a model runs badly on one of them.

## SambaNova tunes, Supermicro ships

The division of labour is clean. SambaNova engineers will get models running and tuned on SN50 and help Supermicro with deployments. Supermicro handles integration, testing, delivery and support, including service on site.

That arrangement puts the model work with the chip designer and the logistics with the systems builder, which is how a smaller silicon company gets into racks it could not build itself. It also means the quality of a deployment depends on two support organisations agreeing about whose problem a slow model is.

Rodrigo Liang, cofounder and chief executive of SambaNova, said agentic AI is the next wave of inference and has to run everywhere. The claim is doing double duty: it justifies a dedicated inference chip, and it justifies selling that chip through someone else's supply chain.

## Inference is separating from training

The strategic interest here is not the chip. It is the split. Training clusters are bought in large blocks by a handful of labs, priced against memory bandwidth and interconnect, and depreciated over years. Inference is bought in smaller blocks by many more customers, priced against tokens per second per dollar, and sensitive to the cost of a query rather than the cost of a run.

Those are different businesses with different buyers. A vendor that only sells training hardware has to win the largest contracts. A vendor that sells inference hardware can win many small ones, which is the gap SambaNova and Supermicro are aiming at.

Neoclouds and sovereign clouds are the obvious first customers because they resell capacity and compete on price per token. Enterprises come later because they buy outcomes, not racks, and take longer to qualify a new accelerator.

## What the announcement leaves out

There is no delivery schedule, no contract value, and no performance figure for the SN50 in the material reported. Ten thousand chips is a plan, and a plan with no dates attached cannot be read as a shipment.

There is also no named customer. Neoclouds and sovereign clouds are categories, not companies, and the first deployment will say more about the SN50 than the announcement does.

## The next thing to watch

Watch for the first named neocloud deployment and for a tokens-per-second figure that comes from the operator rather than the vendor. Watch, too, for whether the enterprise phase arrives on its own or gets quietly folded into the sovereign cloud tier.

If inference silicon does split from training GPUs as a separate market, this is what the split looks like at the start: a modest order, a heterogeneous rack, and a support contract that decides whether the customer keeps it.
