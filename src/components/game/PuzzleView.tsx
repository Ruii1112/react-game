import React from 'react';
import { usePuzzle } from '../../contexts/PuzzleContext';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Card, CardContent } from '../ui/card';
import { Lock, CheckCircle2, Play } from 'lucide-react';
import { cn } from '../../lib/utils';

export const PuzzleView: React.FC = () => {
  const { state, dispatch } = usePuzzle();
  const { puzzles, currentPuzzleIndex, unlockedPuzzles } = state;

  const handleTabChange = (value: string) => {
    const index = parseInt(value);
    // ロックされていないパズルのみ移動可能
    if (unlockedPuzzles[index]) {
      dispatch({ type: 'NAVIGATE_PUZZLE', payload: index });
    } else {
      // ロックされている場合は現在のパズルのままにする
      return;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Tabs 
        value={currentPuzzleIndex.toString()} 
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList className="w-full bg-white backdrop-blur-md p-2 h-auto flex-wrap gap-2 shadow-xl">
          {puzzles.map((puzzle, index) => {
            const isCompleted = index < currentPuzzleIndex || 
                               (index === currentPuzzleIndex && state.isAnswerCorrect);
            const isCurrent = index === currentPuzzleIndex;
            const isLocked = !unlockedPuzzles[index];
            
            return (
              <TabsTrigger
                key={puzzle.id}
                value={index.toString()}
                disabled={isLocked}
                onClick={(e) => {
                  // ロックされている場合はクリックイベントを防ぐ
                  if (isLocked) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }}
                className={cn(
                  "relative px-6 py-3 min-w-[120px] transition-all text-gray-700",
                  "data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg",
                  isCompleted && "bg-green-100 text-green-700 font-semibold",
                  isLocked && "opacity-50 cursor-not-allowed bg-gray-200 text-gray-500 pointer-events-none"
                )}
              >
                <div className="flex items-center gap-2">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isLocked ? (
                    <Lock className="w-4 h-4" />
                  ) : isCurrent ? (
                    <Play className="w-4 h-4" />
                  ) : null}
                  <span className="font-semibold">扉 {index + 1}</span>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {puzzles.map((puzzle, index) => (
          <TabsContent 
            key={puzzle.id} 
            value={index.toString()}
            className="mt-6"
          >
            <Card className="bg-white/95 backdrop-blur-md overflow-hidden">
              <CardContent className="p-0">
                {unlockedPuzzles[index] ? (
                  <div className="relative">
                    <img
                      src={puzzle.imagePath}
                      alt={`扉 ${index + 1}`}
                      className="w-full h-auto max-h-[600px] object-contain"
                    />
                    {state.isAnswerCorrect && index === currentPuzzleIndex && (
                      <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center animate-fadeIn">
                        <div className="bg-white rounded-full p-6">
                          <CheckCircle2 className="w-16 h-16 text-green-500" />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-[400px] flex flex-col items-center justify-center bg-gray-100 text-gray-500">
                    <Lock className="w-24 h-24 mb-4 text-gray-400" />
                    <h3 className="text-2xl font-bold mb-2">この扉は閉ざされています</h3>
                    <p className="text-lg">前の扉を開けてから挑戦してください</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};