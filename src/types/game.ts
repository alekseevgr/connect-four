export type CellValue = null | 'player_1' | 'player_2' //тип ячейки
export type Player = 'player_1' | 'player_2' // тип игрока
export type GameResult = {
    winner: Player | null | 'draw',
    cells: [number, number][]
}
export type GameState = {
    board: CellValue[][],
    currentPlayer: Player,
    winner: Player | null | 'draw',
    winningCells: [number, number][],
    rows: number;
    cols: number;
    cellToWin: number;
}
export type GameMode = 'local' | 'ai' | 'multiplayer';

export type Screen = 'menu' | 'names' | 'game';

export type UIState = {
    gameMode: GameMode | null;
    screen: Screen
    players: {
        red: string,
        blue: string
    }
    errorMessage: string | null;
    gameRules: {
        rows: number,
        cols: number,
        cellToWin: number,
    }
}
export type RulesType = { rows: number; cols: number; cellToWin: number }