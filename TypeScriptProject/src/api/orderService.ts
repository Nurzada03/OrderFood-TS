import { MealType } from '../common/types'
import { axiosInstance } from '../config/axiosInstance'

type AllOrdersResponse = {
    data: MealType[]
}

const getAllOrder = () => {
    return axiosInstance.get<AllOrdersResponse>('orders/all')
}

const getOrder = () => {
    return axiosInstance.get<AllOrdersResponse>('orders')
}

const postOrder = (totalPrice: { totalPrice: number }) => {
    return axiosInstance.post('orders', totalPrice)
}

export default { getAllOrder, getOrder, postOrder }
