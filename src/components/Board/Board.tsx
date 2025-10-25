import { useState } from 'react';
import { Cell } from '../Cell/Cell';
import styles from './board.module.css'
import type { Player, CellValue } from '../../types/game';
import checkWin from '../../utils/checkWinner';

const rows = 6 //  ряды
const cols = 7 // столбцы



export function Board() {
    const [board, setBoard] = useState<CellValue[][]>(
        Array.from({ length: rows }, () => Array(cols).fill(null))
    ) // создаем поле в котором будет массив из 6 рядов ив каждом будет по 7 элментов(столбцов)
    const [currentPlayer, setPlayer] = useState<Player>('red') // выбираем игрока
    const [winner, setWinner] = useState<Player | null>(null)

    const resetGame = () => {
        setBoard(Array.from({ length: rows }, () => Array(cols).fill(null)))
        setPlayer('red')
        setWinner(null)
    }

    const handleClick = (row: number, col: number) => {

        if (winner) {
            return
        }
        const newBoard = board.map(item => [...item]) // копия поля

        const nextPlayer = currentPlayer === 'red' ? 'blue' : 'red'

        const isBottom = row === rows - 1

        const isBelowFree = !isBottom && newBoard[row + 1][col] !== null

        if (newBoard[row][col] === null && (isBottom || isBelowFree)) {
            newBoard[row][col] = currentPlayer
            setBoard(newBoard)

            if (checkWin(newBoard, row, col)) {
                setWinner(currentPlayer)
                alert(`Победил игрок ${currentPlayer}`)
                return
            }
            setPlayer(nextPlayer)
        }

    }

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
                            onClick={() => handleClick(rowIndex, cellIndex)}
                        />
                    )))}
            </div>
            <button className={styles.resetButton} onClick={resetGame}>
                Начать заново
            </button>
        </div>


    )

}