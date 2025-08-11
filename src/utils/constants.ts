import type { Puzzle } from '../types/puzzle';

export const PUZZLES_DATA: Puzzle[] = [
  {
    id: 1,
    imagePath: '/images/puzzles/puzzle1.jpeg',
    answer: '3232',
    nextPassword: '3232',
    unlocked: true,
  },
  {
    id: 2,
    imagePath: '/images/puzzles/puzzle2.PNG',
    answer: '3125',
    nextPassword: '3125',
    unlocked: false,
    unlockPassword: '3232',
  },
  {
    id: 3,
    imagePath: '/images/puzzles/puzzle3.PNG',
    answer: '2331',
    nextPassword: '2331',
    unlocked: false,
    unlockPassword: '3125',
  },
  {
    id: 4,
    imagePath: '/images/puzzles/puzzle4.PNG',
    answer: '322',
    nextPassword: '322',
    unlocked: false,
    unlockPassword: '2331',
  },
  {
    id: 5,
    imagePath: '/images/puzzles/puzzle5.jpeg',
    answer: '4222',
    nextPassword: null,
    unlocked: false,
    unlockPassword: '322',
  },
];

export const STORAGE_KEY = 'puzzle_progress';