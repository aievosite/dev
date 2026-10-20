import eniac from "@/assets/eras/eniac-1946.jpg.asset.json";
import lisp from "@/assets/eras/lisp-machines.jpg.asset.json";
import dgx from "@/assets/eras/machine-learning-dgx-2018.jpg.asset.json";
import h100 from "@/assets/eras/generative-nvidia-h100-2023.png.asset.json";
import type { HistoricalImage } from "@/components/event-image";

export const eraImages: Record<string, HistoricalImage> = {
  "1930–1950-е": {
    src: eniac.url,
    alt: "Компьютер ENIAC и операторы в школе Мура, 1946 год; архивная фотография армии США",
    credit: "ENIAC, 1946 · U.S. Army Photo · общественное достояние",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Classic_shot_of_the_ENIAC.jpg",
  },
  "1956–1980-е": {
    src: lisp.url,
    alt: "Lisp-машины Symbolics 3620 и LMI Lambda в Музее компьютерной истории — компьютеры эпохи символьного ИИ",
    credit: "Lisp-машины · музейная фотография · Jason Riedy · CC BY 2.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Lisp_machines_in_Computer_History_Museum.jpg",
  },
  "1990–2010-е": {
    src: dgx.url,
    alt: "Вычислительная система NetApp ONTAP AI с NVIDIA DGX-1 для глубокого обучения, 2018 год",
    credit: "ONTAP AI / NVIDIA DGX-1, 2018 · Qdrddr · CC BY-SA 4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:NetApp_ONTAP_AI.jpg",
  },
  "2020-е": {
    src: h100.url,
    alt: "Реальный графический ускоритель NVIDIA H100 для обучения и работы больших нейросетей, фотография 2023 года",
    credit: "NVIDIA H100, 2023 · 极客湾Geekerwan · CC BY 3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:NVIDIA_H100_(%E6%9E%81%E5%AE%A2%E6%B9%BEGeekerwan)_013.png",
  },
};