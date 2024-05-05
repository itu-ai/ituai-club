export interface PromptData {
  title: string,
  prompt: string,
  strength: number, // 0-1 float
  style_preset: string | null,
  beforeImage?: string,
  afterImage?: string,
  cfg_scale: number // 0-35 int
}

/* -- Style Presets --
enhance
anime
photographic
digital-art
comic-book
fantasy-art
line-art
analog-film
neon-punk
isometric
low-poly
origami
modeling-compound
cinematic
3d-model
pixel-art
tile-texture
*/

const jediPrompt: PromptData = {
  title: "Jedi Master",
  prompt: "A jedi with a lightsaber",
  strength: 0.3,
  style_preset: "cinematic",
  cfg_scale: 7
}

const sithLordPrompt: PromptData = {
  title: "Sith Lord",
  prompt: "A sith lord with a double red lightsaber",
  strength: 0.3,
  style_preset: "cinematic",
  cfg_scale: 7
}

export const allPrompts = [
  jediPrompt,
  sithLordPrompt
]
