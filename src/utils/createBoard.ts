import type { CellValue } from "../types/game";

export default function createEmptyBoard (rows:number, cols:number):CellValue[][]{
    return Array.from({ length: rows }, () => Array(cols).fill(null))
}