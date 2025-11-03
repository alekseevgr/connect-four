import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { undo, redo } from '../../store/gameSlice';
import styles from './board.module.css';

export function UndoRedo() {
  const dispatch = useAppDispatch();
  const { prev = [], next = [], winner } = useAppSelector(state => state.game || {});

  const isGameOver = !!winner; 

  return (
    <div className={styles.undoRedoContainer}>
      <button className={styles.undoRedoButton} onClick={() => dispatch(undo())} disabled={prev.length === 0 || isGameOver}>
        Отменить ход
      </button>
      <button className={styles.undoRedoButton} onClick={() => dispatch(redo())} disabled={next.length === 0 || isGameOver}>
        Ход вперед
      </button>
    </div>
  );
}

