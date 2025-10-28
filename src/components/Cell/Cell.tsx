import styles from './cell.module.css'
import cn from 'classnames';


type Props = {
    color: null | 'red' | 'blue',
    onClick: () => void,
    isWinning: boolean,
    info?: string,
    isHover?: boolean,
    onHover: () => void,
    onLeave: () => void,
    hoverColor?: 'red' | 'blue'
}

export function Cell({ color, onClick, isWinning, info, isHover, onHover, onLeave, hoverColor }: Props) {

    return (
        <button className={cn(styles.cell, {
            [styles.winning]: isWinning,
            [styles.red]: color === 'red',
            [styles.blue]: color === 'blue',
            [styles.hovered]: isHover && color === null,
            [styles.hoverRed]: isHover && color === null && hoverColor === 'red',
            [styles.hoverBlue]: isHover && color === null && hoverColor === 'blue',
        })}
            type="button"
            onClick={onClick}
            aria-label={color ? `Фишка ${color}` : 'Пустая ячейка'}
            title={info}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}


        >
        </button>
    )
}