import { BasketData } from '../common/types'
import { axiosInstance } from '../config/axiosInstance'

const getBasket = () => {
    return axiosInstance.get('basket')
}

const addToBasket = (newItem: BasketData) => {
    return axiosInstance.post(`foods/${newItem.id}/addToBasket`, {
        amount: newItem.amount,
    })
}

const updateBasketItem = (id: string, basketAmount: number) => {
    return axiosInstance.put(`basket/${id}/update`, {
        amount: basketAmount,
    })
}

const deleteBasketItem = (id: string) => {
    return axiosInstance.delete(`basket/${id}/delete`)
}

export default { getBasket, addToBasket, updateBasketItem, deleteBasketItem }
