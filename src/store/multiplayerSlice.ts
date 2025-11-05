import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface MultiplayerState {
  roomId: string | null;
  isConnected: boolean;
  lastMove: number | null;
  isHost: boolean | null;
  peerId: string | null;
}

const initialState: MultiplayerState = {
  roomId: null,
  isConnected: false,
  lastMove: null,
  isHost: null,
  peerId: null,
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
    receiveMove: (state, action: PayloadAction<number>) => {
      state.lastMove = action.payload;
    },
    setIsHost: (state, action: PayloadAction<boolean>) => {
      state.isHost = action.payload;
    },
    setPeerId: (state, action: PayloadAction<string | null>) => {
      state.peerId = action.payload;
    },
  },
});

export const { 
  setRoomId, 
  setConnected, 
  receiveMove, 
  setIsHost, 
  setPeerId } = multiplayerSlice.actions;
export default multiplayerSlice.reducer;