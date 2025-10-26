export type CellValue = null | 'red' | 'blue' //тип ячейки
export type Player = 'red' | 'blue' // тип игрока
export type WinResult = {
    winner: Player | null,
    cells: [number, number][]
}
export type GameState = {
    board: CellValue[][],
    currentPlayer: Player,
    winner: Player | null | 'draw',
    winningCells: [number, number][]
}
export type GameMode = 'menu' | 'local' | 'ai' | 'multiplayer';

export type Screen = 'menu' | 'names' | 'game';

export type UIState = {
    gameMode: GameMode | null;
    screen: Screen
    players: {
        red: string,
        blue: string
    }
}
