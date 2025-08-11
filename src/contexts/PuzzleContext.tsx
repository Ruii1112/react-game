import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { PuzzleState, PuzzleAction } from '../types/puzzle';
import { PUZZLES_DATA } from '../utils/constants';
import { saveProgress, loadProgress, clearProgress } from '../utils/storage';

const initialState: PuzzleState = {
  puzzles: PUZZLES_DATA,
  currentPuzzleIndex: 0,
  unlockedPuzzles: [true, false, false, false, false],
  isAnswerCorrect: false,
  feedback: '',
  showUnlockMessage: false,
};

const puzzleReducer = (state: PuzzleState, action: PuzzleAction): PuzzleState => {
  switch (action.type) {
    case 'NAVIGATE_PUZZLE':
      // ロックされたパズルへの移動を防ぐ
      if (!state.unlockedPuzzles[action.payload]) {
        return state;
      }
      return {
        ...state,
        currentPuzzleIndex: action.payload,
        feedback: '',
        showUnlockMessage: false,
        isAnswerCorrect: false,
      };

    case 'CHECK_ANSWER': {
      const currentPuzzle = state.puzzles[state.currentPuzzleIndex];
      const isCorrect = action.payload === currentPuzzle.answer;

      if (isCorrect) {
        const newUnlockedPuzzles = [...state.unlockedPuzzles];
        if (state.currentPuzzleIndex < state.puzzles.length - 1) {
          newUnlockedPuzzles[state.currentPuzzleIndex + 1] = true;
        }
        saveProgress(newUnlockedPuzzles);

        return {
          ...state,
          isAnswerCorrect: true,
          feedback: '正解！',
          showUnlockMessage: true,
          unlockedPuzzles: newUnlockedPuzzles,
        };
      }

      return {
        ...state,
        isAnswerCorrect: false,
        feedback: '不正解です。もう一度考えてみてください',
      };
    }

    case 'UNLOCK_NEXT_PUZZLE': {
      const newUnlockedPuzzles = [...state.unlockedPuzzles];
      if (state.currentPuzzleIndex < state.puzzles.length - 1) {
        newUnlockedPuzzles[state.currentPuzzleIndex + 1] = true;
      }
      saveProgress(newUnlockedPuzzles);
      
      return {
        ...state,
        unlockedPuzzles: newUnlockedPuzzles,
      };
    }

    case 'RESET_FEEDBACK':
      return {
        ...state,
        feedback: '',
        isAnswerCorrect: false,
      };

    case 'CONTINUE_TO_NEXT':
      if (state.currentPuzzleIndex < state.puzzles.length - 1) {
        return {
          ...state,
          currentPuzzleIndex: state.currentPuzzleIndex + 1,
          feedback: '',
          showUnlockMessage: false,
          isAnswerCorrect: false,
        };
      }
      return state;

    case 'LOAD_PROGRESS':
      return {
        ...state,
        unlockedPuzzles: action.payload,
      };

    default:
      return state;
  }
};

interface PuzzleContextType {
  state: PuzzleState;
  dispatch: React.Dispatch<PuzzleAction>;
}

const PuzzleContext = createContext<PuzzleContextType | undefined>(undefined);

export const PuzzleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(puzzleReducer, initialState);

  useEffect(() => {
    const savedProgress = loadProgress();
    // 保存された進捗が正しい形式かチェック
    if (savedProgress && Array.isArray(savedProgress) && savedProgress.length === 5) {
      // 最初のパズルは必ずアンロックされているべき
      if (savedProgress[0] === true) {
        dispatch({ type: 'LOAD_PROGRESS', payload: savedProgress });
      } else {
        // 無効なデータの場合はクリア
        clearProgress();
      }
    }
  }, []);

  return (
    <PuzzleContext.Provider value={{ state, dispatch }}>
      {children}
    </PuzzleContext.Provider>
  );
};

export const usePuzzle = () => {
  const context = useContext(PuzzleContext);
  if (context === undefined) {
    throw new Error('usePuzzle must be used within a PuzzleProvider');
  }
  return context;
};