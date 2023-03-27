import { Grid, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Column, Meal, MealType } from '../../common/types'
import AppTable from '../../components/UI/Table'
import { getAllOrder } from '../../store/orders/orders.thunk'
import { AppDispatch, RootState } from '../../store/store'

const Order = () => {
    const dispatch = useDispatch<AppDispatch>()
    const items = useSelector((state: RootState) => state.order.allOrder)
    console.log(items)

    useEffect(() => {
        dispatch(getAllOrder())
    }, [dispatch])

    const columns: Column<MealType>[] = [
        {
            header: '№',
            key: '_id',
            index: true,
        },
        {
            header: 'Author',
            key: 'name',
            render: (meal: MealType) => <Grid>{meal.user.name}</Grid>,
        },

        {
            header: 'Meals',
            key: 'title',
            render: (meal: MealType) => (
                <Grid>
                    {meal.items.map((item) => (
                        <p key={item._id}>{item.title}</p>
                    ))}
                </Grid>
            ),
        },
        {
            header: 'totalPrice',
            key: 'totalPrice',
        },
    ]

    return (
        <div>
            <AppTable
                columns={columns}
                rows={items}
                getUniqueId={(val) => val._id}
            />
        </div>
    )
}

export default Order
