import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useForm } from 'react-hooks-helper'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import SearchPanel from './../components/SearchPanel'
import Dialog from '@mui/material/Dialog'
import { Slide } from '@material-ui/core'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import AddBoxIcon from '@mui/icons-material/AddBox'
import PhoneIcon from '@mui/icons-material/Phone'
import { Modal, Button } from 'bootstrap-4-react'
import { CircularProgress, Divider, TextField } from '@mui/material'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Home() {
    const [filter, setFilter] = React.useState({})
    const [list, setList] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [load, setLoad] = React.useState(true)
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const [cordinates, setCordinates] = React.useState({ distance: { text: '' }, duration: { text: '' }, start_address: '', end_address: '' })
    const [formData, setForm] = useForm({
        search: "",
        name: "",
        email: "",
        phone: ""
    })

    const { search, name, email, phone } = formData
    // window.location.href = '/location?email=m@io.com&phone=872610106&name=SUNiTECH'
    React.useEffect(() => {
        axios.get('/api/getCustomer').then(result => {
            console.log(result);
            setList(result.data.data)
        })
    }, [])

    return (<div>
        <div style={{ marginTop: '20px', marginBottom: '10px' }}>
            <button type="button" class="btn btn-primary" style={{ float: 'left' }} data-toggle="modal" data-target="#exampleModal"
            >Cadastrar cliente <AddBoxIcon /></button>
            <button type="button" class="btn btn-success" style={{ float: 'right' }}
                onClick={() => window.location.href = '/location'}
            >Visualizar MAPA</button>
        </div>
        <hr></hr>
        <div class="input-group mb-3" style={{ marginTop: '50px' }}>
            <input type="text" style={{ width: '230px' }} name="search" value={search} onChange={setForm} class="form-control" placeholder="Pesquisar por: Nome do cliente" aria-label="item name" aria-describedby="button-addon2" />
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" id="button-addon2" style={{ fontSize: '12px' }}
                    onClick={() => {
                        setFilter(formData.search)
                        handleClickOpen()
                    }}
                >Pesquisar <ManageSearchIcon /></button>
            </div>
        </div>
        <p>Lista de clientes</p>

        <div class="row">
            {list.length == 0 ? <span style={{ fontSize: '13px', color: 'silver', marginLeft: '20px' }}>Sem items na lista</span> : list.map(el => (
                <div class="col-md-1-12" style={{ margin: '5px' }}>
                    <div class="card">
                        <div class="card-body">
                            <h3 class="card-title">{el.name}</h3>
                            <p class="card-text" style={{ fontSize: '13px', marginTop: '-15px' }}>Email: {el.email}</p>
                            <p class="card-text"><PhoneIcon style={{ color: 'green' }} /> {el.phone}</p>
                        </div>
                        <Divider />
                        <div style={{ padding: '5px' }}>
                            <button type="button" class="btn btn-info"
                                onClick={() => {
                                    window.location.href = `/location?email=${el.email}&phone=${el.phone}&name=${el.name}`
                                }}
                            >localização</button>
                            <br></br>
                            <button type="button" class="btn btn-success"
                                data-toggle="modal" data-target="#exampleModalB" style={{ marginTop: '5px' }}
                                onClick={() => {

                                    axios.get(`/api/getCustomerFull/${el.email}`).then(result => {
                                        console.log(result);
                                        if (result.data.data.length == 0) { } else {

                                            /*setViewport({
                                                latitude: result.data.data[0].lat,
                                                longitude: result.data.data[0].long,
                                                zoom: 16
                                            })*/

                                            axios.get(`/api/trackRoutes?destin_cords=${result.data.data[0].lat + "+" + result.data.data[0].long}&origin_cords=-16.15397324329642+33.58657057420905`).then(res => {
                                                console.log(res.data.Location[0])
                                                setCordinates(res.data.Location[0])
                                                setTimeout(() => {
                                                    setLoad(false)
                                                }, 500);
                                            })
                                        }
                                    })
                                }}
                            >Ordem</button>
                        </div>
                    </div>
                </div>
            ))}</div>


        <div>

            {/* Modal */}
            <Modal id="exampleModal" fade>
                <Modal.Dialog>
                    <Modal.Content>
                        <Modal.Header>
                            <Modal.Title>Cadastrar cliente</Modal.Title>
                            <Modal.Close>
                                <span aria-hidden="true">&times;</span>
                            </Modal.Close>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <TextField
                                    size="small"
                                    spellCheck={true}
                                    label="Cliente"
                                    name="name"
                                    onChange={setForm}
                                    value={name}
                                    style={{ marginBottom: '10px', width: '320px' }}
                                    placeholder="Denominação"
                                />
                                <TextField
                                    size="small"
                                    type={'email'}
                                    label="Email"
                                    name="email"
                                    onChange={setForm}
                                    value={email}
                                    style={{ marginBottom: '10px', width: '320px' }}
                                    placeholder="Email"
                                />
                                <TextField
                                    size="small"
                                    label="Telefone"
                                    name="phone"
                                    onChange={setForm}
                                    value={phone}
                                    style={{ marginBottom: '10px', width: '320px' }}
                                    placeholder="Telefone"
                                />
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button primary onClick={() => {
                                console.log(formData);
                                const data = {
                                    name: formData.name,
                                    email: formData.email,
                                    phone: formData.phone
                                }

                                const r = Object.keys(data).filter(el => !data[el])
                                if (r.length == 0) {
                                    axios.post('/api/createCustomer', data).then(result => {
                                        alert('Cliente cadastrado com sucesso!')
                                        window.location.href = '/'
                                    })
                                } else {
                                    alert('Preencher campos.')
                                }
                            }}>Cadastrar</Button>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal.Dialog>
            </Modal>

            {/* Modal */}
            <Modal id="exampleModalB" fade>
                <Modal.Dialog>
                    <Modal.Content>
                        <Modal.Header>
                            <Modal.Title>Ordem</Modal.Title>
                            <Modal.Close>
                                <span aria-hidden="true">&times;</span>
                            </Modal.Close>
                        </Modal.Header>
                        <Modal.Body>
                            <h1>CORDINATES:</h1>
                            <hr></hr>
                            {load ? <div>
                                <CircularProgress />
                            </div>: 
                            <div>
                                <span>From: <span style={{ color: 'dodgerblue' }}>{cordinates.start_address}</span> {'=>'} to: <span style={{ color: 'coral' }}>{cordinates.end_address}</span></span>
                                <hr></hr>
                                <span>Distância: <span style={{ color: 'green' }}>{cordinates.distance.text}</span></span><br></br>
                                <span>Duração: <span style={{ color: 'green' }}>{cordinates.duration.text}</span></span> <br></br>
                                <hr></hr>
                                {cordinates.start_address === ""? <span></span>:<button type="button" class="btn btn-success"
                                onClick={() => {
                                    /*
                                    axios.get(`/api/trackRoutes?destin_cords=${cordinates.end_location.lat}+${cordinates.end_location.lng}&origin_cords=${cordinates.start_location.lat}+${cordinates.start_location.lng}`).then(res => {
                                        console.log(res);
                                        
                                    })*/
                                    window.open(`https://www.google.com/maps/dir/?api=1&origin=${cordinates.start_address}&destination=${cordinates.end_address}`,'_blank')
                                }}
                                >Ver rotas no Mapa</button>}
                            </div>}
                        </Modal.Body>
                    </Modal.Content>
                </Modal.Dialog>
            </Modal>
        </div>

        <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                        Pesquisar clientes
                    </Typography>
                </Toolbar>
            </AppBar>
            <div><SearchPanel filter={filter} /></div>
        </Dialog>
    </div>);
}

//window.location.href = '/location?email=m@io.com&phone=872610106&name=SUNiTECH'

export default Home