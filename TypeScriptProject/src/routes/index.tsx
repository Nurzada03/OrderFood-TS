import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { UserRoles } from '../common/types'
import ProtectedRoute from './ProtectedRoute'
import UserLayout from '../layout/user'
import AdminLayout from '../layout/admin'
import SignIn from '../pages/guest/SignIn'
import SignUp from '../pages/guest/SignUp'
import Meals from '../pages/admin/Meals.page'
import Order from '../pages/admin/Order.page'
import UserMeals from '../pages/user/Meals.page'
import UserOrders from '../pages/user/Orders.page'

const AppRoutes = () => {
    const role = useSelector((state: RootState) => state.auth.user.role)

    const isAllowed = (roles: UserRoles[]) => {
        return roles.includes(role)
    }

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute
                        isAllowed={isAllowed([UserRoles.GUEST, UserRoles.USER])}
                        fallBackPath="/admin/meals"
                        component={UserLayout}
                    />
                }
            >
                <Route
                    index
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([
                                UserRoles.GUEST,
                                UserRoles.USER,
                            ])}
                            fallBackPath="/admin/meals"
                            component={UserMeals}
                        />
                    }
                />
                <Route
                    path="my-order"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([
                                UserRoles.GUEST,
                                UserRoles.USER,
                            ])}
                            fallBackPath="/admin/meals"
                            component={UserOrders}
                        />
                    }
                />
                <Route
                    path="signup"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([
                                UserRoles.GUEST,
                                UserRoles.USER,
                            ])}
                            fallBackPath={
                                role === UserRoles.ADMIN ? '/admin/meals' : '/'
                            }
                            component={SignUp}
                        />
                    }
                />
                <Route
                    path="signin"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([
                                UserRoles.GUEST,
                                UserRoles.USER,
                            ])}
                            fallBackPath={
                                role === UserRoles.ADMIN ? '/admin/meals' : '/'
                            }
                            component={SignIn}
                        />
                    }
                />
            </Route>

            <Route
                path="/admin"
                element={
                    <ProtectedRoute
                        isAllowed={isAllowed([UserRoles.ADMIN])}
                        fallBackPath="/"
                        component={AdminLayout}
                    />
                }
            >
                <Route
                    path="meals"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([UserRoles.ADMIN])}
                            fallBackPath="/"
                            component={Meals}
                        />
                    }
                />
                <Route
                    path="orders"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([UserRoles.ADMIN])}
                            fallBackPath="/"
                            component={Order}
                        />
                    }
                />
            </Route>
            <Route path="*" element={<p>Not Found</p>} />
        </Routes>
    )
}

export default AppRoutes
