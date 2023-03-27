import React from 'react'
import { styled } from '@mui/material'

const SummaryInfoCard = () => {
    return (
        <MealsCard>
            <Title>Delicious Food, Delivered To You</Title>
            <p>
                Choose your favorite meal from our broad selection of available
                meals and enjoy a delicious lunch or dinner at home.
            </p>
            <p>
                All our meals are cooked with high-quality ingredients,
                just-in-time and of course by experienced chefs!
            </p>
        </MealsCard>
    )
}

export default SummaryInfoCard

const MealsCard = styled('div')(() => ({
    textAlign: 'center',
    margin: ' -160px auto auto',
    backgroundColor: '#383838',
    borderRadius: '14px',
    position: 'relative',
    boxShadow: '0 0.0625rem 1.125rem 0.625rem rgb(0 0 0 / 25%)',
    width: '854px',
    height: '270px',
    color: ' #fff',
    display: 'grid',
    alignItems: 'center',
    padding: '1rem',
}))

const Title = styled('h1')(() => ({
    fontWeight: '600',
    fontSize: '36px',
    lineHeight: '54px',
}))
