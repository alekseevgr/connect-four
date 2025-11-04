import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type MultiplayerState = {
  roomId: string | null;
  isConnected: boolean;
  playerRole: 'player_1' | 'player_2' | null;
  lastMove: number | null;
  opponentJoined: boolean;
}

const initialState: MultiplayerState = {
  roomId: null,
  isConnected: false,
  lastMove: null,
  playerRole: null,
  opponentJoined: false,
};

const multiplayerSlice = createSlice({
  name: 'multiplayer',
  initialState,
  reducers: {
    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload;
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setPlayerRole: (state, action: PayloadAction<'player_1' | 'player_2'>) => {
      state.playerRole = action.payload;
    },
    receiveMove: (state, action: PayloadAction<number>) => {
      state.lastMove = action.payload;
    },
    setOpponentJoined: (state, action: PayloadAction<boolean>) => {
      state.opponentJoined = action.payload;
    },
    resetMultiplayer: () => initialState,
  },
});

export const {
  setRoomId,
  setConnected,
  setPlayerRole,
  receiveMove,
  setOpponentJoined,
  resetMultiplayer,
} = multiplayerSlice.actions;
export default multiplayerSlice.reducer;