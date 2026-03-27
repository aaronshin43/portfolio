import type { ResearchPosition } from "./types";

export const research: ResearchPosition = {
  role: "Undergraduate Researcher",
  institution: "Dickinson College",
  location: "Carlisle, PA",
  period: "Jan 2026 – Present",
  items: [
    {
      id: "nanogpt-framework",
      title: "Experimental NanoGPT Framework",
      description:
        "Architected a custom NanoGPT/PyTorch experimental framework for Transformer training, integrating Early Stopping for sampling and standardized data preprocessing pipelines to enhance experiment efficiency.",
      icon: "flask",
      tags: ["NanoGPT", "PyTorch", "Transformers", "Early Stopping"],
    },
    {
      id: "target-masking",
      title: "Target Masking in Autoregressive Generation",
      description:
        "Investigated the impact of target masking on autoregressive generation, demonstrating that restricting cross-entropy loss to output tokens prevents overfitting to input noise.",
      icon: "brain",
      tags: ["Autoregressive", "Cross-Entropy", "Overfitting", "Masking"],
    },
    {
      id: "cot-generalization",
      title: "Zero-Shot Length Generalization via CoT",
      description:
        "Analyzed zero-shot length generalization in small Transformers using Chain-of-Thought scratchpad mechanisms, implementing curriculum learning strategies to overcome fixed-depth structural limitations.",
      icon: "chain",
      tags: [
        "Chain-of-Thought",
        "Curriculum Learning",
        "Zero-Shot",
        "Length Generalization",
      ],
    },
  ],
};
