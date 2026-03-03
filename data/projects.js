/* ═══════════════════════════════════════════════════════
   data/projects.js — PROJECTS CONTENT
   Editing this file will update the website's projects.
   
   featured: true  → large alternating row (max 2–3)
   featured: false → smaller grid card
   image: ""       → shows placeholder until image added
   image: "assets/images/filename.jpg" → example image
═══════════════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════════════
   data/projects.js
   Variable names must match main.js exactly:
     - PROJECTS       (array)
     - RND_ENTRIES    (array, uses "artifacts" not "links")
═══════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: "maya-pipeline-tools",
    featured: true,
    category: "Pipeline & Tools",
    title: "Maya Pipeline Tools",
    oneliner: "Production-grade Scene Validator and Asset Publisher for Maya — built to mirror studio TD conventions.",
    bullets: [
      "Scene Validator: checks geometry, naming, transforms, materials, and scene units with a threaded PySide2 UI that never freezes",
      "Asset Publisher: copies files to a versioned directory, writes a JSON manifest, exports a USD stub, and commits a semantic Git version tag",
      "Graceful degradation — runs in demo mode without Maya, and falls back to a plain-text USD stub if usd-core is missing"
    ],
    tools: ["Python", "Maya API", "PySide2", "OpenUSD", "Git"],
    image: "",
    imageAlt: "Maya Pipeline Tools",
    links: [
      { label: "GitHub", url: "https://github.com/AlyBarr/AssetMayaTooling" },
      { label: "Docs",   url: "pipeline-tools.html" }
    ]
  },
    {
      id: "ml-rig-predictor",
      featured: true,
      category: "Machine Learning · Virtual Production",
      title: "Virtual Prod ML Rig Predictor",
      oneliner: "Two-model Random Forest system that classifies 18 human motion actions from 3D skeletal joint data — built for virtual production rigs.",
      bullets: [
        "Model 1: full 4,998-dimensional feature pipeline (StandardScaler → Random Forest, 300 trees) for maximum accuracy",
        "Model 2: PCA-compressed pipeline (100 components) for faster inference in latency-sensitive live VP environments",
        "Root-space normalization, temporal resampling to 60 frames, and velocity features extracted from KARD dataset"
      ],
      tools: ["Python", "Scikit-learn", "Random Forest", "PCA", "NumPy", "Pandas", "Matplotlib"],
      image: "",
      imageAlt: "ML Rig Predictor — skeletal action classification",
      links: [
        { label: "GitHub", url: "https://github.com/AlyBarr/VirtualProdMLPredict"},
        { label: "Docs",   url: "MLrigPredictor.html"}
      ]
    },
  /* ═══════════════════════════════════════════════════════
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
    image: "",
    imageAlt: "Procedural Terrain Generator",
    links: [
      { label: "GitHub", url: "#" },
      { label: "Video",  url: "#" }
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
    ═══════════════════════════════════════════════════════*/
];

/* ═══════════════════════════════════════════════════════
   R&D ENTRIES
   IMPORTANT: uses "artifacts" (not "links") — matches main.js line:
     entry.artifacts.length ? ...
   status: "live" | "wip" | "exploring" | "archived"
═══════════════════════════════════════════════════════ */
const RND_ENTRIES = [
  {
    status: "live",
    title: "Maya Pipeline Tools — Scene Validator & Asset Publisher",
    hypothesis: "Two production-grade tools covering the full validate → publish → version pipeline could be built in pure Python with no proprietary dependencies.",
    finding: "Both ship. Validator catches geo, naming, transform, and material issues. Publisher handles file copy, USD export, JSON manifest, and Git tagging in one click.",
    artifacts: [
      { label: "GitHub", url: "https://github.com/AlyBarr/AssetMayaTooling" },
      { label: "Docs",   url: "pipeline-tools.html" }
    ]
  },
  {
    status: "live",
    title: "Virtual Prod ML Rig Predictor — Motion Action Classification",
    hypothesis: "A Random Forest pipeline with hand-crafted skeletal features could reliably classify 18 motion actions from 3D joint data without deep learning, keeping the system interpretable and deployable in any DCC tool.",
    finding: "Both models ship. M1 (full feature) maximises accuracy; M2 (PCA-reduced) trades a small margin for faster inference. Feature importances and PCA scatter plots confirm the models learn meaningful motion-space structure.",
    artifacts: [
      { label: "GitHub", url: "#" },
      { label: "Docs",   url: "ml-rig-predictor.html" }
    ]
  }, 
  
  /* ═══════════════════════════════════════════════════════
   R&D ENTRIES
  {
    status: "exploring",
    title: "Domain-Warped Noise for Biome Masking",
    hypothesis: "Domain warping creates more organic biome transitions than threshold-based methods.",
    finding: "Visually yes — need to test at high point counts inside Houdini's scatter SOP.",
    artifacts: []
  },
  {
    status: "archived",
    title: "SDF Primitives in GLSL",
    hypothesis: "Learning SDF rendering in fragment shaders would give a foundation for custom procedural shape tooling.",
    finding: "It did. Sphere, box, torus, booleans all implemented. Mental model transfers to Houdini VEX easily.",
    artifacts: [
      { label: "Shadertoy", url: "#" }
    ]
  }
  ═══════════════════════════════════════════════════════ */
];
