import { atom } from "jotai";

const pictures = [
  "pg1",
  "pg2",
  "pg3",
  "pg4",
  "pg5",
  "pg6",
  "pg7",
  "pg8",
  "pg9",
  "pg10",
  "pg11",
  "pg12",
  "pg13",
  "pg14",
  "pg15",
  "pg16",
  "pg17",
  "pg18",
  "pg19",
  "pg20",
  "pg21",
  "pg22",
  "pg23",
  "pg24",
  "pg25",
  "pg26"
];

export const pageAtom = atom(0);
export const floatPausedAtom = atom(false);

export const pages = [
  {
    front: "book-cover",
    back: pictures[0],
  },
];

for (let i = 1; i < pictures.length - 1; i += 2) {
  pages.push({
    front: pictures[i % pictures.length],
    back: pictures[(i + 1) % pictures.length],
  });
}

pages.push({
  front: pictures[pictures.length - 1],
  back: "book-back",
});
