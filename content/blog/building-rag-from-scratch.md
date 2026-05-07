---
title: "Building a RAG system from scratch"
date: "2025-10-02"
summary: "Designing chunking, retrieval, citations, and evaluation so your assistant stays grounded."
tags: ["RAG", "LLMs", "Search"]
---

RAG is not “add a vector DB and prompt the model”.

## The architecture I like

- **Ingestion**: clean → chunk → embed → store
- **Retrieval**: hybrid (BM25 + dense) when you can
- **Generation**: concise answer + explicit citations
- **Evaluation**: retrieval precision + answer faithfulness

## Guardrails

- Reject answers without citations for knowledge questions.
- Use a short “I don’t know” fallback when retrieval is weak.

