---
title: "Optimizing YARN using reinforcement learning"
date: "2024-08-09"
summary: "How I framed resource scheduling as an RL problem and compared policies against baselines."
tags: ["Reinforcement Learning", "Systems", "YARN"]
---

Cluster scheduling is full of trade-offs: utilization, fairness, and tail latency.

## Formulating the problem

- **State**: queue metrics, container usage, workload features
- **Action**: allocate / throttle / prioritize
- **Reward**: SLA adherence with penalties for tail latency

## What made experiments reliable

- A simulator loop with fixed seeds
- Baselines + ablations
- Metrics that matched real SLAs

