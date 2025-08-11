import type { Puzzle } from '../types/puzzle';

// Viteの環境変数を使用してベースURLを取得
const BASE_URL = import.meta.env.BASE_URL;

export const PUZZLES_DATA: Puzzle[] = [
  {
    id: 1,
    imagePath: `${BASE_URL}images/puzzles/puzzle1.jpeg`,
    answer: '3232',
    nextPassword: '3232',
    unlocked: true,
  },
  {
    id: 2,
    imagePath: `${BASE_URL}images/puzzles/puzzle2.PNG`,
    answer: '3125',
    nextPassword: '3125',
    unlocked: false,
    unlockPassword: '3232',
  },
  {
    id: 3,
    imagePath: `${BASE_URL}images/puzzles/puzzle3.PNG`,
    answer: '2331',
    nextPassword: '2331',
    unlocked: false,
    unlockPassword: '3125',
  },
  {
    id: 4,
    imagePath: `${BASE_URL}images/puzzles/puzzle4.PNG`,
    answer: '322',
    nextPassword: '322',
    unlocked: false,
    unlockPassword: '2331',
  },
  {
    id: 5,
    imagePath: `${BASE_URL}images/puzzles/puzzle5.jpeg`,
    answer: '4222',
    nextPassword: null,
    unlocked: false,
    unlockPassword: '322',
  },
];

export const STORAGE_KEY = 'puzzle_progress';