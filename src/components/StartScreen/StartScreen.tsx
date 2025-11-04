import { useAppSelector } from '../../store/hooks'
import { StartMenu } from './StartMenu/StartMenu';
import { PlayerSetup } from './PlayerSetup/PlayerSetup';
import { MultiplayerSetup } from './MultiplayerSetup/MultiplayerSetup';




export function StartScreen() {
  const screen = useAppSelector((state) => state.ui.screen);

  if (screen === 'names') return <PlayerSetup />;
    if (screen === 'multiplayerSetup') return <MultiplayerSetup />;
  return <StartMenu />;
}