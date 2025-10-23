import styles from './cell.module.css'

type Props = {
    color: null | 'red' | 'blue';
    onClick: () => void;
}

export function Cell({ color, onClick }: Props) {
let cellClass = styles.cell

    if ( color === 'red'){
        cellClass = ` ${styles['cell--red']}`
    }
    if ( color === 'blue'){
        cellClass = ` ${styles['cell--blue']}`
    }


    return (
        <div className={cellClass}
            onClick={onClick}
            >
        </div>
    )
}