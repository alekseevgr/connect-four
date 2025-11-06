import { useAppDispatch } from '../../../store/hooks';
import { setGameMode, setScreen } from '../../../store/uiSlice';
import type { GameMode } from '../../../types/game';
import styles from './startMenu.module.css';
import classNames from 'classnames';
import { startGame, setPlayerName } from '../../../store/uiSlice';

export function StartMenu() {
  const dispatch = useAppDispatch();

  const buttons: { label: string; mode: GameMode; disabled: boolean }[] = [
    { label: '2 игрока на одном ПК', mode: 'local', disabled: false },
    { label: 'Против компьютера', mode: 'ai', disabled: false },
  ];

  const quickStart = (mode: GameMode) => {
    if (mode === 'multiplayer') return;

    dispatch(setGameMode(mode));

    dispatch(setPlayerName({ color: 'red', name: 'Игрок 1' }));
    dispatch(setPlayerName({ color: 'blue', name: mode === 'ai' ? 'Компьютер' : 'Игрок 2' }));

    dispatch(startGame());
  };

  return (
    <div className={`${styles.startMenu}`}>
      <h1 className={styles.title}>Connect Four</h1>
      <div>
        {buttons.map((btn) => (
          <div key={btn.mode} className={styles.startButtons}>
            <button
              key={btn.mode}
              className={classNames(styles.button, {
                [styles.disabled]: btn.disabled,
              })}
              onClick={() => {
                if (!btn.disabled) {
                  dispatch(setGameMode(btn.mode));
                  if (btn.mode === 'local' || btn.mode === 'ai') {
                    dispatch(setScreen('names'));
                  }
                }
              }}
              disabled={btn.disabled}
            >
              {btn.label}
            </button>
            {!btn.disabled && (
              <button
                className={styles.quickStart}
                title="Быстрый старт"
                onClick={() => quickStart(btn.mode)}
              >
                ⚡
              </button>)}
          </div>
        ))}
      </div>
    </div>
  );
}
