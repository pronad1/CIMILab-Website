---
title: "DERNet — Spinal Lesion Analysis"
slug: "dernet-spinal"
status: "Active"
pillar: "machine-intelligence"
themes:
  - "medical-health-ai"
  - "interpretable-ai"
summary: "Deep ensemble residual network for spinal lesion detection and classification on VinDr-SpineXR."
repoUrl: "https://github.com/CIMILab/Spinal_Lesion-VinDr-SpineXR"
paperUrl: ""
demoUrl: ""
coverImage: "/images/projects/dernet-cover.png"
contributors:
  - "dr-tanmoy-dey"
featured: true
order: 2
---

## Problem

Spinal lesion detection from X-ray images is a high-volume clinical task with significant inter-reader variability. Automated, consistent detection systems can reduce radiologist workload while flagging subtle pathologies that may be missed under time pressure.

## Approach

DERNet (**Deep Ensemble Residual Network**) addresses spinal lesion detection on the VinDr-SpineXR radiograph dataset. The architecture uses a residual backbone enhanced with spatial attention modules and is trained as an ensemble of independently-initialized models, enabling prediction-time uncertainty estimation through disagreement.

Key components:
- ResNet-based backbone with squeeze-and-excitation attention
- Multi-scale feature pyramid for detecting lesions of varying sizes
- Ensemble diversity training to maximize coverage of the prediction space
- Grad-CAM++ heatmaps for localization interpretability

## Results

Evaluated on the VinDr-SpineXR dataset:
- **mAP@0.5:** 0.74
- Strong performance on common lesion classes (fracture, disc herniation)
- Uncertainty maps correlate with rare or ambiguous cases

## Reproducibility

Full pipeline available in repository: data preprocessing, training, ensemble inference, and Grad-CAM visualization scripts.
