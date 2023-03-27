import { Meal } from '../common/types'
import { FormSchema } from '../components/admin/pages/meals/MealModal'
import { axiosInstance } from '../config/axiosInstance'

type AllMealsResponse = {
    data: Meal[]
}

type MealResponse = {
    data: Meal
}

const getAllMeals = () => {
    return axiosInstance.get<AllMealsResponse>('foods')
}

const getMealById = (id: string) => {
    return axiosInstance.get<MealResponse>(`foods/${id}`)
}

const addMeal = (data: FormSchema) => {
    return axiosInstance.post('foods', data)
}

const removeMeal = (id: string) => {
    return axiosInstance.delete(`foods/${id}`)
}

const updateMeal = (id: string, values: FormSchema) => {
    return axiosInstance.put(`foods/${id}`, values)
}

export default { getAllMeals, removeMeal, getMealById, addMeal, updateMeal }
