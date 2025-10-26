import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';


export const useAppDispatch = () => useDispatch<AppDispatch>(); // хук для типизации AppDispatch


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; // хук для типизации RootState
