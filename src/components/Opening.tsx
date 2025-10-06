import { useEffect } from 'react';

interface OpeningProps {
  onComplete: () => void;
}

export function Opening({ onComplete }: OpeningProps) {
  useEffect(() => {
    // オープニングアニメーション完了後にコールバックを実行
    const timer = setTimeout(() => {
      onComplete();
    }, 8000); // 8秒後に完了

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <h1 className="text-white text-4xl md:text-6xl font-bold animate-opening">
        白の部屋からの脱出
      </h1>
    </div>
  );
}
