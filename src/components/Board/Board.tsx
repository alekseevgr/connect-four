import { useSelector, useDispatch } from 'react-redux';
import { makeMove, resetGame } from '../../store/gameSlice';
import type { RootState } from '../../store/store';
import { Cell } from '../Cell/Cell';
import styles from './board.module.css';


export function Board() {

    const dispatch = useDispatch()
    const { board, currentPlayer, winner, winningCells } = useSelector((state: RootState) => state.game);

    const text = (
        <h2> Ходит игрок
            <span className={currentPlayer === 'red' ? styles.red : styles.blue}>
                {currentPlayer}
            </span>
        </h2>
    )
    const winnerText = (
        <h2>
            Победил
            <span className={winner === 'red' ? styles.red : styles.blue}>
                {winner}
            </span>
        </h2>
    )

    return (
        <div className={styles.boardWrapper}>
            <h1 className={styles.title}> Очень увлекательная игра</h1>
            {winner ? winnerText : text}

            <div className={styles.board}>
                {board.map((row, rowIndex) =>
                    row.map((cell, cellIndex) => (
                        <Cell
                            key={`${rowIndex}-${cellIndex}`}
                            color={cell}
                            isWinning={winningCells.some(([r, c]) => r === rowIndex && c === cellIndex)}
                            onClick={() => dispatch(makeMove({ row: rowIndex, col: cellIndex }))}
                        />
                    )))}
            </div>
            <button className={styles.resetButton} onClick={() => dispatch(resetGame())}>
                Начать заново
            </button>
        </div>


    )

}