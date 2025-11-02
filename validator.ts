import createEmptyBoard from "./src/utils/createBoard.ts";
import checkWin from "./src/utils/checkWinner.ts";
import { isBoardFull } from "./src/utils/isBoardFull.ts";

type GameProcess = 'waiting' | 'pending' | 'win' | 'draw';

type positions = [
    [number, number],
    [number, number],
    [number, number],
    [number, number]
]; // 4 победные фишки игрока (массив длиной 4 с кортежами длины 2)

type Player = 'player_1' | 'player_2';

type Winner = {
    who: Player,
    positions: positions,
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


const validator = (playersMove: number[]): GameHistory => {
    const history: GameHistory = {}
    const board = createEmptyBoard(rows, cols);

    history["step_0"] = {
        player_1: [],
        player_2: [],
        board_state: "waiting",
    };

    for (let stepNumber = 0; stepNumber < playersMove.length; stepNumber += 1) {
        const player: Player = stepNumber % 2 === 0 ? "player_1" : "player_2";
        const column = playersMove[stepNumber];

        let fullRow = -1; //идем в нижнюю достпуную ячейку и ставим там ход
        for (let r = rows - 1; r >= 0; r--) {
            if (board[r][column] === null) {
                board[r][column] = player;
                fullRow = r;
                break;
            }
        }
        if (fullRow === -1) continue;

        const player_1: [number, number][] = [];
        const player_2: [number, number][] = [];

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const cell = board[r][c];
                if (cell === "player_1") player_1.push([r, c]);
                if (cell === "player_2") player_2.push([r, c]);
            }
        }
        const result = checkWin(board, fullRow, column, toWin);
        const isDraw = !result.winner && isBoardFull(board);

        const stepKey = `step_${stepNumber + 1}`;

        history[stepKey] = {
            player_1,
            player_2,
            board_state: result.winner
                ? "win"
                : isDraw
                    ? "draw"
                    : "pending",
            ...(result.winner && result.winner !== 'draw' && {
                winner: {
                    who: result.winner,
                    positions: result.cells.slice(0, 4) as positions,
                },
            }),
        };

        if (result.winner || isDraw) break;

    }

    return history

}


const moves = [1, 2, 1, 2, 3, 2, 3, 2];
console.log(JSON.stringify(validator(moves), null, 2));

export default validator