import { Button, Grid } from '@mui/material'
import IconButton from '@mui/material/IconButton/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    deleteMeal,
    getAllMeals,
    updateMeal,
} from '../../store/meals/meals.thunk'
import { AppDispatch, RootState } from '../../store/store'
import { Column, Meal } from '../../common/types'
import AppTable from '../../components/UI/Table'
import MealModal, {
    FormSchema,
} from '../../components/admin/pages/meals/MealModal'
import { useSearchParams } from 'react-router-dom'

const Meals = () => {
    const dispatch = useDispatch<AppDispatch>()

    const meals = useSelector((state: RootState) => state.meals.items)
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        dispatch(getAllMeals())
    }, [dispatch])

    const deleteMealHandler = (id: string) => {
        console.log(id)

        dispatch(deleteMeal(id))
    }

    const editHandler = (id: string) => {
        showModalHandler('edit')
        searchParams.set('mealId', id)
        setSearchParams(searchParams)
    }

    const columns: Column<Meal>[] = [
        {
            header: '№',
            key: '_id',
            index: true,
        },
        {
            header: 'Title',
            key: 'title',
        },
        {
            header: 'Price',
            key: 'price',
        },
        {
            header: 'Description',
            key: 'description',
        },
        {
            header: 'Actions',
            key: 'actions',
            render: (meal: Meal) => (
                <Grid>
                    <IconButton>
                        <EditIcon onClick={() => editHandler(meal._id)} />
                    </IconButton>
                    <IconButton>
                        <DeleteIcon
                            onClick={() => deleteMealHandler(meal._id)}
                        />
                    </IconButton>
                </Grid>
            ),
        },
    ]

    const saveHandler = (id: string, values: FormSchema) => {
        dispatch(updateMeal({ id, values })).then(() => closeModalHandler())
    }

    const showModalHandler = (mode: 'add' | 'edit') => {
        searchParams.set('modal', mode)
        setSearchParams(searchParams)
    }
    const closeModalHandler = () => {
        searchParams.delete('modal')
        setSearchParams(searchParams)
    }

    const isModalOpen = !!searchParams.get('modal')

    return (
        <Grid>
            <Button onClick={() => showModalHandler('add')}>
                Add new meal
            </Button>
            <MealModal
                open={isModalOpen}
                onClose={closeModalHandler}
                onSubmit={saveHandler}
            />
            <Grid>
                <AppTable
                    columns={columns}
                    rows={meals}
                    getUniqueId={(val) => val._id}
                />
            </Grid>
        </Grid>
    )
}

export default Meals
