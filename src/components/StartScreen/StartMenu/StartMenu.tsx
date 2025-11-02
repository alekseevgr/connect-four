import { useAppDispatch } from '../../../store/hooks';
import { setGameMode, setScreen } from '../../../store/uiSlice';
import type { GameMode } from '../../../types/game';
import styles from './startMenu.module.css';
import classNames from 'classnames';

export function StartMenu() {
  const dispatch = useAppDispatch();

  const buttons: { label: string; mode: GameMode; disabled: boolean }[] = [
    { label: '2 игрока на одном ПК', mode: 'local', disabled: false },
    { label: 'Против компьютера (скоро)', mode: 'ai', disabled: true },
    { label: 'Мультиплеер (скоро)', mode: 'multiplayer', disabled: true },
  ];

  return (
   <div className={`${styles.startMenu}`}>
      <h1 className={styles.title}>Connect Four</h1>
      <div>
        {buttons.map((btn) => (
          <button
            key={btn.mode}
            className={classNames(styles.button, {
              [styles.disabled]: btn.disabled,
            })}
            onClick={() => {
              if (!btn.disabled) {
                dispatch(setGameMode(btn.mode));
                if (btn.mode === 'local') dispatch(setScreen('names'));
              }
            }}
            disabled={btn.disabled}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
