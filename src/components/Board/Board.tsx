import  { useState } from 'react';
import { Cell } from '../Cell/Cell';
import styles from './board.module.css'

const rows = 6 //  ряды
const cols = 7 // столбцы

type CellValue = null | 'red' | 'blue' //тип ячейки
type Player = 'red' | 'blue' // тип игрока

export function Board() {
    const [board, setBoard] = useState<CellValue[][]>(
        Array.from({ length: rows }, () => Array(cols).fill(null)) 
    ) // создаем поле в котором будет массив из 6 рядов ив каждом будет по 7 элментов(столбцов)
    const [currentPlayer, setPlayer] = useState<Player>('red') // выбираем игрока

    const handleClick = (row: number, col: number) => {
        const newBoard = board.map(row => [...row]) // копия поля

        const nextPlayer = currentPlayer === 'red' ? 'blue' : 'red'

        const isBottom = row === rows - 1

        const nextFreeCell = !isBottom && newBoard[row + 1][col] !== null

        if(newBoard[row][col] === null && (isBottom || nextFreeCell)){
            newBoard[row][col] = currentPlayer
            setBoard(newBoard)
            setPlayer(nextPlayer)
        }
        
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