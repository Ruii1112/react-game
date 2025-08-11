import React from 'react';
import { clearProgress } from '../../utils/storage';
import { Button } from '../ui/button';
import { RotateCcw } from 'lucide-react';

export const ResetButton: React.FC = () => {
  const handleReset = () => {
    if (confirm('最初からやり直しますか？')) {
      clearProgress();
      window.location.reload();
    }
  };

  return (
    <Button
      onClick={handleReset}
      variant="outline"
      size="sm"
      className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-sm border-2 border-gray-300 shadow-lg z-50"
    >
      <RotateCcw className="w-4 h-4 mr-2" />
      最初から
    </Button>
  );
};