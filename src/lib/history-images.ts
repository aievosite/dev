import turing1936 from "@/assets/history/turing_1936.jpg.asset.json";
import turing1951 from "@/assets/history/turing_1951.jpg.asset.json";
import mccarthy from "@/assets/history/mccarthy_portrait.jpg.asset.json";
import weizenbaum from "@/assets/history/weizenbaum_eliza.jpg.asset.json";
import vax from "@/assets/history/dec_vax_xcon_context.jpg.asset.json";
import deepBlue from "@/assets/history/ibm-deep-blue-machine-2009.jpg.asset.json";
import alexnet from "@/assets/history/alexnet-original-figure.png.asset.json";
import transformer from "@/assets/history/transformer-original-figure.png.asset.json";
import chatgpt from "@/assets/history/chatgpt-2023-screenshot.png.asset.json";
import type { HistoricalImage } from "@/components/event-image";

export const historyImages: Record<string, HistoricalImage> = {
  "1936": {
    src: turing1936.url,
    alt: "Алан Тьюринг в Принстонском университете в 1936 году",
    credit: "Алан Тьюринг, 1936. Wikimedia Commons · общественное достояние",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Alan_Turing_(1912-1954)_in_1936_at_Princeton_University.jpg",
  },
  "1950": {
    src: turing1951.url,
    alt: "Портрет Алана Тьюринга, автора статьи о тесте Тьюринга; фотография Elliott & Fry, 1951 год",
    credit: "Алан Тьюринг, 1951. Elliott & Fry · Wikimedia Commons · общественное достояние",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Alan_Turing_(1951).jpg",
  },
  "1956": {
    src: mccarthy.url,
    alt: "Джон Маккарти, организатор Дартмутского семинара; портрет 2006 года, не фотография семинара",
    credit: "Джон Маккарти, 2006. null0 · Wikimedia Commons · CC BY-SA 2.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:John_McCarthy_Stanford.jpg",
  },
  "1950–1970-е": {
    src: weizenbaum.url,
    alt: "Джозеф Вейценбаум, создатель программы ELIZA; портрет 2005 года",
    credit: "Создатель ELIZA Джозеф Вейценбаум, 2005. Ulrich Hansen · CC BY-SA 3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Joseph_Weizenbaum.jpg",
  },
  "1970–1990-е": {
    src: vax.url,
    alt: "Компьютер DEC VAX 11/780 в музее; экспертная система XCON использовалась для конфигурирования компьютеров VAX",
    credit: "DEC VAX 11/780, музейная фотография. Joe Mabel · Wikimedia Commons · CC BY-SA 3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:LCM_-_DEC_VAX_11-780-5_-_01.jpg",
  },
  "1997": {
    src: deepBlue.url,
    alt: "IBM Deep Blue в музейной экспозиции; фотография Christina Xu 2009 года, не снимок шахматного матча",
    credit: "IBM Deep Blue, музейная фотография 2009 года. Christina Xu · CC BY 2.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:IBM_rs6000_SP_-_Deep_Blue.jpg",
  },
  "2012": {
    src: alexnet.url,
    alt: "Оригинальная схема архитектуры AlexNet, рисунок 2 из статьи Крижевского, Суцкевера и Хинтона 2012 года",
    credit: "AlexNet: рисунок 2 оригинальной статьи. A. Krizhevsky, I. Sutskever, G. Hinton · NeurIPS, 2012",
    sourceUrl: "https://proceedings.neurips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks.pdf",
  },
  "2017–2021": {
    src: transformer.url,
    alt: "Оригинальная схема архитектуры Transformer, рисунок 1 из статьи Attention Is All You Need, 2017 год",
    credit: "Transformer: рисунок 1 оригинальной статьи. A. Vaswani и соавторы · 2017",
    sourceUrl: "https://arxiv.org/pdf/1706.03762",
  },
  "2022–2026": {
    src: chatgpt.url,
    alt: "Подлинный снимок интерфейса ChatGPT с диалогом на испанском языке, 3 января 2023 года",
    credit: "Интерфейс ChatGPT, 3 января 2023. OpenAI · Wikimedia Commons · общественное достояние",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:ChatGPT_OpenAI_example_in_Spanish.png",
  },
};