import { AppBar, Button, Grid, Toolbar } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { styled } from '@mui/system'
import { useDispatch } from 'react-redux'
import { signOut } from '../../store/auth/auth.thunk'
import { AppDispatch } from '../../store/store'

const menus = [
    {
        path: 'meals',
        title: 'Meals',
    },
    {
        path: 'orders',
        title: 'Orders',
    },
]

const AdminHeader = () => {
    const dispatch = useDispatch<AppDispatch>()

    const signOutHandler = () => {
        dispatch(signOut())
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Appbar>
                    <StyledGrid>
                        {menus.map((item) => (
                            <StyledNavLink key={item.path} to={item.path}>
                                {item.title}
                            </StyledNavLink>
                        ))}
                    </StyledGrid>
                    <Button color="inherit" onClick={signOutHandler}>
                        SignOut
                    </Button>
                </Appbar>
            </Toolbar>
        </AppBar>
    )
}

export default AdminHeader

const Appbar = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
}))

const StyledGrid = styled(Grid)(() => ({
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
}))

const StyledNavLink = styled(NavLink)(() => ({
    textDecoration: 'none',
    color: '#fff',

    '&:hover': {
        color: '#8a8a8a',
    },

    '&.active': {
        color: '#f00',
    },
}))
