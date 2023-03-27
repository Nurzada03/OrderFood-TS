import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError, isAxiosError } from 'axios'
import { signInRequest, signUpRequest } from '../../api/authService'
import { STORAGE_KEYS } from '../../common/constants'
import { SigninUser, SignUpUser } from '../../common/types'

export const signOut = createAsyncThunk('auth/signOut', async () => {
    return localStorage.removeItem(STORAGE_KEYS.AUTH)
})

export const signIn = createAsyncThunk(
    'auth/signin',
    async (values: SigninUser, { rejectWithValue }) => {
        try {
            const { data } = await signInRequest(values)
            localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(data.data))
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

export const signUp = createAsyncThunk(
    'auth/signUp',
    async (values: SignUpUser, { rejectWithValue }) => {
        try {
            const { data } = await signUpRequest(values)
            localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(data.data))
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
