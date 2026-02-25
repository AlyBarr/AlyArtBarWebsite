// =============================================================
// data/projects.js
// AlyArtBar Portfolio — Content Data
//
// HOW TO UPDATE:
// - Edit this file to add/remove/change projects and R&D entries
// - Images go in assets/images/ — use relative paths
// - featured: true → shown as large alternating rows (max 2-3)
// - featured: false → shown in the grid below
// =============================================================

const PROJECTS = [
  {
    id: "proc-terrain",
    featured: true,
    category: "Procedural Systems",
    title: "Procedural Terrain Generator",
    oneliner: "A Houdini HDA for generating layered, art-directable terrain with biome masking.",
    bullets: [
      "Designed a node graph with exposed parameters for art direction without breaking procedural rules",
      "Implemented multi-layer noise blending with custom VEX wrangles for erosion simulation",
      "Packaged as an HDA for pipeline integration, with LOD-aware output for game engine export"
    ],
    tools: ["Houdini", "VEX", "Python", "Unreal Engine"],
    image: "assets/images/terrain-placeholder.jpg",
    imageAlt: "Procedural terrain render",
    links: [
      { label: "GitHub", url: "#" },
      { label: "Video", url: "#" }
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
      "Reduced export iteration time significantly by parallelizing asset processing"
    ],
    tools: ["Python", "USD", "Maya", "PyQt"],
    image: "assets/images/usd-placeholder.jpg",
    imageAlt: "USD pipeline tool interface",
    links: [
      { label: "GitHub", url: "#" },
      { label: "Writeup", url: "#" }
    ]
  },
  {
    id: "shader-study",
    featured: false,
    category: "Rendering",
    title: "GLSL Shader Studies",
    oneliner: "Real-time shader experiments exploring procedural noise, SDF rendering, and stylization.",
    bullets: [
      "Wrote multiple fragment shaders exploring domain-warped noise and animated SDF shapes",
      "Documented the mathematical approach for each shader in accompanying writeups"
    ],
    tools: ["GLSL", "WebGL", "Shadertoy"],
    image: "",
    imageAlt: "",
    links: [{ label: "Shadertoy", url: "#" }]
  },
  {
    id: "maya-tool",
    featured: false,
    category: "Tool Development",
    title: "Maya Rigging Helper",
    oneliner: "A Python/PyQt tool that automates repetitive rigging tasks in Maya.",
    bullets: [
      "Built a UI for batch joint renaming, orientation fixing, and constraint setup",
      "Saves hours of manual work on character rig prep stages"
    ],
    tools: ["Python", "Maya", "PyQt"],
    image: "",
    imageAlt: "",
    links: [{ label: "GitHub", url: "#" }]
  },
  {
    id: "sim-study",
    featured: false,
    category: "Simulation",
    title: "Fluid Sim FX Study",
    oneliner: "Houdini FLIP fluid simulations exploring directable ocean and splash FX.",
    bullets: [
      "Explored FLIP solver parameters and their effect on large-scale water behavior",
      "Built a lightweight caching and rendering pipeline for the sim outputs"
    ],
    tools: ["Houdini", "Karma", "VEX"],
    image: "",
    imageAlt: "",
    links: [{ label: "Video", url: "#" }]
  }
];

// =============================================================
// R&D LAB ENTRIES
// status: "live" | "wip" | "exploring" | "archived"
// =============================================================

const RND_ENTRIES = [
  {
    id: "usd-bench",
    status: "wip",
    title: "USD Layer Flattening Benchmarks",
    hypothesis: "Flattening composition arcs at export time vs. at load time has measurable pipeline cost differences worth quantifying.",
    finding: "Early results show load-time flattening wins for smaller assets; export-time wins at scale. Sample size still small.",
    artifacts: [
      { label: "Notes (WIP)", url: "#" }
    ]
  },
  {
    id: "py-batch",
    status: "live",
    title: "Batch Asset Validator",
    hypothesis: "A lightweight Python validator could catch 90% of common USD/Maya asset errors before TD review.",
    finding: "Works. Catches missing materials, broken namespacing, and incorrect pivot placement. Saved real review time.",
    artifacts: [
      { label: "GitHub", url: "#" },
      { label: "Demo", url: "#" }
    ]
  },
  {
    id: "noise-study",
    status: "exploring",
    title: "Domain-Warped Noise for Biome Masking",
    hypothesis: "Domain warping on Perlin/Simplex noise creates more organic biome transitions than threshold-based methods.",
    finding: "Visually yes. Need to test how this performs when used as a mask input in Houdini's scatter SOP at high point counts.",
    artifacts: []
  },
  {
    id: "glsl-sdf",
    status: "archived",
    title: "SDF Primitives in GLSL",
    hypothesis: "Learning SDF rendering in fragment shaders would give me a foundation for custom procedural shape tooling.",
    finding: "It did. Sphere, box, torus, capsule, boolean ops — all implemented. The mental model now transfers to Houdini VEX easily.",
    artifacts: [
      { label: "Shadertoy Collection", url: "#" }
    ]
  }
];
