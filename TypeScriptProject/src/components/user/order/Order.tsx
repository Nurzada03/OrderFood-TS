/* eslint-disable no-underscore-dangle */
import { styled } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrder } from '../../../store/orders/orders.thunk'
import { AppDispatch, RootState } from '../../../store/store'

const Order = () => {
    const dispatch = useDispatch<AppDispatch>()
    const items = useSelector((state: RootState) => state.order.order)

    // console.log(items)

    useEffect(() => {
        dispatch(getOrder())
    }, [dispatch])

    return (
        <Container>
            {items.map((item) => (
                <div
                    key={item._id}
                    style={{ background: '#fff', color: '#222' }}
                >
                    <h4>create {item.createdAt}</h4>
                    {item.items.map((meal) => (
                        <MealContainer key={meal._id}>
                            <p>{meal.title}</p>
                            <p>${meal.price}</p>
                            <span>x{meal.amount}</span>
                        </MealContainer>
                    ))}
                </div>
            ))}
        </Container>
    )
}

export default Order

const Container = styled('div')(({ theme }) => ({
    display: 'grid',
    gap: '50px',
    color: '#fff',
    width: '50%',
    margin: '190px auto',
}))

const MealContainer = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottom: '1px solid #222',
    padding: '20px',
}))
