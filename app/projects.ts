type Developer = {
  name: string;
  github: string;
}

export type Project = {
  title?: string;
  href: string;
  image_src: string;
  image_alt: string;
  description: string;
  developers?: Developer[] | null;
}

/* to Copy Easily
  {
    title: "",
    href: "",
    image_src: "",
    image_alt: "",
    description: "",
    developers: null
  },
*/

const devs = {
  erthium: {
    name: "Erthium",
    github: "https://github.com/erthium",
  },
  husseinberg: {
    name: "Husseinberg",
    github: "https://github.com/HuseyinSimsek7904",
  },
  utkub24: {
    name: "Utkub24",
    github: "https://github.com/Utkub24",
  },
}

export const projects: Project[] = [
  {
    title: "Editor Summit'24",
    href: "/editor/summit",
    image_src: "/editor_summit.png",
    image_alt: "Editor Summit'24",
    description: "Image Editor made for AI Summit'24",
    developers: [devs.erthium, devs.utkub24, devs.husseinberg],
  },
  {
    title: "Editor Star Wars",
    href: "/editor/starwars",
    image_src: "/editor_starwars.png",
    image_alt: "Editor Star Wars",
    description: "Image Editor made for Star Wars Night",
    developers: [devs.erthium, devs.husseinberg, devs.utkub24],
  },
  {
    title: "Image Turing Test",
    href: "/turing/image",
    image_src: "/turing_test.png",
    image_alt: "Image Turing Test",
    description: "Simple Image Turing Test",
    developers: [devs.erthium, devs.husseinberg]
  },
  {
    title: "Cez",
    href: "/cez",
    image_src: "/cez.png",
    image_alt: "Cez",
    description: "Chess Variant 'Cez'",
    developers: [devs.erthium, devs.husseinberg]
  },
  {
    title: "Reverse Turing Test",
    href: "/turing/reverse",
    image_src: "/reverse_turing_test.png",
    image_alt: "Reverse Turing Test",
    description: "Tables are turned, you are a Chatbot now",
    developers: [devs.erthium]
  },
];
