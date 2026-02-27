/* ═══════════════════════════════════════════════════════
   data/skills.js — Skill Constellation Data
   Add/remove nodes to update the interactive skills diagram.
   x, y are normalized 0–1 positions on the canvas.
   links: array of other skill IDs this node connects to.
═══════════════════════════════════════════════════════ */
const SKILLS = [
  { id:"houdini",  label:"Houdini",        x:0.50, y:0.50, r:28, glow:true,  links:["vex","python","usd","sim"] },
  { id:"python",   label:"Python",         x:0.20, y:0.30, r:22,             links:["maya","usd","tools"] },
  { id:"vex",      label:"VEX",            x:0.75, y:0.35, r:18,             links:["sim","render"] },
  { id:"usd",      label:"USD",            x:0.35, y:0.72, r:22, glow:true,  links:["maya","pipeline"] },
  { id:"maya",     label:"Maya",           x:0.15, y:0.62, r:18,             links:["tools"] },
  { id:"sim",      label:"Sim / FX",       x:0.66, y:0.68, r:20,             links:[] },
  { id:"tools",    label:"Tool Dev",       x:0.82, y:0.58, r:18,             links:[] },
  { id:"pipeline", label:"Pipeline",       x:0.50, y:0.84, r:20,             links:[] },
  { id:"glsl",     label:"GLSL",           x:0.86, y:0.22, r:14,             links:["vex","render"] },
  { id:"unreal",   label:"Unreal",         x:0.20, y:0.82, r:14,             links:["pipeline"] },
  { id:"cpp",      label:"C++",            x:0.08, y:0.44, r:14,             links:["tools"] },
  { id:"render",   label:"Rendering",      x:0.60, y:0.18, r:16,             links:[] },
];
