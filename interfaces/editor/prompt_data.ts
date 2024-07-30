export interface PromptData {
  title: string,
  prompt: string,
  strength: number, // 0-1 float
  style_preset: "enhance" | "anime" | "photographic" | "digital-art" | "comic-book" | "fantasy-art" | "line-art" | "analog-film" | "neon-punk" | "isometric" | "low-poly" | "origami" | "modeling-compound" | "cinematic" | "3d-model" | "pixel-art" | "tile-texture" | null,
  beforeImage?: string,
  afterImage?: string,
  cfg_scale: number // 0-35 int
}
