import axios from 'axios'
import { signOut } from '../store/auth/auth.thunk'
import { store } from '../store/store'

const BASE_ULR =
    'http://ec2-3-122-253-30.eu-central-1.compute.amazonaws.com:5500/api/v1'

export const axiosInstance = axios.create({
    baseURL: BASE_ULR,
})

axiosInstance.interceptors.request.use(
    function (config) {
        config.headers.set('Authorization', store.getState().auth.token)

        return config
    },

    function (error) {
        return error
    }
)

axiosInstance.interceptors.response.use(
    function (config) {
        return config
    },

    function (error) {
        if (error.response.status === 401) {
            store.dispatch(signOut())
        }
        return error
    }
)
