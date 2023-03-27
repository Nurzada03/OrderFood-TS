import React from 'react'
import { Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'
import AdminHeader from './Header'

const AdminLayout = () => {
    return (
        <>
            <AdminHeader />
            <Grid>
                <Outlet />
            </Grid>
        </>
    )
}

export default AdminLayout
