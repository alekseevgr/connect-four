import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { StartMenu } from './StartMenu';
import { PlayerSetup } from './Players';


export function StartScreen() {
  const screen = useSelector((state: RootState) => state.ui.screen);

  if (screen === 'names') return <PlayerSetup />;
  return <StartMenu />;
}