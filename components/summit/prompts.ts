import { PromptData } from "@/interfaces/prompt_data"

const disneyPrompt: PromptData = {
  title: "Disney",
  prompt: "A person in a Disney universe as a Disney character",
  strength: 0.5,
  style_preset: 'digital-art',
  beforeImage: "/summit/disney_before.jpg",
  afterImage: "/summit/disney_after.jpg",
  cfg_scale: 35
}

const pixarPrompt: PromptData = {
  title: "Pixar",
  prompt: "A Pixar movie scene",
  strength: 0.6,
  style_preset: null,
  beforeImage: "/summit/pixar_before.jpg",
  afterImage: "/summit/pixar_after.jpg",
  cfg_scale: 35
}

const toyStoryPrompt: PromptData = {
  title: "Toy Story",
  prompt: "A Toy Story scene",
  strength: 0.5,
  style_preset: 'digital-art',
  beforeImage: "/summit/toy_before.jpg",
  afterImage: "/summit/toy_after.jpg",
  cfg_scale: 35
}

const lotrPrompt: PromptData = {
  title: "Lord of the Rings",
  prompt: "A scene from the Lord of the Rings",
  strength: 0.5,
  style_preset: null,
  beforeImage: "/summit/lord_before.jpg",
  afterImage: "/summit/lord_after.jpg",
  cfg_scale: 35
}

const starWarsPrompt: PromptData = {
  title: "Star Wars",
  prompt: "A star wars scene",
  strength: 0.5,
  style_preset: null,
  beforeImage: "/summit/star_before.jpg",
  afterImage: "/summit/star_after.jpg",
  cfg_scale: 35
}

const vanGoghPrompt: PromptData = {
  title: "Van Gogh",
  prompt: "A painting from Van Gogh",
  strength: 0.6,
  style_preset: null,
  beforeImage: "/summit/van_before.jpg",
  afterImage: "/summit/van_after.jpg",
  cfg_scale: 35
}

const animePrompt: PromptData = {
  title: "Anime",
  prompt: "An anime scene",
  strength: 0.5,
  style_preset: "anime",
  beforeImage: "/summit/anime_before.jpg",
  afterImage: "/summit/anime_after.jpg",
  cfg_scale: 35
}

const comicBookPrompt: PromptData = {
  title: "Comic Book Style",
  prompt: "A page from a comic book",
  strength: 0.5,
  style_preset: "comic-book",
  beforeImage: "/summit/comic_before.jpg",
  afterImage: "/summit/comic_after.jpg",
  cfg_scale: 35
}

const ninetiesPrompt: PromptData = {
  title: "90's",
  prompt: "A photograph taken from 90's",
  strength: 0.6,
  style_preset: "analog-film",
  beforeImage: "/summit/nineties_before.jpg",
  afterImage: "/summit/nineties_after.jpg",
  cfg_scale: 35
}

const yearbookPrompt: PromptData = {
  title: "Highschool Yearbook",
  prompt: "A photograph from a highschool yearbook",
  strength: 0.4,
  style_preset: null,
  beforeImage: "/summit/yearbook_before.jpg",
  afterImage: "/summit/yearbook_after.jpg",
  cfg_scale: 35
}

const videoGamePrompt: PromptData = {
  title: "Video Game",
  prompt: "A screenshot from a video game",
  strength: 0.45,
  style_preset: "digital-art",
  beforeImage: "/summit/video_before.jpg",
  afterImage: "/summit/video_after.jpg",
  cfg_scale: 35
}

const sketchPrompt: PromptData = {
  title: "Sketch",
  prompt: "A sketch drawing",
  strength: 0.435,
  style_preset: "line-art",
  beforeImage: "/summit/sketch_before.jpg",
  afterImage: "/summit/sketch_after.jpg",
  cfg_scale: 35
}

export const allPrompts = [
  disneyPrompt,
  pixarPrompt,
  toyStoryPrompt,
  lotrPrompt,
  starWarsPrompt,
  vanGoghPrompt,
  animePrompt,
  comicBookPrompt,
  ninetiesPrompt,
  yearbookPrompt,
  videoGamePrompt,
  sketchPrompt
]
