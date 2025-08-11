import { PuzzleProvider } from './contexts/PuzzleContext';
import { PuzzleGame } from './components';

function App() {
  return (
    <PuzzleProvider>
      <PuzzleGame />
    </PuzzleProvider>
  );
}

export default App;
