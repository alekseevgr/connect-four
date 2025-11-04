import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { makeMove, resetGame } from '../../store/gameSlice';
import { useState } from 'react';
import { Cell } from '../Cell/Cell';
import styles from './board.module.css';
import { goToMenu } from '../../store/uiSlice';
import { useEffect } from 'react';
import { addWin } from '../../store/statsSlice';
import { Stats } from '../Stats/Stats';
import { FinishResult } from '../FinishResult/FinishResult'
import { UndoRedo } from './UndoRedo';
import aiMove from '../../utils/aiMove';
import { useRealtimeGame } from '../../utils/useRealtimeGame';
import { receiveMove } from '../../store/multiplayerSlice';



export function Board() {

    const dispatch = useAppDispatch();
    const { red, blue } = useAppSelector((state) => state.ui.players);
    const { board, currentPlayer, winner, winningCells } = useAppSelector((state) => state.game);
    const gameMode = useAppSelector((state) => state.ui.gameMode);
    const { roomId } = useAppSelector((state) => state.multiplayer);

    const [curColumn, setCurColumn] = useState<number | null>(null);




    const currentName = currentPlayer === 'player_1' ? red : blue
    const winnerName = winner === 'player_1' ? red : blue


    const { sendMove, playersCount } = useRealtimeGame(roomId!, currentName, (column: number) => {
        dispatch(receiveMove(column));
        dispatch(makeMove({ col: column }));
    });

    const text = (
        <h2>
            {gameMode === 'ai' && currentPlayer === 'player_2'
                ? 'Ходит компьютер'
                : <>Ходит игрок{' '}
                    <span className={currentPlayer === 'player_1' ? styles.red : styles.blue}>
                        {currentName}
                    </span>
                </>
            }
        </h2>
    );

    const winnerText = (
        <h2>
            Победил{' '}
            <span className={winner === 'player_1' ? styles.red : styles.blue}>
                {winnerName}
            </span>
        </h2>
    );
    const isDraw = winner === 'draw';

    const drawText = <h2>Ничья </h2>;

    useEffect(() => {
        if (winner === 'player_1') {
            dispatch(addWin(red));
        } else if (winner === 'player_2') {
            dispatch(addWin(blue));
        }
    }, [winner, red, blue, dispatch]);

    const isColumnFull = (cellIndex: number) => board[0][cellIndex] !== null;
    const getBottomCell = (cellIndex: number) => {
        for (let row = board.length - 1; row >= 0; row--) {
            if (board[row][cellIndex] === null) {
                return row;
            }
        }
        return null;
    };

    const handleColumnClick = async (cellIndex: number) => {
        if (winner) return;
        if (isColumnFull(cellIndex)) return;
        if (gameMode === 'multiplayer' && playersCount < 2) return;

        if (gameMode === 'ai' && currentPlayer === 'player_2') return; //  нельзя кликнуть когда комп в игре

        dispatch(makeMove({ col: cellIndex }));

        if (gameMode === 'multiplayer') {
            sendMove(cellIndex);
            return;
        }

        if (gameMode === 'ai') {
            setTimeout(() => {
                const columnForAi = aiMove(board)
                if (columnForAi !== null) {
                    dispatch(makeMove({ col: columnForAi }))
                }
            }, 1000)
        }

    };


    return (
        <div className={styles.boardWrapper}>
            <div className={styles.game}>
                <h1 className={styles.title}> Очень увлекательная игра</h1>
                {gameMode === 'multiplayer' && (
                    <p className={styles.roomInfo}>
                        Комната: <b>{roomId}</b> ({playersCount}/2 игроков)
                    </p>
                )}
                {gameMode === 'multiplayer' && playersCount < 2 && (
                    <h3>Ожидание второго игрока...</h3>
                )}
                {isDraw ? drawText : winner ? winnerText : text}

                <div className={styles.board}
                    style={{
                        gridTemplateColumns: `repeat(${board[0]?.length}, 1fr)`,
                        gridTemplateRows: `repeat(${board.length}, 1fr)`,
                    }}>
                    {board.map((row, rowIndex) =>
                        row.map((cell, cellIndex) => {
                            const hoveredCell = getBottomCell(cellIndex) === rowIndex;


                            return (<Cell
                                key={`${rowIndex}-${cellIndex}`}
                                color={cell}
                                isWinning={winningCells.some(([r, c]) => r === rowIndex && c === cellIndex)}
                                onClick={() => handleColumnClick(cellIndex)}
                                info={
                                    rowIndex === 0 && !winner && isColumnFull(cellIndex) ? 'Столбец заполнен' : undefined
                                }
                                isHover={curColumn === cellIndex && hoveredCell}
                                onHover={() => setCurColumn(cellIndex)}
                                onLeave={() => setCurColumn(null)}
                                hoverColor={currentPlayer}
                            />)
                        }
                        ))}
                </div>
                {gameMode !== 'multiplayer' && <UndoRedo />}
                <div className={styles.buttonContainer}>
                    <button className={styles.resetButton} onClick={() => dispatch(resetGame())}>
                        Начать заново
                    </button>
                    <button className={styles.resetButton} onClick={() => {
                        dispatch(resetGame());
                        dispatch(goToMenu());
                    }}>
                        В меню
                    </button>
                </div>
            </div>
            <div className={styles.stats}>
                <Stats />
            </div>
            <FinishResult />
        </div>


    )

}