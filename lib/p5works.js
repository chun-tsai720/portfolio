export const p5Works = [
  {
    number: "01",
    slug: "wonderful-moonstone",
    title: "WONDERFUL MOONSTONE",
    label: "INTERACTIVE DRAWING",
    date: "2026.09.13",
    instruction: "MOVE THE POINTER TO DRAW",
    src: "/p5js/wonderful-moonstone/index.html",
  },
  {
    number: "02",
    slug: "zenith-marlin",
    title: "ZENITH MARLIN",
    label: "GENERATIVE MOTION",
    date: "2026.09.16",
    instruction: "GENERATIVE LOOP",
    src: "/p5js/zenith-marlin/index.html",
  },
  {
    number: "03",
    slug: "senbonzakura",
    title: "SENBONZAKURA",
    label: "GENERATIVE ANIMATION",
    date: "2026.09.19",
    instruction: "CLICK TO TRIGGER THE TRANSFORMATION",
    src: "/p5js/senbonzakura/index.html",
  },
  {
    number: "04",
    slug: "bronze-marquess",
    title: "BRONZE MARQUESS",
    label: "INTERACTIVE 3D",
    date: "2026.09.19",
    instruction: "MOVE HORIZONTALLY TO CHANGE TIME",
    src: "/p5js/bronze-marquess/index.html",
  },
  {
    number: "05",
    slug: "first",
    title: "FIRST",
    label: "GENERATIVE COMPOSITION",
    date: "2026.09.19",
    instruction: "CLICK TO REGENERATE THE COMPOSITION",
    src: "/p5js/first/index.html",
  },
  {
    number: "06",
    slug: "pyramid",
    title: "PYRAMID",
    label: "GENERATIVE LIGHT",
    date: "2026.09.19",
    instruction: "GENERATIVE LIGHT LOOP",
    src: "/p5js/pyramid/index.html",
  },
];

export function getP5Work(slug) {
  return p5Works.find((work) => work.slug === slug);
}
