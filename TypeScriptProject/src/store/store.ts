import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/auth.slice'
import { basketSlice } from './basket/basket.slice'
import { MealsSlice } from './meals/meals.slice'
import { OrdersSlice } from './orders/orders.slice'

export const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [MealsSlice.name]: MealsSlice.reducer,
        [OrdersSlice.name]: OrdersSlice.reducer,
        [basketSlice.name]: basketSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
