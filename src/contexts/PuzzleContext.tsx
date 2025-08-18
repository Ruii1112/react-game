import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { PuzzleState, PuzzleAction } from '../types/puzzle';
import { PUZZLES_DATA } from '../utils/constants';
import { saveProgress, loadProgress, clearProgress } from '../utils/storage';

const initialState: PuzzleState = {
  puzzles: PUZZLES_DATA,
  currentPuzzleIndex: 0,
  unlockedPuzzles: [true, false, false, false, false],
  solvedPuzzles: [false, false, false, false, false],
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
        const newSolvedPuzzles = [...state.solvedPuzzles];
        newSolvedPuzzles[state.currentPuzzleIndex] = true;
        
        if (state.currentPuzzleIndex < state.puzzles.length - 1) {
          newUnlockedPuzzles[state.currentPuzzleIndex + 1] = true;
        }
        saveProgress(newUnlockedPuzzles, newSolvedPuzzles);

        return {
          ...state,
          isAnswerCorrect: true,
          feedback: '正解！',
          showUnlockMessage: true,
          unlockedPuzzles: newUnlockedPuzzles,
          solvedPuzzles: newSolvedPuzzles,
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
      saveProgress(newUnlockedPuzzles, state.solvedPuzzles);
      
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
        unlockedPuzzles: action.payload.unlockedPuzzles,
        solvedPuzzles: action.payload.solvedPuzzles,
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
    if (savedProgress) {
      // 新しい形式（オブジェクト）のデータ
      if (typeof savedProgress === 'object' && !Array.isArray(savedProgress)) {
        const { unlockedPuzzles, solvedPuzzles } = savedProgress;
        
        if (unlockedPuzzles && Array.isArray(unlockedPuzzles) && unlockedPuzzles.length === 5 &&
            solvedPuzzles && Array.isArray(solvedPuzzles) && solvedPuzzles.length === 5) {
          // 最初のパズルは必ずアンロックされているべき
          if (unlockedPuzzles[0] === true) {
            dispatch({ type: 'LOAD_PROGRESS', payload: { unlockedPuzzles, solvedPuzzles } });
          } else {
            // 無効なデータの場合はクリア
            clearProgress();
          }
        }
      } 
      // 古い形式（配列）のデータ
      else if (Array.isArray(savedProgress) && savedProgress.length === 5) {
        if (savedProgress[0] === true) {
          const defaultSolvedPuzzles = [false, false, false, false, false];
          dispatch({ type: 'LOAD_PROGRESS', payload: { unlockedPuzzles: savedProgress, solvedPuzzles: defaultSolvedPuzzles } });
        } else {
          clearProgress();
        }
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