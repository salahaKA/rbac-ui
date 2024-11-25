import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

function RoleManagement() {
  return (
    <Box>
        <Typography variant='h4' gutterBottom>
            Role Management
        </Typography>
        <Button variant='contained' color='primary' sx={{mb:2}}>
            Add Role
        </Button>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Role Name</TableCell>
                    <TableCell>Permissions</TableCell>
                    <TableCell>Actions</TableCell>                  
                </TableRow>
            </TableHead>
            <TableBody>
                {/* Map through role data here */}
                <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>Administrator</TableCell>
                    <TableCell>Read, Write, Delete</TableCell>
                    <TableCell>
                        <Button variant='contained' color='secondary' size='small' sx={{mr:1}}>
                            Edit
                        </Button>
                        <Button variant='contained' color='error' size='small' >
                            Delete
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </Box>
  )
}

export default RoleManagement