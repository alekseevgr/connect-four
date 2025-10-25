import type { Player, CellValue } from "../types/game"


function countDirection(board: CellValue[][], row: number, col: number, x: number, y: number, player: Player): number {
  let count = 0
  for (let move = 1; move < 4; move += 1) {  // идем по всем направлениям добавляя 1 шаг
    const nextRow = row + x * move // смотрим следующую строку
    const nextCol = col + y * move // смотрим следующий столбец
    if (nextRow >= 0 && nextRow < board.length && // проверяем на область допустимых значений и сравниваем с цветом игрока
      nextCol >= 0 && nextCol < board[0].length
      && board[nextRow][nextCol] === player
    ) {
      count += 1
    } else break;
  }

  return count
}


export default function checkWin(board: CellValue[][], row: number, col: number): boolean {
  const player = board[row][col] as Player // нам приходит корретный игрок, null в функцию не передается

  if (!player) {
    return false
  }

  const directions = [
    { name: 'horizontal', x: 0, y: 1 }, // слева направо, с минусом наоборот
    { name: 'vertical', x: 1, y: 0 }, // сверху вниз
    { name: 'diagonal-down-right', x: 1, y: 1 }, // вправо вниз
    { name: 'diagonal-down-left', x: 1, y: -1 } // влево вниз
  ];

  for (const { x, y } of directions) {
    const totalCount = 1 + countDirection(board, row, col, x, y, player) + countDirection(board, row, col, -x, -y, player)

    if (totalCount >= 4) {
      return true
    }
  }

  return false;
}