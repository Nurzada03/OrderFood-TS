import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError, isAxiosError } from 'axios'
import mealService from '../../api/mealService'
import { UpdateData } from '../../common/types'
import { FormSchema } from '../../components/admin/pages/meals/MealModal'

export const getAllMeals = createAsyncThunk(
    'meal/getAll',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await mealService.getAllMeals()
            return data.data
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

export const addMeal = createAsyncThunk(
    'meal/addMeal',
    async (data: FormSchema, { rejectWithValue, dispatch }) => {
        try {
            await mealService.addMeal(data)
            return dispatch(getAllMeals())
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

export const deleteMeal = createAsyncThunk(
    'meal/deleteMeal',
    async (id: string, { dispatch, rejectWithValue }) => {
        try {
            await mealService.removeMeal(id)
            return dispatch(getAllMeals())
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

export const updateMeal = createAsyncThunk(
    'meal/updateMeal',
    async ({ id, values }: UpdateData, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await mealService.updateMeal(id, values)
            dispatch(getAllMeals())
            return data.data
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
