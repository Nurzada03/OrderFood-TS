import { Grid, TextField, Typography } from '@mui/material'
import { styled } from '@mui/system'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Button from '@mui/material/Button'
import { signUp } from '../../store/auth/auth.thunk'
import { AppDispatch } from '../../store/store'
import { UserRoles } from '../../common/types'

const SignUp = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [signupError, setSignupError] = useState()

    const schema = z
        .object({
            name: z.string().nonempty(),
            email: z.string().email(),
            password: z.string().min(4),
            confirm: z.string(),
            role: z.string(),
        })
        .refine((data) => data.password === data.confirm, {
            message: "Passwords don't match",
            path: ['confirm'],
        })

    type FormSchema = (typeof schema)['_output']

    const { handleSubmit, formState, register } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirm: '',
            role: UserRoles.ADMIN,
        },
        mode: 'onBlur',
        resolver: zodResolver(schema),
    })

    const submitHandler = (values: FormSchema) => {
        dispatch(signUp(values))
            .unwrap()
            .then(() => navigate('/'))
            .catch((e) => setSignupError(e.response.data.message))
    }

    return (
        <MainGrid>
            <GridContainer>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <FormGrid>
                        <TextField
                            error={!!formState.errors.name}
                            {...register('name')}
                            label="Name"
                        />
                        {formState.errors.name && (
                            <Error>{formState.errors.name.message}</Error>
                        )}
                        <TextField
                            error={!!formState.errors.email}
                            {...register('email')}
                            label="Email"
                        />
                        {formState.errors.name && (
                            <Error>{formState.errors.email?.message}</Error>
                        )}
                        <TextField
                            error={!!formState.errors.password}
                            {...register('password')}
                            label="Password"
                        />
                        {formState.errors.email && (
                            <Error>{formState.errors.password?.message}</Error>
                        )}
                        <TextField
                            error={!!formState.errors.confirm}
                            {...register('confirm')}
                            label="Confirm Password"
                        />
                        {formState.errors.email && (
                            <Error>{formState.errors.confirm?.message}</Error>
                        )}
                        <Button type="submit">Sign up</Button>
                        <Link to="/signin">Have an account</Link>
                    </FormGrid>
                </form>
            </GridContainer>
        </MainGrid>
    )
}

export default SignUp

const MainGrid = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '200px',
}))

const GridContainer = styled(Grid)(() => ({
    background: '#fff',
    width: '500px',
    padding: '20px',
}))

const FormGrid = styled(Grid)(() => ({
    display: 'grid',
    gap: '20px',
}))

const Error = styled(Typography)(() => ({
    color: '#f00',
}))
