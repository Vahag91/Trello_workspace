import { configureStore } from "@reduxjs/toolkit"
import userReducer from "userSlice"
import boardReducer from 'boardSlice'
import todoReducer from './todoCardSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        boards: boardReducer,
        todo: todoReducer
    },
})



export type RootState = ReturnType<typeof store.getState>