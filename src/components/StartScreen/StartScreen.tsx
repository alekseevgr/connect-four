import { useAppSelector } from '../../store/hooks'
import { StartMenu } from './StartMenu/StartMenu';
import { PlayerSetup } from './PlayerSetup/PlayerSetup';


export function StartScreen() {
  const screen = useAppSelector((state) => state.ui.screen);

  if (screen === 'names') return <PlayerSetup />;
  return <StartMenu />;
}