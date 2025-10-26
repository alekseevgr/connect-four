import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { setPlayerName, startGame } from '../../store/uiSlice';
import styles from './start.module.css';

export function PlayerSetup() {
  const dispatch = useDispatch();
  const players = useSelector((state: RootState) => state.ui.players);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Введите имена игроков</h1>

      <div className={styles.players}>
        <div className={styles.player}>
          <label className={styles.red}>Игрок 1 (красный)</label>
          <input
            type="text"
            value={players.red}
            onChange={(e) =>
              dispatch(setPlayerName({ color: 'red', name: e.target.value }))
            }
            placeholder="Введите имя"
            className={styles.inputRed}
          />
        </div>

        <div className={styles.player}>
          <label className={styles.blue}>Игрок 2 (синий)</label>
          <input
            type="text"
            value={players.blue}
            onChange={(e) =>
              dispatch(setPlayerName({ color: 'blue', name: e.target.value }))
            }
            placeholder="Введите имя"
            className={styles.inputBlue}
          />
        </div>
      </div>

      <button
        className={styles.button}
        onClick={() => dispatch(startGame())}
        disabled={!players.red || !players.blue}
      >
        Начать игру
      </button>
    </div>
  );
}
