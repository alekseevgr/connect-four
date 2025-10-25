export type CellValue = null | 'red' | 'blue' //тип ячейки
export type Player = 'red' | 'blue' // тип игрока
export type WinResult = {
    winner: Player | null,
    cells: [number, number][]
}
export type GameState = {
    board: CellValue[][],
    currentPlayer: Player,
    winner: Player | null,
    winningCells: [number, number][]
}