import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setPlayerName, startGame, setGameRules, setErrorMessage, goToMenu } from '../../../store/uiSlice';
import { initGame } from '../../../store/gameSlice';
import styles from './start.module.css';
import { useState, useEffect } from 'react';


export function PlayerSetup() {
    const dispatch = useAppDispatch();
    const players = useAppSelector((state) => state.ui.players);
    const errorMessage = useAppSelector((state) => state.ui.errorMessage);

    const [rows, setRows] = useState(6);
    const [cols, setCols] = useState(7);
    const [cellToWin, setCellToWin] = useState(4);
    const [print, setPrint] = useState(false);

    const red = players.red.trim();
    const blue = players.blue.trim();
    const isName = red.length > 0 && blue.length > 0;
    const isDuplicate = red.toLowerCase() === blue.toLowerCase();
    useEffect(() => {
        if (!isName && print) {
            dispatch(setErrorMessage('Введите имена обоих игроков'));
            return;
        }

        if (isDuplicate && isName) {
            dispatch(setErrorMessage('Имена игроков должны отличаться'));
            return;
        }

        if (cellToWin > Math.min(rows, cols)) {
            dispatch(setErrorMessage('Фишек не может быть больше чем длина/высота поля'));
            return;
        }

        dispatch(setErrorMessage(null));
    }, [print, isName, isDuplicate, rows, cols, cellToWin, dispatch]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (errorMessage) return;

        dispatch(setGameRules({ rows, cols, cellToWin }));
        dispatch(initGame({ rows, cols, cellToWin }));
        dispatch(startGame());
    };

    console.log('errorMessage:', errorMessage);

    const nameError =
        (!isName && print) || (isDuplicate && isName) ? errorMessage : null;

    const fieldError =
        cellToWin > Math.min(rows, cols) ? errorMessage : null;
    return (
        <form className={styles.container}
            onSubmit={handleSubmit}
        >
            <div className={styles.block}>
                <h1 className={styles.title}>Введите имена игроков и выберите правила игры</h1>


                <div className={styles.players}>
                    <div className={styles.player}>
                        <label className={styles.red}>Игрок 1 (красный)</label>
                        <input
                            type="text"
                            autoFocus
                            value={players.red}
                            onChange={(e) => {
                                setPrint(true);
                                dispatch(setPlayerName({ color: 'red', name: e.target.value }))
                            }
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
                            onChange={(e) => {
                                setPrint(true);
                                dispatch(setPlayerName({ color: 'blue', name: e.target.value }))
                            }
                            }
                            placeholder="Введите имя"
                            className={styles.inputBlue}
                        />
                    </div>
                    {nameError && <p className={styles.error}>{nameError}</p>}
                </div>
                <div className={styles.rules}>
                    <h3>Параметры поля</h3>
                    <label>
                        Строки: {rows}
                        <input
                            type="range"
                            min="4"
                            max="10"
                            value={rows}
                            onChange={(e) => setRows(Number(e.target.value))}
                        />
                    </label>
                    <label>
                        Столбцы: {cols}
                        <input
                            type="range"
                            min="4"
                            max="10"
                            value={cols}
                            onChange={(e) => setCols(Number(e.target.value))}
                        />
                    </label>


                    <label>
                        Для победы нужно {cellToWin} фишки
                        <input
                            type="range"
                            min="4"
                            max="10"
                            value={cellToWin}
                            onChange={(e) => setCellToWin(Number(e.target.value))}
                        />
                    </label>

                    {fieldError && <p className={styles.error}>{fieldError}</p>}
                </div>

                <div className={styles.buttons}>
                    <button
                        className={styles.button}
                        type="submit"
                        disabled={!!errorMessage || !isName}
                        title={errorMessage || ''}
                    >
                        Начать игру
                    </button>
                    <button
                        className={styles.button}
                        type="button"
                        onClick={() => dispatch(goToMenu())}
                    >
                        Назад в меню
                    </button>
                </div>
            </div>

            <div className={styles.block}>

                <div className={styles.rules}>
                    <h3>Правила игры</h3>
                    <p>Игроки по очереди сбрасывают фишки в столбцы.</p>
                    <p>Побеждает тот, кто первым соберёт <strong>{cellToWin}</strong> фишек подряд — по горизонтали, вертикали или диагонали.</p>
                </div>


                <h2>Параметры игры</h2>

                <div className={styles.settings}>
                    <p><strong>Игрок 1:</strong> {red || '—'}</p>
                    <p><strong>Игрок 2:</strong> {blue || '—'}</p>
                    <p><strong>Строк:</strong> {rows}</p>
                    <p><strong>Столбцов:</strong> {cols}</p>
                    <p><strong>Фишек для победы:</strong> {cellToWin}</p>
                </div>


            </div>
        </form>
    );
}
