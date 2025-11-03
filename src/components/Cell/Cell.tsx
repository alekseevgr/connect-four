import styles from './cell.module.css'
import cn from 'classnames';

type CellColor = 'player_1' | 'player_2' | null;
type Props = {
    color: CellColor,
    onClick: () => void,
    isWinning: boolean,
    info?: string,
    isHover?: boolean,
    onHover: () => void,
    onLeave: () => void,
    hoverColor?: 'player_1' | 'player_2',
}

export function Cell({ color, onClick, isWinning, info, isHover, onHover, onLeave, hoverColor }: Props) {

    return (
        <button className={cn(styles.cell, {
            [styles.winning]: isWinning,
            [styles.cellRed]: color === 'player_1',
            [styles.cellBlue]: color === 'player_2',
            [styles.hoverRed]: isHover && color === null && hoverColor === 'player_1',
            [styles.hoverBlue]: isHover && color === null && hoverColor === 'player_2',
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