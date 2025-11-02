import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { resetStats } from '../../store/statsSlice';
import styles from './stats.module.css';

export function Stats() {
  const players = useAppSelector((state) => state.stats.players);
  const dispatch = useAppDispatch();

  if (players.length === 0) return null;

  return (
    <div className={styles.panel}>
      <h3>Рейтинг побед</h3>
      <ul>
        {[...players].sort((a, b) => b.countWin - a.countWin)
          .map((p) => (
            <li key={p.name}>
              {p.name}: {p.countWin}
            </li>
          ))}
      </ul>
      <button className={styles.button} onClick={() => dispatch(resetStats())}>Сбросить</button>
    </div>
  );
}
