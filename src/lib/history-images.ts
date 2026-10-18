import turing from "@/assets/history/turing-ferranti-1951.jpg.asset.json";
import manchester from "@/assets/history/manchester-baby.jpg.asset.json";
import ibm704 from "@/assets/history/ibm704-1957.jpg.asset.json";
import ibm7090 from "@/assets/history/ibm7090-console.jpg.asset.json";
import vax from "@/assets/history/vax-equipment.jpg.asset.json";
import deepBlue from "@/assets/history/deepblue-match-1997.jpg.asset.json";
import alexnet from "@/assets/history/alexnet-figure2-landscape.jpg.asset.json";
import transformer from "@/assets/history/transformer-attention-landscape.jpg.asset.json";
import chatgpt from "@/assets/history/chatgpt-interface.jpg.asset.json";
import type { HistoricalImage } from "@/components/event-image";

export const historyImages: Record<string, HistoricalImage> = {
  "1936": {
    src: turing.url,
    alt: "Алан Тьюринг стоит справа у Ferranti Mark I с коллегами в Манчестере, 1951 год; не фотография 1936 года",
    credit: "Тьюринг и Ferranti Mark I, 1951 · © University of Manchester · Science and Industry Museum · кадрировано",
    sourceUrl: "https://blog.scienceandindustrymuseum.org.uk/follow-ferrantis-footsteps/alan-m-turing-and-colleagues-working-on-the-ferranti-mark-i-comp/",
  },
  "1950": {
    src: manchester.url,
    alt: "Музейная реконструкция Manchester Baby — предшественника Manchester Mark I, связанного с работой Тьюринга в Манчестере",
    credit: "Manchester Baby, музейная реконструкция · Geni · Wikimedia Commons · CC BY-SA 4.0 · кадрировано",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Manchester_baby_head_on.JPG",
  },
  "1956": {
    src: ibm704.url,
    alt: "Операторы у IBM 704 в исследовательском центре Langley NACA, 1957 год; вычислительная техника эпохи Дартмутского семинара, не снимок семинара",
    credit: "IBM 704, Langley NACA, 1957 · NASA · общественное достояние · кадрировано",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:IBM_Electronic_Data_Processing_Machine_-_GPN-2000-001881.jpg",
  },
  "1950–1970-е": {
    src: ibm7090.url,
    alt: "Музейная консоль IBM 7090 — вычислительная техника периода ранних программ ИИ; ELIZA работала на родственной IBM 7094",
    credit: "Консоль IBM 7090, музейная фотография · Bubba73 · Wikimedia Commons · CC BY-SA 4.0 · кадрировано",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:IBM_7090_console.jpg",
  },
  "1970–1990-е": {
    src: vax.url,
    alt: "Компьютер DEC VAX 11/780 в музее; экспертная система XCON использовалась для конфигурирования компьютеров VAX",
    credit: "DEC VAX 11/780, музейная фотография · Joe Mabel · Wikimedia Commons · CC BY-SA 3.0 · кадрировано",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:LCM_-_DEC_VAX_11-780-5_-_01.jpg",
  },
  "1997": {
    src: deepBlue.url,
    alt: "Гарри Каспаров и Джозеф Хоэн из команды Deep Blue за шахматной доской во время матча 1997 года в Нью-Йорке",
    credit: "Каспаров и Джозеф Хоэн, матч 1997 года · архив IBM · кадрировано",
    sourceUrl: "https://www.ibm.com/history/deep-blue",
  },
  "2012": {
    src: alexnet.url,
    alt: "Оригинальная схема архитектуры AlexNet, рисунок 2 из статьи Крижевского, Суцкевера и Хинтона 2012 года",
    credit: "AlexNet: рисунок 2 оригинальной статьи · A. Krizhevsky, I. Sutskever, G. Hinton · NeurIPS, 2012 · фрагмент страницы",
    sourceUrl: "https://proceedings.neurips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks.pdf",
  },
  "2017–2021": {
    src: transformer.url,
    alt: "Scaled Dot-Product Attention и Multi-Head Attention — оригинальные схемы механизма внимания Transformer, рисунок 2 из Attention Is All You Need, 2017 год",
    credit: "Transformer: механизм внимания, рисунок 2 оригинальной статьи · A. Vaswani и соавторы · 2017 · фрагмент страницы",
    sourceUrl: "https://arxiv.org/pdf/1706.03762",
  },
  "2022–2026": {
    src: chatgpt.url,
    alt: "Подлинный снимок интерфейса ChatGPT с диалогом на испанском языке, 3 января 2023 года",
    credit: "Интерфейс ChatGPT, 3 января 2023 · OpenAI · Wikimedia Commons · общественное достояние · кадрировано",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:ChatGPT_OpenAI_example_in_Spanish.png",
  },
};