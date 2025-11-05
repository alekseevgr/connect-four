import { useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { setScreen, setPlayerName } from '../../../store/uiSlice';
import styles from './multiplayer.module.css';
import { usePeerGame } from '../../../utils/usePeerGame'

export function MultiplayerSetup() {
  const dispatch = useAppDispatch();
  const [isHost, setIsHost] = useState<boolean | null>(null);
  const [targetId, setTargetId] = useState('');
  const [playerName, setPlayerNameInput] = useState('');

  const { myId, connected, sendMove } = usePeerGame(
    isHost === true,
    isHost === false ? targetId : undefined
  );

  const startGame = () => {
    if (!playerName.trim()) return alert('Введите имя!');
    dispatch(setPlayerName({ color: isHost ? 'red' : 'blue', name: playerName.trim() }));
    dispatch(setScreen('game'));
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Мультиплеер</h1>

      {!isHost && isHost !== false && (
        <div className={styles.block}>
          <button onClick={() => setIsHost(true)}>Создать комнату</button>
          <button onClick={() => setIsHost(false)}>Подключиться</button>
        </div>
      )}

      {isHost && (
        <div className={styles.block}>
          <p>Ваш Peer ID (отправьте другу):</p>
          <p><b>{myId || 'Подключаемся...'}</b></p>
        </div>
      )}

      {isHost === false && (
        <div className={styles.block}>
          <input
            value={targetId}
            onChange={(e) => setTargetId(e.target.value)}
            placeholder="Введите ID друга"
          />
        </div>
      )}

      <div className={styles.block}>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerNameInput(e.target.value)}
          placeholder="Ваше имя"
        />
      </div>

      {connected ? (
        <button className={styles.button} onClick={startGame}>
          Начать игру
        </button>
      ) : (
        <p>{isHost === null ? '' : 'Ожидание подключения...'}</p>
      )}
    </div>
  );
}