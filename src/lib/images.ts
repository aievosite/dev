// Authentic images from Wikimedia Commons (stable Special:FilePath URLs).
const c = (file: string, w = 640) => `https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=${w}`;

export type Photo = { src: string; alt: string; caption: string };

export const milestonePhotos: Record<string, Photo> = {
  "1936": { src: c("Alan_Turing_Aged_16.jpg"), alt: "Портрет Алана Тьюринга в 16 лет", caption: "Алан Тьюринг, ок. 1928 г. · Wikimedia Commons" },
  "1950": { src: c("Classic_shot_of_the_ENIAC.jpg", 800), alt: "Вычислительная машина ENIAC и её операторы", caption: "ENIAC — одна из первых электронных ЭВМ · Wikimedia Commons" },
  "1956": { src: c("John_McCarthy_Stanford.jpg"), alt: "Джон Маккарти, автор термина «искусственный интеллект»", caption: "Джон Маккарти · Wikimedia Commons" },
  "1950–1970-е": { src: c("ELIZA_conversation.png", 800), alt: "Пример диалога с программой ELIZA", caption: "Диалог с программой ELIZA · Wikimedia Commons" },
  "1997": { src: c("Deep_Blue.jpg"), alt: "Шкаф суперкомпьютера IBM Deep Blue", caption: "IBM Deep Blue в Музее компьютерной истории · Wikimedia Commons" },
  "2012": { src: c("Geoffrey_Hinton_at_UBC.jpg"), alt: "Джеффри Хинтон выступает в Университете Британской Колумбии", caption: "Джеффри Хинтон · Wikimedia Commons" },
};

export const gallery: Photo[] = [
  milestonePhotos["1936"]!,
  milestonePhotos["1950"]!,
  milestonePhotos["1997"]!,
];
