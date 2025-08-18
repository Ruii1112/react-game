export interface Puzzle {
  id: number;
  imagePath: string;
  answer: string;
  nextPassword: string | null;
  unlocked: boolean;
  unlockPassword?: string;
}

export interface PuzzleState {
  puzzles: Puzzle[];
  currentPuzzleIndex: number;
  unlockedPuzzles: boolean[];
  solvedPuzzles: boolean[];
  isAnswerCorrect: boolean;
  feedback: string;
  showUnlockMessage: boolean;
}

export type PuzzleAction =
  | { type: 'NAVIGATE_PUZZLE'; payload: number }
  | { type: 'CHECK_ANSWER'; payload: string }
  | { type: 'UNLOCK_NEXT_PUZZLE' }
  | { type: 'RESET_FEEDBACK' }
  | { type: 'CONTINUE_TO_NEXT' }
  | { type: 'LOAD_PROGRESS'; payload: { unlockedPuzzles: boolean[], solvedPuzzles: boolean[] } };