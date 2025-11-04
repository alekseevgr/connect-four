import { configureStore, combineReducers} from '@reduxjs/toolkit'
import gameReducer from './gameSlice'
import uiReducer from './uiSlice'
import statsReducer from './statsSlice'
import storage from 'redux-persist/lib/storage'
import multiplayerReducer from './multiplayerSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const rootReducer = combineReducers({
  game: gameReducer,
  ui: uiReducer,
  stats: statsReducer,
  multiplayer: multiplayerReducer,
})


const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)



const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
