import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { makeMove, resetGame } from '../../store/gameSlice';
import { useState } from 'react';
import { Cell } from '../Cell/Cell';
import styles from './board.module.css';
import { goToMenu } from '../../store/uiSlice';
import { useEffect } from 'react';
import { addWin } from '../../store/statsSlice';
import { Stats } from '../Stats/Stats';


export function Board() {

    const dispatch = useAppDispatch();
    const { red, blue } = useAppSelector((state) => state.ui.players);
    const { board, currentPlayer, winner, winningCells } = useAppSelector((state) => state.game);
    const [curColumn, setCurColumn] = useState<number | null>(null);



    const currentName = currentPlayer === 'red' ? red : blue
    const winnerName = winner === 'red' ? red : blue


    const text = (
        <h2>
            Ходит игрок{' '}
            <span className={currentPlayer === 'red' ? styles.red : styles.blue}>
                {currentName}
            </span>
        </h2>
    );

    const winnerText = (
        <h2>
            Победил{' '}
            <span className={winner === 'red' ? styles.red : styles.blue}>
                {winnerName}
            </span>
        </h2>
    );
    const isDraw = winner === 'draw';

    const drawText = <h2>Ничья </h2>;

    useEffect(() => {
        if (winner === 'red') {
            dispatch(addWin(red));
        } else if (winner === 'blue') {
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

    const handleColumnClick = (cellIndex: number) => {
        if (winner) return;
        if (isColumnFull(cellIndex)) return;

        dispatch(makeMove({ col: cellIndex }));

    };




    return (
        <div className={styles.boardWrapper}>
            <h1 className={styles.title}> Очень увлекательная игра</h1>
            <Stats />
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


    )

}