import type { Player, CellValue, WinResult } from "../types/game"



function countDirection(board: CellValue[][], row: number, col: number, x: number, y: number, player: Player): [number, number][] {
  const cells: [number, number][]= []
  for (let move = 1; move < 4; move += 1) {  // идем по всем направлениям добавляя 1 шаг
    const nextRow = row + x * move // смотрим следующую строку
    const nextCol = col + y * move // смотрим следующий столбец
    if (nextRow >= 0 // проверяем на область допустимых значений и сравниваем с цветом игрока
      && nextRow < board.length 
      && nextCol >= 0 
      && nextCol < board[0].length
      && board[nextRow][nextCol] === player
    ) {
      cells.push([nextRow, nextCol])
    } else break;
  }

  return cells
}


export default function checkWin(board: CellValue[][], row: number, col: number): WinResult {
  const player = board[row][col] as Player // нам приходит корретный игрок, null в функцию не передается

  const directions = [
    { x: 0, y: 1 }, // слева направо, с минусом наоборот
    { x: 1, y: 0 }, // сверху вниз
    { x: 1, y: 1 }, // вправо вниз
    { x: 1, y: -1 } // влево вниз
  ];

  for (const { x, y } of directions) {
    const forward = countDirection(board, row, col, x, y, player)
    const back = countDirection(board, row, col, -x, -y, player)
    const allCells: [number, number][] = [[row, col], ...forward, ...back]

    if (allCells.length >= 4) {
      return {winner: player, cells: allCells}
    }
  }

  return {winner: null, cells: []}
}