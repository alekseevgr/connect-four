import  { useState } from 'react';
import { Cell } from '../Cell/Cell';
import styles from './board.module.css'

const rows = 6 //  ряды
const cols = 7 // столбцы

type CellValue = null | 'red' | 'blue' //тип ячейки
type Player = 'red' | 'blue'

export function Board() {
    const [board, setBoard] = useState<CellValue[][]>(
        Array.from({ length: rows }, () => Array(cols).fill(null))
    )
    const [currentPlayer, setPlayer] = useState<Player>('red')

    const handleClick = (row: number, col: number) => {
        const newBoard = board.map(row => [...row])
        if (newBoard[row][col] !== null) return;
        newBoard[row][col] = currentPlayer

        const nextPlayer = currentPlayer === 'red' ? 'blue' : 'red'

        setBoard(newBoard)

        setPlayer(nextPlayer)
    }

    return (
        <div className={styles.boardWrapper}>
            <h1 className={styles.title}> Очень увлекательная игра</h1>
            <h2> Ходит игрок
                <span className={currentPlayer === 'red' ? styles.red : styles.blue}>{currentPlayer}</span>
            </h2>

            <div className={styles.board}>
                {board.map((row, rowIndex) =>
                    row.map((cell, cellIndex) => (
                        <Cell
                            key={`${rowIndex - cellIndex}`}
                            color={cell}
                            onClick={() => handleClick(rowIndex, cellIndex)}
                        />
                    )))}
            </div>
        </div>


    )

}