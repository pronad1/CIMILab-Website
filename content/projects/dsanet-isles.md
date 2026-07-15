---
title: "DSANet-ISLES"
slug: "dsanet-isles"
status: "Active"
pillar: "machine-intelligence"
themes:
  - "medical-health-ai"
  - "interpretable-ai"
summary: "Interpretable multi-architecture ensemble for ischemic stroke lesion segmentation on the ISLES benchmark."
repoUrl: "https://github.com/CIMILab/StrokeDSANet_ISLES22"
paperUrl: ""
demoUrl: ""
coverImage: "/images/projects/dsanet-isles-cover.png"
contributors:
  - "dr-tanmoy-dey"
  - "aisha-rahman"
featured: true
order: 1
---

## Problem

Accurate and reliable segmentation of ischemic stroke lesions from MRI scans is critical for clinical decision-making, treatment planning, and outcome prediction. Existing deep learning approaches often sacrifice interpretability for performance, making it difficult for clinicians to trust or audit model outputs.

## Approach

DSANet-ISLES introduces a **Dual-Stream Attention Network** that combines CNN-based local feature extraction with transformer-based global context modeling. The ensemble architecture integrates multiple complementary backbones, and a novel uncertainty quantification module provides per-voxel confidence estimates alongside the segmentation output.

Key innovations:
- Dual-stream encoder: CNN + Transformer operating in parallel
- Attention-guided fusion of multi-scale features
- Monte Carlo Dropout for calibrated uncertainty maps
- Ablation-documented training protocol on ISLES 2022

## Results

Evaluated on the public ISLES 2022 benchmark:
- **Dice Score:** 0.82 (±0.04)
- **Lesion-wise F1:** 0.79
- Performance competitive with top-ranked methods while providing interpretable uncertainty maps

## Reproducibility

All training scripts, preprocessing pipelines, model weights, and evaluation code are available in the repository. Fixed seeds, documented hyperparameters, and scripted evaluation ensure full reproducibility per the CIMILab Reproducibility Standard.
