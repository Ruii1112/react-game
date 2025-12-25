import React from 'react';
import { PuzzleView } from './PuzzleView';
import { AnswerSection } from './AnswerSection';
import { UnlockMessage } from './UnlockMessage';
import { ResetButton } from './ResetButton';
import { usePuzzle } from '../../contexts/PuzzleContext';

export const PuzzleGame: React.FC = () => {
  const { state } = usePuzzle();
  const currentPuzzle = state.puzzles[state.currentPuzzleIndex];
  const backgroundColor = currentPuzzle?.backgroundColor || '#ffffff';

  // 背景色が暗い場合はテキストを白にする
  const isDarkBackground = backgroundColor === '#000000';
  const textColor = isDarkBackground ? 'text-white' : 'text-gray-800';

  return (
    <div
      className="min-h-screen w-full transition-colors duration-500"
      style={{ backgroundColor }}
    >

      {/* メインコンテンツ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8 pb-20 space-y-8">
        {/* ヘッダー */}
        <header className="text-center mb-8">
          <h1 className={`text-4xl md:text-5xl font-bold ${textColor}`}>
            白の部屋からの脱出
          </h1>
        </header>

        {/* パズル表示エリア */}
        <section>
          <PuzzleView />
        </section>

        {/* 成功メッセージ */}
        <UnlockMessage />

        {/* 回答入力エリア */}
        <section>
          <AnswerSection />
        </section>
      </div>

      {/* リセットボタン */}
      <ResetButton />
    </div>
  );
};