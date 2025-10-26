import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setPlayerName, startGame } from '../../store/uiSlice';
import styles from './start.module.css';

export function PlayerSetup() {
    const dispatch = useAppDispatch();
    const players = useAppSelector((state) => state.ui.players);


    const red = players.red.trim();
    const blue = players.blue.trim();
    const isName = red.length > 0 && blue.length > 0;
    const isDuplicate = red.toLowerCase() === blue.toLowerCase();
    const isValid = isName && !isDuplicate;


    return (
        <form className={styles.container}
            onSubmit={(e) => {
                e.preventDefault();
                if (isValid) dispatch(startGame());
            }}
        >
            <h1 className={styles.title}>Введите имена игроков</h1>

            <div className={styles.players}>
                <div className={styles.player}>
                    <label className={styles.red}>Игрок 1 (красный)</label>
                    <input
                        type="text"
                        autoFocus
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
            {isName && !isValid && (
                <p>Имена игроков должны отличаться</p>
            )}

            <button
                className={styles.button}
                type="submit"
                disabled={!isValid}
            >
                Начать игру
            </button>
        </form>
    );
}
