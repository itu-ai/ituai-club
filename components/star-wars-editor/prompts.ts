import { PromptData } from "@/interfaces/editor/prompt_data"

export const PresetList = [
  "enhance",
  "anime",
  "photographic",
  "digital-art",
  "comic-book",
  "fantasy-art",
  "line-art",
  "analog-film",
  "neon-punk",
  "isometric",
  "low-poly",
  "origami",
  "modeling-compound",
  "cinematic",
  "3d-model",
  "pixel-art",
  "tile-texture",
]

const jediPrompt: PromptData = {
  title: "Jedi Master",
  prompt: "In Star Wars universe, an epic scene of a brave Star Wars Character Jedi Master",
  strength: 0.5,
  style_preset: "cinematic",
  cfg_scale: 7
}

const sithLordPrompt: PromptData = {
  title: "Sith Lord",
  prompt: "In Star Wars universe, an epic scene of a rageful Star Wars Character Sith Lord",
  strength: 0.5,
  style_preset: "cinematic",
  cfg_scale: 7
}

export const allPrompts = [
  jediPrompt,
  sithLordPrompt
]
