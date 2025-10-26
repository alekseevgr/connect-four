import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { makeMove, resetGame } from '../../store/gameSlice';
import { Cell } from '../Cell/Cell';
import styles from './board.module.css';
import { goToMenu } from '../../store/uiSlice';


export function Board() {

    const dispatch = useAppDispatch();
    const { red, blue } = useAppSelector((state) => state.ui.players);
    const { board, currentPlayer, winner, winningCells } = useAppSelector((state) => state.game);


    const currentName = currentPlayer === 'red' ? red : blue
    const winnerName = winner === 'red' ? red : blue


    const text = (
        <h2>
            Ходит игрок{' '}
            <span className={currentPlayer === 'red' ? styles.red : styles.blue}>
                {currentName}
            </span>
        </h2>
    );

    const winnerText = (
        <h2>
            Победил{' '}
            <span className={winner === 'red' ? styles.red : styles.blue}>
                {winnerName}
            </span>
        </h2>
    );
    const isDraw = winner === 'draw';

    const drawText = <h2>Ничья </h2>;

    const handleColumnClick = (cellIndex: number) => {
        if (winner) return;

        for (let row = board.length - 1; row >= 0; row--) {
            if (board[row][cellIndex] === null) {
                dispatch(makeMove({ col: cellIndex }));
                return;
            }
        }

    };




    return (
        <div className={styles.boardWrapper}>
            <h1 className={styles.title}> Очень увлекательная игра</h1>
            {isDraw ? drawText : winner ? winnerText : text}

            <div className={styles.board}>
                {board.map((row, rowIndex) =>
                    row.map((cell, cellIndex) => (
                        <Cell
                            key={`${rowIndex}-${cellIndex}`}
                            color={cell}
                            isWinning={winningCells.some(([r, c]) => r === rowIndex && c === cellIndex)}
                            onClick={() => handleColumnClick(cellIndex)}
                        />
                    )))}
            </div>
            <button className={styles.resetButton} onClick={() => dispatch(resetGame())}>
                Начать заново
            </button>
            <button className={styles.resetButton} onClick={() => {
                dispatch(resetGame());
                dispatch(goToMenu());
            }}>
                В меню
            </button>
        </div>


    )

}