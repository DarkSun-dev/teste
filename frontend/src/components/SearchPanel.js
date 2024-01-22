import * as React from 'react'
import PageviewIcon from '@mui/icons-material/Pageview'
import axios from 'axios'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

import { useEffect, useState } from 'react'


const label = { inputProps: { 'aria-label': 'Color switch demo' } };

const SearchPanel = ({ filter }) => {
    const [open, setOpen] = useState(false)
    const [item, setItem] = useState([])

    React.useEffect(() => {
      if(filter === ''){}else{
        axios.get(`api/getCustomerByName/${filter}`).then(result => {
            setItem(result.data.data)
        })
      }
    }, [])


    return (
        <div class="container mt-5 mb-5">
            {filter === '' ? "No query" : <div class="alert alert-info">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                <strong style={{ fontSize: '13px' }}><PageviewIcon style={{ marginLeft: '-8px', marginRight: '10px' }} /> </strong> {filter}
            </div>}
            <hr></hr>

            <Box sx={{ flexGrow: 1 }} style={{ padding: '20px' }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {item.length == 0 ? <span></span>: item.map(el => (<Grid item xs={2} sm={4} md={4}>
                    <Card sx={{ width: 300 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Telefone: {el.phone}
                            </Typography>
                            <Typography variant="h5" component="div">
                                Cliente: {el.name}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                email: {el.email}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>))}
            </Grid>
        </Box>

        </div>
    )
}

export default SearchPanel


