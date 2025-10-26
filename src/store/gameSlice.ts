import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { WinResult, GameState } from '../types/game';
import checkWin from '../utils/checkWinner';
import { isBoardFull } from '../utils/isBoardfull';
import createEmptyBoard from '../utils/createBoard';


const rows = 6 //  ряды
const cols = 7 // столбцы

const initialState: GameState = {
    board: createEmptyBoard(rows, cols),
    currentPlayer: 'red',
    winner: null,
    winningCells: []
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        makeMove(state, action: PayloadAction<{ col: number }>) {

            if (state.winner) {
                return
            }
            const { col } = action.payload
            const newBoard = state.board.map(item => [...item]) // копия поля

            const nextPlayer = state.currentPlayer === 'red' ? 'blue' : 'red'

            let row = -1;
            for (let r = newBoard.length - 1; r >= 0; r--) {
                if (newBoard[r][col] === null) {
                    row = r;
                    break;
                }
            }
            if (row === -1) return;

            newBoard[row][col] = state.currentPlayer;

            const result: WinResult = checkWin(newBoard, row, col);

            if (result.winner) { // обработка победы
                state.board = newBoard;
                state.winner = state.currentPlayer;
                state.winningCells = result.cells;
                return;
            }
            if (isBoardFull(newBoard)) { //если все заполнено и нет победителя
                state.board = newBoard;
                state.winner = 'draw'; 
                return;
            }


            state.board = newBoard;
            state.currentPlayer = nextPlayer;
            state.winningCells = result.cells;
        },
        resetGame(state) {
            state.board = (createEmptyBoard(rows, cols))
            state.currentPlayer = 'red'
            state.winner = null
            state.winningCells = []
        }
    }
})

export const { makeMove, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
