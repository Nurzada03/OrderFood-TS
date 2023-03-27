import { SigninUser, SignUpUser, UserRoles } from '../common/types'
import { axiosInstance } from '../config/axiosInstance'

type SignInResponse = {
    data: {
        token: string
        user: {
            role: UserRoles
            email: string
            name: string
        }
    }
}

export const signInRequest = (values: SigninUser) => {
    return axiosInstance.post<SignInResponse>('auth/login', values)
}

export const signUpRequest = (values: SignUpUser) => {
    return axiosInstance.post<SignInResponse>('auth/register', values)
}
