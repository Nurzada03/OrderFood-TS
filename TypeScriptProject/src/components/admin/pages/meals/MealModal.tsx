import React, { useEffect } from 'react'
import { Modal, Grid, TextField, Button, Box, styled } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'
import { useSearchParams } from 'react-router-dom'
import mealService from '../../../../api/mealService'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../../../store/store'
import { addMeal } from '../../../../store/meals/meals.thunk'

const schema = zod.object({
    title: zod.string().nonempty(),
    description: zod.string().nonempty(),
    price: zod.number().min(2),
})

type Props = {
    open: boolean
    onClose: () => void
    onSubmit: (id: string, values: FormSchema) => void
}

const StyledBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
}

export type FormSchema = (typeof schema)['_output']

const MealModal = ({ open, onClose, onSubmit }: Props) => {
    const dispatch = useDispatch<AppDispatch>()

    const [searchParams, setSearchParams] = useSearchParams()

    const { register, handleSubmit, formState, reset } = useForm({
        defaultValues: {
            price: 1,
            title: '',
            description: '',
        },

        mode: 'onBlur',
        resolver: zodResolver(schema),
    })

    const id = searchParams.get('mealId') || '1'

    const submitHandler = (values: FormSchema) => {
        open && searchParams.get('modal') === 'edit'
            ? onSubmit(id, values)
            : dispatch(addMeal(values)).then(() => onClose())
    }

    useEffect(() => {
        const mealId = searchParams.get('mealId')
        if (open && searchParams.get('modal') === 'edit' && mealId) {
            mealService.getMealById(mealId).then(({ data }) => {
                reset(data.data)
            })
        }
    }, [open])

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={StyledBox}>
                <Grid>
                    <StyledForm onSubmit={handleSubmit(submitHandler)}>
                        <TextField
                            {...register('title')}
                            label="Title"
                            error={!!formState.errors.title}
                        />
                        <TextField
                            {...register('description')}
                            label="Description"
                            error={!!formState.errors.description}
                        />
                        <TextField
                            type="number"
                            {...register('price', { valueAsNumber: true })}
                            label="Price"
                            error={!!formState.errors.price}
                        />
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                        >
                            Save
                        </Button>
                    </StyledForm>
                </Grid>
            </Box>
        </Modal>
    )
}

export default MealModal

const StyledForm = styled('form')(() => ({
    display: 'grid',
    gap: 15,
}))
