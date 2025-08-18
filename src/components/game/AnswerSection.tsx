import React, { useState, useEffect } from 'react';
import { usePuzzle } from '../../contexts/PuzzleContext';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { cn } from '../../lib/utils';

export const AnswerSection: React.FC = () => {
  const { state, dispatch } = usePuzzle();
  const { currentPuzzleIndex, unlockedPuzzles, solvedPuzzles, puzzles, feedback, isAnswerCorrect } = state;
  const [answer, setAnswer] = useState('');
  const isSolved = solvedPuzzles[currentPuzzleIndex];
  const currentPuzzle = puzzles[currentPuzzleIndex];
  
  useEffect(() => {
    if (isSolved) {
      setAnswer(currentPuzzle.answer);
    } else {
      setAnswer('');
    }
  }, [currentPuzzleIndex, isSolved, currentPuzzle.answer]);

  if (!unlockedPuzzles[currentPuzzleIndex]) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      dispatch({ type: 'CHECK_ANSWER', payload: answer.trim() });
      if (!isAnswerCorrect) {
        setTimeout(() => setAnswer(''), 1000); // 不正解時は1秒後にクリア
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAnswer(value);
  };

  return (
    <Card className="bg-white max-w-2xl mx-auto border border-gray-200">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl text-gray-800 font-bold">
          パスワード入力
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Input
              type="text"
              value={answer}
              onChange={handleInputChange}
              placeholder="パスワードを入力"
              className={cn(
                "text-center text-2xl font-bold h-14 px-4",
                (isAnswerCorrect || isSolved) && "bg-green-50 border-green-400",
                feedback && !isAnswerCorrect && "border-red-400"
              )}
              pattern="[0-9]*"
              inputMode="numeric"
              disabled={isAnswerCorrect || isSolved}
              autoComplete="off"
              autoFocus={!isSolved}
            />
          </div>
          
          <div className="flex gap-3">
            <Button
              type="submit"
              variant={isAnswerCorrect || isSolved ? "success" : "default"}
              size="xl"
              disabled={!answer.trim() || isAnswerCorrect || isSolved}
              className="flex-1 h-14 text-lg font-bold min-w-[150px]"
            >
              {isAnswerCorrect || isSolved ? "解除成功" : "確認"}
            </Button>
          </div>
        </form>
        
        {/* フィードバック表示 */}
        {(feedback || isSolved) && (
          <div 
            className={cn(
              "p-4 rounded text-center",
              (isAnswerCorrect || isSolved)
                ? "bg-green-50 text-green-800 border border-green-300" 
                : "bg-red-50 text-red-800 border border-red-300"
            )}
          >
            {isAnswerCorrect || isSolved ? "正解！扉が開きました" : "違うようです..."}
          </div>
        )}
        
      </CardContent>
    </Card>
  );
};