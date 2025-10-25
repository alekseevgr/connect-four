import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { WinResult, GameState } from '../types/game';
import checkWin from '../utils/checkWinner';


const rows = 6 //  ряды
const cols = 7 // столбцы

const initialState: GameState = {
    board: Array.from({ length: rows }, () => Array(cols).fill(null)),
    currentPlayer: 'red',
    winner: null,
    winningCells: []
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        makeMove(state, action: PayloadAction<{ row: number, col: number }>) {

            if (state.winner) {
                return
            }
            const { row, col } = action.payload
            const newBoard = state.board.map(item => [...item]) // копия поля

            const nextPlayer = state.currentPlayer === 'red' ? 'blue' : 'red'

            const isBottom = row === rows - 1

            const isBelowFree = !isBottom && newBoard[row + 1][col] !== null

            if (newBoard[row][col] === null && (isBottom || isBelowFree)) {
                newBoard[row][col] = state.currentPlayer

                const result: WinResult = checkWin(newBoard, row, col)

                if (result.winner) {
                    console.log('WINNER:', result.winner, 'CELLS:', result.cells);
                    state.board = newBoard
                    state.winner = state.currentPlayer
                    state.winningCells = result.cells
                    return
                }
                state.board = newBoard
                state.currentPlayer = nextPlayer
                state.winningCells = result.cells
            }

        },
        resetGame(state) {
            state.board = (Array.from({ length: rows }, () => Array(cols).fill(null)))
            state.currentPlayer = 'red'
            state.winner = null
            state.winningCells = []
        }
    }
})

export const { makeMove, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
