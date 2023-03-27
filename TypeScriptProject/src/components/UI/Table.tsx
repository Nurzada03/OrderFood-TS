import React from 'react'
import {
    Paper,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Table,
    TablePagination,
} from '@mui/material'
import { Column } from '../../common/types'
import useClineSidePagination from '../../hooks/useClineSidePagination'

type Props<T> = {
    columns: Column<T>[]
    rows: T[]
    getUniqueId: (val: T) => string
}

const AppTable = <T,>({ columns, rows, getUniqueId }: Props<T>) => {
    const {
        page,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        paginate,
    } = useClineSidePagination()

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.key}
                                    align={column.align || 'left'}
                                    style={
                                        column.minWidth
                                            ? {
                                                  minWidth: column.minWidth,
                                              }
                                            : {}
                                    }
                                >
                                    {column.header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginate(rows).map((row, rowIndex) => {
                            return (
                                <TableRow
                                    hover
                                    // role="checkbox"
                                    tabIndex={-1}
                                    key={getUniqueId(row)}
                                >
                                    {columns.map((column) => {
                                        if (column.render) {
                                            return (
                                                <TableCell key={column.key}>
                                                    {column.render(row)}
                                                </TableCell>
                                            )
                                        }

                                        const value = column.index
                                            ? rowIndex + 1
                                            : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                              //@ts-ignore
                                              row[column.key]
                                        return (
                                            <TableCell
                                                key={column.key}
                                                align={column.align}
                                            >
                                                {value}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[2, 4]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e, newPage) => handleChangePage(newPage)}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export default AppTable
