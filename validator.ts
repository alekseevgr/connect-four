import createEmptyBoard from "./src/utils/createBoard.ts";
import checkWin from "./src/utils/checkWinner.ts";
import { isBoardFull } from "./src/utils/isBoardFull.ts";

type GameProcess = 'waiting' | 'pending' | 'win' | 'draw';

type Positions = [
    [number, number],
    [number, number],
    [number, number],
    [number, number]
]; // 4 победные фишки игрока (массив длиной 4 с кортежами длины 2)

type Player = 'player_1' | 'player_2';

type Winner = {
    who: Player,
    positions: Positions,
} // инфа о победителе

type Step = {
    player_1: [number, number][],
    player_2: [number, number][],
    board_state: GameProcess,
    winner?: Winner,
}

type GameHistory = Record<string, Step>; // обьект из ключей 'step_0' 'step_1' и значениями в них с типом Step

const rows = 6;
const cols = 7;
const toWin = 4;
// ставим ячейку либо понимаем что все заполнено
function placeCell(board: (Player | null)[][], column: number, player: Player): number {
    for (let r = rows - 1; r >= 0; r--) {
        if (board[r][column] === null) {
            board[r][column] = player;
            return r;
        }
    }
    return -1;
}

// собираем все ходы игроков
function playerPositions(board: (Player | null)[][]) {
    const player_1: [number, number][] = [];
    const player_2: [number, number][] = [];

    for (let r = 0; r < rows; r += 1) {
        for (let c = 0; c < cols; c += 1) {
            const cell = board[r][c];
            if (cell === "player_1") player_1.push([r, c]);
            if (cell === "player_2") player_2.push([r, c]);
        }
    }

    return { player_1, player_2 };
}

// определяем статус игры и победителя
function getBoardState(board: (Player | null)[][], row: number, col: number) {
    const result = checkWin(board, row, col, toWin);
    const draw = !result.winner && isBoardFull(board);

    if (result.winner && result.winner !== 'draw') {
        return {
            state: 'win' as const,
            winner: {
                who: result.winner,
                positions: result.cells.slice(0, 4) as Positions,
            },
        };
    }

    if (draw) return { state: 'draw' as const };
    return { state: 'pending' as const };

}


const validator = (playersMove: number[]): GameHistory => {
    const history: GameHistory = {}
    const board = createEmptyBoard(rows, cols);

    history["step_0"] = {
        player_1: [],
        player_2: [],
        board_state: "waiting",
    };
    if (playersMove.length === 0) return history;

    for (let stepNumber = 0; stepNumber < playersMove.length; stepNumber += 1) {
        const player: Player = stepNumber % 2 === 0 ? "player_1" : "player_2";
        const column = playersMove[stepNumber];

        if (column < 0 || column >= cols) continue;

        const rowPlaced = placeCell(board, column, player);
        if (rowPlaced === -1) continue;


        const { player_1, player_2 } = playerPositions(board);
        const { state, winner } = getBoardState(board, rowPlaced, column);


        const stepKey = `step_${stepNumber + 1}`;

        history[stepKey] = {
            player_1,
            player_2,
            board_state: state,
            ...(winner && { winner }),
        };

        if (state === 'win' || state === 'draw') break;
    }

    return history;
}
const moves = [0, 0, 1, 1, 2, 2, 3];

console.log(validator(moves))
export default validator

