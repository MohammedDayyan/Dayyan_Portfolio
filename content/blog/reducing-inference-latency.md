---
title: "How I reduced inference latency by 56%"
date: "2025-11-18"
summary: "A practical walkthrough of profiling, export paths, and runtime optimizations that moved p95 latency from 220ms to 124ms."
tags: ["MLOps", "Inference", "Performance"]
---

Most “slow model” problems aren’t caused by the model alone — they’re usually a pipeline problem.

## What I measured first

- **p50 / p95 latency** at the API boundary
- **CPU vs GPU utilization**
- **serialization + image preprocessing cost**
- **queue time** (under concurrency)

## The fixes that mattered

1. **Exported the model** to a runtime-friendly format (e.g. ONNX) and validated parity on a fixed evaluation set.
2. **Removed redundant preprocessing** by making it a single, shared, tested function.
3. **Batched requests** under load (small batches, strict time budget).
4. **Quantized** where it didn’t hurt quality.

## What I’d do next

- Add automated regression checks for latency + accuracy.
- Monitor for drift and silent model degradation.

