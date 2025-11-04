import { useSelector } from 'react-redux';
import type { RootState } from './store/store';
import { StartScreen } from './components/StartScreen/StartScreen';
import { Board } from './components/Board/Board';

export default function App() {
  const screen = useSelector((state: RootState) => state.ui.screen);

  if (screen === 'menu' || screen === 'names' || screen === 'multiplayerSetup') return <StartScreen />;
  if (screen === 'game') return <Board />;

  return null;
}
