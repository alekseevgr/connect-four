import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { GameResult, GameState, RulesType } from '../types/game';
import checkWin from '../utils/checkWinner';
import { isBoardFull } from '../utils/isBoardFull'
import createEmptyBoard from '../utils/createBoard';

const initialState: GameState = {
    board: [],
    currentPlayer: 'red',
    winner: null,
    winningCells: [],
    rows: 6,
    cols: 7,
    cellToWin: 4,
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        initGame(state, action: PayloadAction<RulesType>) {
            const { rows, cols, cellToWin } = action.payload;
            state.rows = rows;
            state.cols = cols;
            state.cellToWin = cellToWin;
            state.board = createEmptyBoard(rows, cols);
            state.currentPlayer = 'red';
            state.winner = null;
            state.winningCells = [];
        },
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

            const result: GameResult = checkWin(newBoard, row, col, state.cellToWin);

            if (result.winner) { // обработка победы
                state.board = newBoard;
                state.winner = state.currentPlayer;
                state.winningCells = result.cells;
                state.currentPlayer = 'red'
                return;
            }
            if (isBoardFull(newBoard)) { //если все заполнено и нет победителя
                state.board = newBoard;
                state.winner = 'draw';
                state.winningCells = [];
                state.currentPlayer = 'red'
                return;
            }


            state.board = newBoard;
            state.currentPlayer = nextPlayer;
            state.winningCells = result.cells;
        },
        resetGame(state) {
            state.board = (createEmptyBoard(state.rows, state.cols))
            state.currentPlayer = 'red'
            state.winner = null
            state.winningCells = []
        }
    }
})

export const { makeMove, resetGame, initGame} = gameSlice.actions;
export default gameSlice.reducer;
