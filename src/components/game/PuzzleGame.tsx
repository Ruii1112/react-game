import React from 'react';
import { PuzzleView } from './PuzzleView';
import { AnswerSection } from './AnswerSection';
import { UnlockMessage } from './UnlockMessage';
import { ResetButton } from './ResetButton';

export const PuzzleGame: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-white">

      {/* メインコンテンツ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* ヘッダー */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
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