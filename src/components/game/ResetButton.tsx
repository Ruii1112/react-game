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
      className="fixed bottom-4 right-4 bg-white/80 backdrop-blur-sm"
    >
      <RotateCcw className="w-4 h-4 mr-2" />
      最初から
    </Button>
  );
};