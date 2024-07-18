interface TuringImage {
  image: string;
  isAI: boolean;
}

export const getRandomImage = async (): Promise<TuringImage> => {
  console.log("Getting random image");
  const random = Math.random();
  if (random < 0.5) {
    const aiImage = await getAIImages();
    return { image: aiImage, isAI: true };
  } 
  else {
    const humanImage = await getHumanImages();
    return { image: humanImage, isAI: false };
  }
}

// Constants
const human_image_count = 210;
const ai_image_count = 276;
const human_image_path = "/turing/human/";
const ai_image_path = "/turing/ai/";

// Local Storage Functions

const clearHumanStorage = (): void => {
  localStorage.removeItem("human_seen");
}

const clearAIStorage = (): void => {
  localStorage.removeItem("ai_seen");
}

const getUnseenHumanImage = (): number => {
  const seen = JSON.parse(localStorage.getItem("human_seen") || "[]");
  if (seen.length === human_image_count) {
    clearHumanStorage();
    return Math.floor(Math.random() * human_image_count);
  }
  const unseen = Array.from(Array(human_image_count).keys()).filter((x) => !seen.includes(x))
  return unseen[Math.floor(Math.random() * unseen.length)];
}

const getUnseenAIImage = (): number => {
  const seen = JSON.parse(localStorage.getItem("ai_seen") || "[]");
  if (seen.length === ai_image_count) {
    clearAIStorage();
    return Math.floor(Math.random() * ai_image_count);
  }
  const unseen = Array.from(Array(ai_image_count).keys()).filter((x) => !seen.includes(x))
  return unseen[Math.floor(Math.random() * unseen.length)];
}

const setHumanSeen = (index: number): void => {
  const seen = JSON.parse(localStorage.getItem("human_seen") || "[]");
  seen.push(index);
  localStorage.setItem("human_seen", JSON.stringify(seen));
}

const setAISeen = (index: number): void => {
  const seen = JSON.parse(localStorage.getItem("ai_seen") || "[]");
  seen.push(index);
  localStorage.setItem("ai_seen", JSON.stringify(seen));
}

// Image Functions

const getAIImages = async (): Promise<string> => {
  let index = getUnseenAIImage();
  setAISeen(index);
  return ai_image_path + index.toString() + ".jpg";
}

const getHumanImages = async (): Promise<string> => {
  let index = getUnseenHumanImage();
  setHumanSeen(index);
  return human_image_path + index.toString() + ".jpg";
}