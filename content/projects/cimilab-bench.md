---
title: "CIMILab-Bench"
slug: "cimilab-bench"
status: "Planned"
pillar: "computational-informatics"
themes:
  - "benchmarking-evaluation"
summary: "A unified benchmarking and evaluation framework for medical AI models — standardized protocols, metrics, and leaderboards."
repoUrl: "https://github.com/CIMILab/CIMILab-Bench"
paperUrl: ""
demoUrl: ""
coverImage: "/images/projects/cimilab-bench-cover.png"
contributors:
  - "dr-tanmoy-dey"
  - "priya-nair"
featured: false
order: 4
---

## Problem

Medical AI research suffers from evaluation fragmentation: different papers use different preprocessing pipelines, train/test splits, and metrics, making results incomparable. There is a need for a centralized, community-usable benchmark suite that enforces fair, reproducible comparison.

## Approach

CIMILab-Bench will provide a standardized evaluation framework for medical image segmentation and classification tasks. It will include:

- **Standardized splits:** Fixed, documented train/val/test partitions across common public datasets (ISLES, BraTS, LIDC, VinDr)
- **Metric suite:** Dice, Hausdorff distance, calibration metrics, fairness metrics, and uncertainty-quality metrics in one consistent toolkit
- **Submission protocol:** Structured submission format so any model's outputs can be evaluated under the same pipeline
- **Leaderboard:** Public leaderboard tracking reproducible results from CIMILab experiments and invited submissions

## Status

CIMILab-Bench is in the design and planning phase. Expected initial release in Q4 2026 covering stroke lesion segmentation (ISLES 2022) and spinal lesion detection (VinDr-SpineXR).
