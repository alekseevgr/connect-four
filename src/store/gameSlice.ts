import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { GameResult, GameState, RulesType } from '../types/game';
import checkWin from '../utils/checkWinner';
import { isBoardFull } from '../utils/isBoardFull'
import createEmptyBoard from '../utils/createBoard';

interface GameHistoryState extends GameState {
    prev: GameState[];
    next: GameState[];
} // добавляем для undo redo, новый тип для состояния игры


const initialState: GameHistoryState = {
    board: [],
    currentPlayer: 'player_1',
    winner: null,
    winningCells: [],
    rows: 6,
    cols: 7,
    cellToWin: 4,
    prev: [],
    next: [],
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
            state.currentPlayer = 'player_1';
            state.winner = null;
            state.winningCells = [];
            state.prev = [];
            state.next = [];
        },
        makeMove(state, action: PayloadAction<{ col: number }>) {

            if (state.winner) {
                return
            }
            const { col } = action.payload
            const newBoard = state.board.map(item => [...item]) // копия поля

            const nextPlayer = state.currentPlayer === 'player_1' ? 'player_2' : 'player_1'

            let row = -1;
            for (let r = newBoard.length - 1; r >= 0; r--) {
                if (newBoard[r][col] === null) {
                    row = r;
                    break;
                }
            }
            if (row === -1) return;

            state.prev.push({
                board: state.board.map(r => [...r]),
                currentPlayer: state.currentPlayer,
                winner: state.winner,
                winningCells: [...state.winningCells],
                rows: state.rows,
                cols: state.cols,
                cellToWin: state.cellToWin,
            });  // добавляем предыдущее состояние игры

            state.next = []; // чистим настоящее-будущее

            newBoard[row][col] = state.currentPlayer;

            const result: GameResult = checkWin(newBoard, row, col, state.cellToWin);

            if (result.winner) { // обработка победы
                state.board = newBoard;
                state.winner = state.currentPlayer;
                state.winningCells = result.cells;
                state.currentPlayer = 'player_1'
                return;
            }
            if (isBoardFull(newBoard)) { //если все заполнено и нет победителя
                state.board = newBoard;
                state.winner = 'draw';
                state.winningCells = [];
                state.currentPlayer = 'player_1'
                return;
            }


            state.board = newBoard;
            state.currentPlayer = nextPlayer;
            state.winningCells = result.cells;
        },
        undo(state) {
            if (state.prev.length === 0) {
                return
            }

            state.next.unshift({
                board: state.board.map(r => [...r]),
                currentPlayer: state.currentPlayer,
                winner: state.winner,
                winningCells: [...state.winningCells],
                rows: state.rows,
                cols: state.cols,
                cellToWin: state.cellToWin,
            });

            const previous = state.prev.pop()!;
            state.board = previous.board.map(r => [...r]);
            state.currentPlayer = previous.currentPlayer;
            state.winner = previous.winner;
            state.winningCells = [...previous.winningCells];
        },


        redo(state) {
            if (state.prev.length === 0) {
                return
            }

            state.prev.push({
                board: state.board.map(r => [...r]),
                currentPlayer: state.currentPlayer,
                winner: state.winner,
                winningCells: [...state.winningCells],
                rows: state.rows,
                cols: state.cols,
                cellToWin: state.cellToWin,
            });
            const next = state.next.shift()!;
            state.board = next.board.map(r => [...r]);
            state.currentPlayer = next.currentPlayer;
            state.winner = next.winner;
            state.winningCells = [...next.winningCells];


        },
        resetGame(state) {
            state.board = (createEmptyBoard(state.rows, state.cols))
            state.currentPlayer = 'player_1'
            state.winner = null
            state.winningCells = []
            state.prev = [];
            state.next = [];
        }
    }
})

export const { makeMove, resetGame, initGame, undo, redo } = gameSlice.actions;
export default gameSlice.reducer;
