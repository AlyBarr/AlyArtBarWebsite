/* ═══════════════════════════════════════════════════════
   data/projects.js — YOUR CONTENT
   Edit this file to update projects on the site.
   
   featured: true  → large alternating row (max 2–3)
   featured: false → smaller grid card
   image: ""       → shows placeholder until you add one
   image: "assets/images/filename.jpg" → your image
═══════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: "proc-terrain",
    featured: true,
    category: "Procedural Systems",
    title: "Procedural Terrain Generator",
    oneliner: "A Houdini HDA for generating layered, art-directable terrain with biome masking.",
    bullets: [
      "Designed node graph with exposed parameters for art direction without breaking procedural rules",
      "Implemented multi-layer noise blending with custom VEX wrangles for erosion simulation",
      "Packaged as an HDA for pipeline integration with LOD-aware output for game engine export"
    ],
    tools: ["Houdini", "VEX", "Python", "Unreal Engine"],
    image: "",  // → "assets/images/terrain.jpg"
    links: [
      { label: "GitHub", url: "#" },
      { label: "Video",  url: "#" }
    ]
  },
  {
    id: "usd-pipeline",
    featured: true,
    category: "Pipeline & Tools",
    title: "USD Asset Pipeline Tool",
    oneliner: "A Python tool for batch-exporting and validating assets into a USD-based pipeline.",
    bullets: [
      "Built Maya-to-USD export scripts with custom metadata tagging for downstream consumption",
      "Wrote a validation layer that checks asset structure and reports errors before export",
      "Reduced export iteration time by parallelizing asset processing"
    ],
    tools: ["Python", "USD", "Maya", "PyQt"],
    image: "",
    links: [
      { label: "GitHub",  url: "#" },
      { label: "Writeup", url: "#" }
    ]
  },
  {
    id: "shader-studies",
    featured: false,
    category: "Rendering",
    title: "GLSL Shader Studies",
    oneliner: "Real-time shader experiments: procedural noise, SDF rendering, and stylization.",
    bullets: [
      "Fragment shaders with domain-warped noise and animated SDF shapes",
      "Documented mathematical approach for each in accompanying writeups"
    ],
    tools: ["GLSL", "WebGL", "Shadertoy"],
    links: [{ label: "Shadertoy", url: "#" }]
  },
  {
    id: "maya-tool",
    featured: false,
    category: "Tool Development",
    title: "Maya Rigging Helper",
    oneliner: "Python/PyQt tool that automates repetitive rigging tasks in Maya.",
    bullets: [
      "Batch joint renaming, orientation fixing, and constraint setup",
      "Saves hours of manual work on rig prep stages"
    ],
    tools: ["Python", "Maya", "PyQt"],
    links: [{ label: "GitHub", url: "#" }]
  },
  {
    id: "fluid-sim",
    featured: false,
    category: "Simulation",
    title: "Fluid FX Study",
    oneliner: "Houdini FLIP simulations for directable ocean and splash FX.",
    bullets: [
      "Explored FLIP solver parameters for large-scale water behavior",
      "Built lightweight caching and rendering pipeline for sim outputs"
    ],
    tools: ["Houdini", "Karma", "VEX"],
    links: [{ label: "Video", url: "#" }]
  }
];

/* ═══════════════════════════════════════════════════════
   R&D ENTRIES — status: "live" | "wip" | "exploring" | "archived"
═══════════════════════════════════════════════════════ */
const RND_ENTRIES = [
  {
    status: "live",
    title: "Batch Asset Validator",
    hypothesis: "A lightweight Python validator could catch 90% of common USD/Maya errors before TD review.",
    finding: "Works. Catches missing materials, broken namespacing, incorrect pivots. Saved real review time.",
    links: [{ label: "GitHub", url: "#" }, { label: "Demo", url: "#" }]
  },
  {
    status: "wip",
    title: "USD Layer Flattening Benchmarks",
    hypothesis: "Flattening composition arcs at export vs load time has measurable pipeline cost differences worth quantifying.",
    finding: "Early results: load-time flattening wins for smaller assets; export-time wins at scale. Sample size still small.",
    links: [{ label: "Notes (WIP)", url: "#" }]
  },
  {
    status: "exploring",
    title: "Domain-Warped Noise for Biome Masking",
    hypothesis: "Domain warping creates more organic biome transitions than threshold-based methods.",
    finding: "Visually yes — need to test at high point counts inside Houdini's scatter SOP.",
    links: []
  },
  {
    status: "archived",
    title: "SDF Primitives in GLSL",
    hypothesis: "Learning SDF rendering in fragment shaders would give a foundation for custom procedural shape tooling.",
    finding: "It did. Sphere, box, torus, booleans — all implemented. Mental model transfers to Houdini VEX easily.",
    links: [{ label: "Shadertoy", url: "#" }]
  }
];
