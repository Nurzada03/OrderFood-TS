import { Grid } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Basket from '../../components/user/basket/Basket'
import Header from './Header'

const UserLayout = () => {
    const [isBasketVisible, setBasketVisible] = useState(false)

    const showBasketHandler = useCallback(() => {
        setBasketVisible((prevState) => !prevState)
    }, [])

    return (
        <>
            <Header onShowBasket={showBasketHandler} />

            <Basket open={isBasketVisible} onClose={showBasketHandler} />
            <Grid>
                <Outlet />
            </Grid>
        </>
    )
}

export default UserLayout
