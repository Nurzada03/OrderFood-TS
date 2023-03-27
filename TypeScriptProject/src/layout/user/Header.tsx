import { Button, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BasketButton from '../../components/user/BasketButton'
import { signOut } from '../../store/auth/auth.thunk'
import { getBasket } from '../../store/basket/basket.thunk'
import { AppDispatch, RootState } from '../../store/store'

type Props = {
    onShowBasket: () => void
}

const Header = ({ onShowBasket }: Props) => {
    const navigate = useNavigate()
    const isAuthorized = useSelector(
        (state: RootState) => state.auth.isAuthorized
    )

    const items = useSelector((state: RootState) => state.basket.items)
    const [animationClass, setAnimationClass] = useState<string>('')

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(getBasket())
    }, [dispatch])

    const calculateTotalAmount = () => {
        const sum = items.reduce((s, item) => {
            return s + item.amount
        }, 0)
        return sum
    }

    useEffect(() => {
        setAnimationClass('bump')

        const id = setTimeout(() => {
            setAnimationClass('')
        }, 300)

        return () => {
            clearTimeout(id)
        }
    }, [items])

    const signOutHandler = () => {
        dispatch(signOut())
        // navigate('/signin')
    }

    const signInHandler = () => {
        navigate('/signin')
    }

    const showBasketHandler = () => {
        // if (!isAuthorized) {
        //     return showAuthModal(true)
        // }
        return onShowBasket()
    }

    const goToOrderPageHandler = () => {
        // if (!isAuthorized) {
        //     return showAuthModal(true)
        // }
        return navigate('/my-order')
    }

    return (
        <Container>
            <Logo onClick={() => navigate('/')}>ReactMeals</Logo>
            <BasketButton
                className={animationClass}
                onClick={showBasketHandler}
                count={calculateTotalAmount()}
            />

            <Button
                onClick={goToOrderPageHandler}
                color="error"
                variant="contained"
            >
                My Orders
            </Button>

            {isAuthorized ? (
                <Button onClick={signOutHandler}>Sign Out</Button>
            ) : (
                <Button onClick={signInHandler}>Sign In</Button>
            )}
        </Container>
    )
}

export default Header

const Container = styled('header')(({ theme }) => ({
    position: 'fixed',
    top: 0,
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    height: '6.3125rem',
    backgroundColor: '#8A2B06',
    padding: '0 7.5rem',
    alignItems: 'center',
    zIndex: 1,
}))

const Logo = styled('p')(() => ({
    fontWeight: 600,
    fontSize: '2.375rem',
    lineHeight: '3.5625rem',
    color: '#ffffff',
    margin: 0,
}))
