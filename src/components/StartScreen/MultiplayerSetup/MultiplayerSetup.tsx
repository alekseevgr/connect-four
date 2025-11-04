import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setScreen, setPlayerName } from '../../../store/uiSlice';
import {
  setRoomId,
  setPlayerRole,
  setConnected,
} from '../../../store/multiplayerSlice';
import { useRealtimeGame } from '../../../utils/useRealtimeGame';
import styles from './multiplayer.module.css';

export function MultiplayerSetup() {
  const dispatch = useAppDispatch();
  const { roomId } = useAppSelector((state) => state.multiplayer);

  const [inputRoomId, setInputRoomId] = useState('');
  const [generatedRoomId] = useState(() =>
    Math.random().toString(36).slice(2, 8)
  );
  const [playerName, setPlayerNameInput] = useState('');
  const [mode, setMode] = useState<'create' | 'join' | null>(null);

  const { playersCount } = useRealtimeGame(roomId ?? '', playerName, () => { });

  useEffect(() => {

    if (mode && playersCount === 2) {
      dispatch(setConnected(true));
      dispatch(setScreen('game'));
    }
  }, [playersCount, mode, dispatch]);

  const handleCreateRoom = () => {
    if (!playerName.trim()) return alert('Введите имя!');
    dispatch(setPlayerName({ color: 'red', name: playerName.trim() }));
    dispatch(setRoomId(generatedRoomId));
    dispatch(setPlayerRole('player_1'));
    setMode('create');
  };

  const handleJoinRoom = () => {
    if (!playerName.trim()) return alert('Введите имя!');
    if (!inputRoomId.trim()) return alert('Введите ID комнаты!');
    dispatch(setPlayerName({ color: 'blue', name: playerName.trim() }));
    dispatch(setRoomId(inputRoomId.trim()));
    dispatch(setPlayerRole('player_2'));
    setMode('join');
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Мультиплеер</h1>

      <div className={styles.block}>
        <h3>Введите ваше имя</h3>
        <input
          className={styles.inputMultiplayer}
          type="text"
          value={playerName}
          onChange={(e) => setPlayerNameInput(e.target.value)}
          placeholder="Ваше имя"
        />
      </div>

      <div className={styles.block}>
        <h3>Создать комнату</h3>
        <p>Отправьте этот ID другу:</p>
        <p><b>{generatedRoomId}</b></p>
        <button className={styles.button} onClick={handleCreateRoom}>
          Создать
        </button>
      </div>

      <div className={styles.block}>
        <h3>Присоединиться</h3>
        <input
          className={styles.inputMultiplayer}
          type="text"
          value={inputRoomId}
          onChange={(e) => setInputRoomId(e.target.value)}
          placeholder="Введите ID комнаты"
        />
        <button className={styles.button} onClick={handleJoinRoom}>
          Подключиться
        </button>
      </div>

      {mode && (
        <div className={styles.block}>
          <h3>Комната готова!</h3>
          <p>
            {mode === 'create'
              ? `Ожидание второго игрока... (${playersCount}/2)`
              : `Вы подключились к комнате ${roomId}.`}
          </p>
          {playersCount === 2 && (
            <button
              className={styles.button}
              onClick={() => dispatch(setScreen('game'))}
            >
              Начать игру
            </button>
          )}
        </div>
      )}

      <button
        className={styles.backButton}
        onClick={() => dispatch(setScreen('menu'))}
      >
        Назад в меню
      </button>
    </div>
  );
}
