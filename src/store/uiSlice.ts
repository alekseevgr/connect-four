import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { GameMode, UIState, Screen, RulesType } from '../types/game';


const initialState: UIState = {
    gameMode: null, // в приложении будет несколько режимов вначале нужно выбрать режим игры в поле меню
    screen: 'menu',
    players: {
        red: '',
        blue: '',
    },
    errorMessage: null,
    gameRules: {
        rows: 6,
        cols: 7,
        cellToWin: 4,
    }
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setScreen(state, action: PayloadAction<Screen>) {
            state.screen = action.payload;
        },
        setGameMode(state, action: PayloadAction<GameMode>) {
            state.gameMode = action.payload;
        },
        setPlayerName(state, action: PayloadAction<{ color: 'red' | 'blue', name: string }>) {
            state.players[action.payload.color] = action.payload.name
        },
        startGame(state) {
            state.screen = 'game'
        },
        goToMenu(state) {
            state.screen = 'menu';
            state.gameMode = null;
            state.players = { red: '', blue: '' };
        },
        setErrorMessage: (state, action: PayloadAction<string | null>) => {
            state.errorMessage = action.payload;
        },
        setGameRules: (state, action: PayloadAction<RulesType>) => {
            const { rows, cols, cellToWin } = action.payload;
            state.gameRules = { rows, cols, cellToWin };
        },

    },
});

export const { setScreen, setGameMode, setPlayerName, startGame, goToMenu, setErrorMessage, setGameRules } = uiSlice.actions;
export default uiSlice.reducer;
