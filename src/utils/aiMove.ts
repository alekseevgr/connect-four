import type { CellValue } from "../types/game";

const getMoves = (board: CellValue[][]): number[] => {
    const allMoves = board[0].map((_, i) => (board[0][i] === null ? i : null)) // выбираем все столбцы и маркируем можно кликнуть(null) или нет
    const moves = allMoves.filter((i) => i !== null); // выбираем где можно кликнуть

    return moves
};

const aiMove = (board: CellValue[][]): number | null => {
    const moves = getMoves(board);
    if (moves.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
};

export default aiMove
