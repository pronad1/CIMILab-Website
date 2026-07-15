---
title: "CIMILab-Deploy"
slug: "cimilab-deploy"
status: "Planned"
pillar: "translational-ai"
themes:
  - "efficient-ai"
summary: "Production deployment toolkit for CIMILab's medical AI models — serving, monitoring, and edge optimization."
repoUrl: "https://github.com/CIMILab/CIMILab-Deploy"
paperUrl: ""
demoUrl: ""
coverImage: "/images/projects/cimilab-deploy-cover.png"
contributors:
  - "dr-tanmoy-dey"
featured: false
order: 6
---

## Problem

Translating a well-performing research model into a reliable clinical tool requires engineering that goes far beyond model training: efficient inference, serving infrastructure, monitoring for distribution shift, and optimization for low-resource settings. CIMILab-Deploy bridges this gap.

## Approach

CIMILab-Deploy will provide deployment-ready wrappers and tooling for CIMILab's trained models:

- **Optimized inference:** ONNX export, TensorRT optimization, quantization pipelines (INT8/FP16)
- **Serving infrastructure:** FastAPI-based REST endpoints with async batch inference
- **Uncertainty-aware outputs:** Every deployed model exposes confidence estimates alongside predictions
- **Edge adaptation:** Lightweight model variants for deployment on resource-constrained hardware in low-resource clinical settings
- **Monitoring hooks:** Data drift detection, performance degradation alerts

## Status

CIMILab-Deploy will initially wrap the DSANet-ISLES segmentation model. The existing `deploy_DSANet_ISLES22` repository provides the foundation; this project generalizes it into a reusable framework.
