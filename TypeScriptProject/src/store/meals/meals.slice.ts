import { createSlice } from '@reduxjs/toolkit'
import { Meal } from '../../common/types'
import { getAllMeals } from './meals.thunk'

type MealsState = {
    items: Meal[]
}

const initialState: MealsState = {
    items: [],
}

export const MealsSlice = createSlice({
    name: 'meals',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllMeals.fulfilled, (state, { payload }) => {
            state.items = payload
        })
    },
})
