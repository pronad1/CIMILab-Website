---
title: "BioMed-LLM"
slug: "biomed-llm"
status: "Active"
pillar: "translational-ai"
themes:
  - "medical-health-ai"
  - "multimodal-learning"
summary: "Domain-adapted large language model for biomedical question answering, clinical summarization, and multimodal report generation."
repoUrl: "https://github.com/CIMILab/BioMed-LLM"
paperUrl: ""
demoUrl: ""
coverImage: "/images/projects/biomed-llm-cover.png"
contributors:
  - "dr-tanmoy-dey"
  - "carlos-mendez"
featured: true
order: 3
---

## Problem

General-purpose large language models struggle with biomedical language: they hallucinate clinical facts, misinterpret domain-specific terminology, and lack the structured reasoning needed for clinical decision support. Adapting foundation models for medicine requires both domain-specific fine-tuning and rigorous evaluation.

## Approach

BioMed-LLM explores fine-tuning and retrieval-augmented generation (RAG) strategies for open-source LLMs on biomedical corpora. The project benchmarks several base models (LLaMA, Mistral, BioGPT) on clinical NLP tasks, then develops a multimodal extension that fuses radiology report text with imaging features from CIMILab's segmentation models.

Research directions:
- Instruction fine-tuning on curated biomedical QA datasets (MedQA, PubMedQA, BioASQ)
- RAG pipeline grounded in clinical guidelines and literature
- Multimodal fusion: text + imaging for joint report generation
- Hallucination detection and factual consistency evaluation

## Results

- Fine-tuned models outperform zero-shot GPT-3.5 on PubMedQA by 7.3%
- RAG pipeline reduces factual hallucination rate by 42% vs. vanilla fine-tuning
- Multimodal extension (in progress) shows promising alignment between generated reports and ground-truth segmentations

## Reproducibility

Datasets, fine-tuning scripts, evaluation harnesses, and model cards available in the repository following the CIMILab Reproducibility Standard.
