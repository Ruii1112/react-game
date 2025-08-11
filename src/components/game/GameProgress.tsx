import React from 'react';
import { usePuzzle } from '../../contexts/PuzzleContext';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { Trophy, Lock, CheckCircle, Circle } from 'lucide-react';

export const GameProgress: React.FC = () => {
  const { state } = usePuzzle();
  const { puzzles, currentPuzzleIndex, unlockedPuzzles } = state;
  
  const completedCount = unlockedPuzzles.filter((unlocked, index) => 
    index < currentPuzzleIndex || (index === currentPuzzleIndex && state.isAnswerCorrect)
  ).length;
  
  const progressPercentage = (completedCount / puzzles.length) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* プログレスバー */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 space-y-4 shadow-2xl border border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-bold text-white">進捗状況</h2>
          </div>
          <Badge variant="success" className="text-lg px-4 py-1 bg-green-500 text-white border-0">
            {completedCount} / {puzzles.length}
          </Badge>
        </div>
        
        <Progress value={progressPercentage} className="h-3" />
        
        {/* ステップインジケーター */}
        <div className="flex items-center justify-between mt-6">
          {puzzles.map((puzzle, index) => {
            const isCompleted = index < currentPuzzleIndex || 
                               (index === currentPuzzleIndex && state.isAnswerCorrect);
            const isCurrent = index === currentPuzzleIndex && !state.isAnswerCorrect;
            const isLocked = !unlockedPuzzles[index];
            
            return (
              <div key={puzzle.id} className="flex flex-col items-center gap-2">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all",
                    isCompleted && "bg-green-500 text-white shadow-lg shadow-green-500/50",
                    isCurrent && "bg-blue-500 text-white shadow-lg shadow-blue-500/50 animate-pulse",
                    isLocked && !isCompleted && "bg-gray-300 text-gray-600",
                    !isCompleted && !isCurrent && !isLocked && "bg-white text-gray-700 border-2 border-gray-300"
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : isLocked ? (
                    <Lock className="w-5 h-5" />
                  ) : (
                    <Circle className="w-6 h-6" />
                  )}
                </div>
                <span className={cn(
                  "text-xs font-medium",
                  isCompleted && "text-green-400 font-bold",
                  isCurrent && "text-blue-400 font-bold",
                  isLocked && !isCompleted && "text-gray-400",
                  !isCompleted && !isCurrent && !isLocked && "text-white/70"
                )}>
                  {index + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* 現在のステージ情報 */}
      <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
        <h3 className="text-2xl font-bold text-white mb-2">
          ステージ {currentPuzzleIndex + 1}
        </h3>
        <p className="text-white/80 font-medium">
          {state.isAnswerCorrect ? "クリア！次のステージへ進みましょう" : "謎を解いて次へ進もう"}
        </p>
      </div>
    </div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}