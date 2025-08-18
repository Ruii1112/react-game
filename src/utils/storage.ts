import { STORAGE_KEY } from './constants';

interface ProgressData {
  unlockedPuzzles: boolean[];
  solvedPuzzles: boolean[];
}

export const saveProgress = (unlockedPuzzles: boolean[], solvedPuzzles: boolean[]): void => {
  try {
    const data: ProgressData = { unlockedPuzzles, solvedPuzzles };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
};

export const loadProgress = (): ProgressData | boolean[] | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    
    const parsed = JSON.parse(saved);
    
    // 新しい形式のデータ（オブジェクト）
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as ProgressData;
    }
    
    // 古い形式のデータ（配列）
    if (Array.isArray(parsed)) {
      return parsed;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to load progress:', error);
    return null;
  }
};

export const clearProgress = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear progress:', error);
  }
};