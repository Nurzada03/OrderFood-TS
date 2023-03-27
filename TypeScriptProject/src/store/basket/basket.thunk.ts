import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError, isAxiosError } from 'axios'
import basketService from '../../api/basketService'
import { BasketData } from '../../common/types'

export const getBasket = createAsyncThunk(
    'basket/getBasket',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await basketService.getBasket()
            return data.data.items
        } catch (e) {
            if (isAxiosError(e)) {
                const error = e as AxiosError<{
                    status: number
                    message: string
                }>
                return rejectWithValue(error.response?.data.message)
            }
            return rejectWithValue('Something went wrong')
        }
    }
)

export const addToBasket = createAsyncThunk(
    'basket/addToBasket',
    async (newItem: BasketData, { rejectWithValue, dispatch }) => {
        try {
            await basketService.addToBasket(newItem)
            dispatch(getBasket())
        } catch (e) {
            if (isAxiosError(e)) {
                const error = e as AxiosError<{
                    status: number
                    message: string
                }>
                return rejectWithValue(error.response?.data.message)
            }
            return rejectWithValue('Something went wrong')
        }
    }
)

interface basketData {
    id: string
    amount: number
}

export const updateBasketItem = createAsyncThunk(
    'basket/updateBasket',
    async ({ id, amount }: basketData, { rejectWithValue, dispatch }) => {
        try {
            await basketService.updateBasketItem(id, amount)
            dispatch(getBasket())
        } catch (e) {
            if (isAxiosError(e)) {
                const error = e as AxiosError<{
                    status: number
                    message: string
                }>
                return rejectWithValue(error.response?.data.message)
            }
            return rejectWithValue('Something went wrong')
        }
    }
)

export const deleteBasketItem = createAsyncThunk(
    'basket/deleteBasket',
    async (id: string, { dispatch, rejectWithValue }) => {
        try {
            await basketService.deleteBasketItem(id)
            dispatch(getBasket())
        } catch (e) {
            if (isAxiosError(e)) {
                const error = e as AxiosError<{
                    status: number
                    message: string
                }>
                return rejectWithValue(error.response?.data.message)
            }
            return rejectWithValue('Something went wrong')
        }
    }
)
