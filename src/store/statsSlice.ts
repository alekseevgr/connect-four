import { createSlice, type PayloadAction } from '@reduxjs/toolkit';


type PlayerStats = {
    name: string,
    countWin: number
}

type StatsState = {
    players: PlayerStats[]
}

const initialState: StatsState ={
    players: []
}

export const statsSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        addWin(state, action: PayloadAction<string>){
            const namePlayer = action.payload.trim()
            if(!namePlayer) return

            const player = state.players.find(
                (n) => n.name.toLowerCase() === namePlayer.toLowerCase()
            )

            if (player){
                player.countWin += 1
            } else{
                state.players.push({name: namePlayer, countWin: 1})
                console.log(state.players)
            }

        },
        resetStats(state){
            state.players = []
        }

    }

})


export const { addWin, resetStats } = statsSlice.actions;
export default statsSlice.reducer;