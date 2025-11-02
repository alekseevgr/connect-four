import styles from './finishResult.module.css';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { resetGame } from '../../store/gameSlice';
import { goToMenu } from '../../store/uiSlice';
import { useState, useEffect } from 'react';

export function FinishResult() {
    const dispatch = useAppDispatch();
    const { winner } = useAppSelector((state) => state.game);
    const { red, blue } = useAppSelector((state) => state.ui.players);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (winner) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [winner]);

    if (!winner || !visible) return null;

    const whoWin =
        winner === 'player_1' ? red :
            winner === 'player_2' ? blue :
                'Ничья';

    const winnerText = (
        <h2>
            Победил{' '}
            <span className={winner === 'player_1' ? styles.red : styles.blue}>
                {whoWin}
            </span>
        </h2>
    );

    return (
        <div className={styles.container}>
            <div className={styles.result}>
                <button
                    className={styles.closeButton}
                    onClick={() => setVisible(false)}
                    aria-label="Закрыть"
                >
                    ×
                </button>
                <div className={styles.title}>{winnerText}</div>
                <p className={styles.title}>Хотите сыграть ещё раз?</p>
                <div className={styles.buttons}>
                    <button
                        className={styles.button}
                        onClick={() => dispatch(resetGame())}
                    >
                        Новая игра
                    </button>
                    <button className={styles.button}
                        onClick={() => {
                            dispatch(resetGame());
                            dispatch(goToMenu());
                        }}
                    >
                        В меню
                    </button>
                </div>
            </div>
        </div>

    );
}
