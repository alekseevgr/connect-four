import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { undo, redo } from '../../store/gameSlice';
import styles from './board.module.css';

export function UndoRedo() {
  const dispatch = useAppDispatch();
  const { prev = [], next = [] } = useAppSelector(state => state.game || {});

  return (
    <div className={styles.undoRedoContainer}>
      <button className={styles.undoRedoButton} onClick={() => dispatch(undo())} disabled={prev.length === 0}>
        Undo
      </button>
      <button className={styles.undoRedoButton} onClick={() => dispatch(redo())} disabled={next.length === 0}>
        Redo
      </button>
    </div>
  );
}

