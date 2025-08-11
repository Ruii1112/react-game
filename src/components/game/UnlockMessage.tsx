import React, { useEffect } from 'react';
import { usePuzzle } from '../../contexts/PuzzleContext';
import { clearProgress } from '../../utils/storage';

export const UnlockMessage: React.FC = () => {
  const { state, dispatch } = usePuzzle();
  const { puzzles, currentPuzzleIndex, showUnlockMessage } = state;
  const isLastPuzzle = currentPuzzleIndex === puzzles.length - 1;

  // 正解時に自動的に次の問題へ移動
  useEffect(() => {
    if (showUnlockMessage && !isLastPuzzle) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CONTINUE_TO_NEXT' });
      }, 1500); // 1.5秒後に自動遷移
      return () => clearTimeout(timer);
    }
  }, [showUnlockMessage, isLastPuzzle, dispatch]);

  if (!showUnlockMessage) {
    return null;
  }

  const handleRestart = () => {
    clearProgress();
    window.location.reload();
  };

  if (isLastPuzzle) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-3xl p-8 text-center max-w-md w-full shadow-2xl">
          <div className="text-6xl mb-6">🚪</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            脱出成功！
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            白の部屋から無事に脱出できました。
          </p>
          <button 
            onClick={handleRestart}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105 focus:ring-4 focus:ring-purple-200"
          >
            もう一度挑戦する
          </button>
        </div>
      </div>
    );
  }

  // 最後の問題以外は何も表示しない（自動遷移のみ）
  return null;
};