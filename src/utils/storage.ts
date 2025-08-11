import { STORAGE_KEY } from './constants';

export const saveProgress = (unlockedPuzzles: boolean[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(unlockedPuzzles));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
};

export const loadProgress = (): boolean[] | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
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