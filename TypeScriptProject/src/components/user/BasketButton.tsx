import React from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Button, styled, ButtonProps } from '@mui/material'

type Props = ButtonProps & {
    count: number
}

const BasketButton = ({ count, ...props }: Props) => (
    <StyledMuiButton {...props}>
        <ShoppingCartIcon />
        <StyledTitle>You Cart</StyledTitle>
        <StyledCounter id="counter">{count}</StyledCounter>
    </StyledMuiButton>
)

export default BasketButton

const StyledMuiButton = styled(Button)(() => ({
    background: '#5A1F08',
    color: '#fff',
    borderRadius: '1.25rem',
    padding: ' 0.75rem 2rem',
    fontWeight: '600',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',

    '&:hover': {
        backgroundColor: '#4f1b07',
    },

    '&:hover > #counter': {
        background: '#431b0c',
    },

    '&.bump': {
        animation: 'bump 300ms ease-out',
    },

    '@keyframes bump': {
        '0%': {
            transform: 'scale(1)',
        },
        '10% ': {
            transform: 'scale(0.9)',
        },
        '30%': {
            transform: 'scale(1.1)',
        },
        '50%': {
            transform: 'scale(1.15)',
        },
        '100%': {
            transform: 'scale(1)',
        },
    },
}))

const StyledTitle = styled('span')(() => ({
    margin: '0 1.5rem 0 0.75rem',
}))

const StyledCounter = styled('span')(() => ({
    background: '#722608',
    borderRadius: '1.875rem',
    color: '#fff',
    fontWeight: 700,
    fontSize: '1.25rem',
    lineHeight: '1.6875rem',
    padding: '0.25rem 1.25rem',
}))
