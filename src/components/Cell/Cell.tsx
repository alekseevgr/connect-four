import styles from './cell.module.css'
import cn from 'classnames';


type Props = {
    color: null | 'red' | 'blue';
    onClick: () => void;
    isWinning: boolean,
}

export function Cell({ color, onClick, isWinning}: Props) {

    return (
        <div className={cn(styles.cell, {
            [styles.winning]: isWinning,
            [styles.red]: color === 'red',
            [styles.blue]: color === 'blue',
        })}
            onClick={onClick}
        >
        </div>
    )
}