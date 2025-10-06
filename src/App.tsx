import { useState } from 'react';
import { PuzzleProvider } from './contexts/PuzzleContext';
import { PuzzleGame } from './components';
import { Opening } from './components/Opening';

function App() {
  const [openingComplete, setOpeningComplete] = useState(false);

  const handleOpeningComplete = () => {
    setOpeningComplete(true);
  };

  return (
    <>
      {!openingComplete && <Opening onComplete={handleOpeningComplete} />}
      <div className={openingComplete ? 'animate-fadeIn' : 'opacity-0'}>
        <PuzzleProvider>
          <PuzzleGame />
        </PuzzleProvider>
      </div>
    </>
  );
}

export default App;
