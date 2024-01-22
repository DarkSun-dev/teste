import ReactMapGL, { Marker, Popup } from "react-map-gl"
import { useEffect, useState } from "react"
import { Room, Star, StarBorder } from "@material-ui/icons"
import axios from "axios";
import { useLocation } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';

function Location() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [pins, setPins] = useState([]);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);
    const [newPlace, setNewPlace] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [description, setDescription] = useState(null);
    const [bar, setBar] = useState(null);
    const [viewport, setViewport] = useState({
        latitude: -16.153891,
        longitude: 33.586330,
        zoom: 16,
    })


    const queryA = searchParams.get('email')
    const queryB = searchParams.get('phone')
    const queryC = searchParams.get('name')

    useEffect(() => {
        if (queryA === null) { } else {
            axios.get(`/api/getCustomerFull/${queryA}`).then(result => {
                console.log(result);
                if (result.data.data.length == 0) { setBar(true) } else {
                    setViewport({
                        latitude: result.data.data[0].lat,
                        longitude: result.data.data[0].long,
                        zoom: 16
                    })
                }
            })
        }
    }, [])


    const handleMarkerClick = (id, lat, long) => {
        setCurrentPlaceId(id);
        setViewport({ ...viewport, latitude: lat, longitude: long });
    };

    const handleAddClick = (e) => {
        const [longitude, latitude] = e.lngLat;
        setNewPlace({
            lat: latitude,
            long: longitude,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPin = {
            email: email,
            customer: customer,
            description: description,
            rating: 3,
            long: newPlace.long,
            lat: newPlace.lat,
            title: phone
        }
        console.log(newPin);
        const r = Object.keys(newPin).filter(el => !newPin[el])
        if (r.length == 0) {
            try {
                const res = await axios.post("/api/createCordinate", newPin);
                console.log(res);
                setPins([...pins, res.data.data[0]]);
                setNewPlace(null);
            } catch (err) {
                console.log(err);
            }
        } else {
            alert('Prenhcer campos!')
        }
    }



    const handleSubmitB = async (e) => {
        e.preventDefault();
        const newPin = {
            email: queryA,
            customer: queryC,
            description: description,
            rating: 3,
            long: newPlace.long,
            lat: newPlace.lat,
            title: queryB
        }
        console.log(newPin);
        const r = Object.keys(newPin).filter(el => !newPin[el])
        if (r.length == 0) {
            try {
                const res = await axios.post("/api/createOneCordinate", newPin);
                console.log(res);
                setPins([...pins, res.data.data[0]]);
                setNewPlace(null);
                window.location.href = '/location'
            } catch (err) {
                console.log(err);
            }
        } else {
            alert('Prenhcer campos!')
        }
    }

    useEffect(() => {
        const getPins = async () => {
            try {
                const allPins = await axios.get("/api/getCordinate");
                console.log(allPins.data.data);
                setPins(allPins.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        getPins();
    }, []);


    return (
        <div style={{ height: "100vh", width: "100%", position: 'absolute', left: 0, right: 0, margin: 0 }}>
           
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
                width="100%"
                height="100%"
                transitionDuration="200"
                mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
                onViewportChange={(viewport) => setViewport(viewport)}
                onDblClick={handleAddClick}
            >
                {pins.map((p) => (
                    <>
                        <Marker
                            latitude={p.lat}
                            longitude={p.long}
                            offsetLeft={-3.5 * viewport.zoom}
                            offsetTop={-7 * viewport.zoom}
                        >
                            <Room
                                style={{
                                    fontSize: 7 * viewport.zoom,
                                    color: "green",
                                    // currentUsername === p.username ? "tomato" : "slateblue",
                                    cursor: "pointer",
                                }}
                                onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
                            />
                        </Marker>
                        {p._id === currentPlaceId && (
                            <Popup
                                key={p._id}
                                latitude={p.lat}
                                longitude={p.long}
                                closeButton={true}
                                closeOnClick={false}
                                onClose={() => setCurrentPlaceId(null)}
                                anchor="left"
                            >
                                <div>
                                    <label>Cliente</label>
                                    <h4 className="place">{p.customer}</h4>
                                    <hr></hr>
                                    <label>Descrição:</label>
                                    <p className="desc">{p.description}</p>
                                    <hr></hr>
                                    <label>Contacto: <span>{p.title}</span></label>/
                                    <span className="username">
                                        email: <b>{p.email}</b>
                                    </span>

                                </div>
                            </Popup>
                        )}
                    </>
                ))}

                <div>
                    {newPlace && (
                        <>
                            <Marker
                                latitude={newPlace.lat}
                                longitude={newPlace.long}
                                offsetLeft={-3.5 * viewport.zoom}
                                offsetTop={-7 * viewport.zoom}
                            >
                                <Room
                                    style={{
                                        fontSize: 7 * viewport.zoom,
                                        color: "tomato",
                                        cursor: "pointer",
                                    }}
                                />
                            </Marker>
                            <Popup
                                latitude={newPlace.lat}
                                longitude={newPlace.long}
                                closeButton={true}
                                closeOnClick={false}
                                onClose={() => setNewPlace(null)}
                                anchor="left"
                            >
                                <div>
                                    <span style={{ color: 'green' }}>{queryA === null || queryB === null ? 'Cadastrar cliente' : 'Adicionar localização'}</span>
                                    <br></br> <br></br>
                                    {queryA === null || queryB === null ? <form>
                                        <input
                                            placeholder="Denominação do cliente"
                                            autoFocus
                                            onChange={(e) => setCustomer(e.target.value)}
                                        /> <br></br> <br></br>
                                        <input
                                            placeholder="Email"
                                            autoFocus
                                            onChange={(e) => setEmail(e.target.value)}
                                        /><br></br> <br></br>
                                        <input
                                            placeholder="Telefone"
                                            autoFocus
                                            onChange={(e) => setPhone(e.target.value)}
                                        /> <br></br> <br></br>
                                        <input
                                            placeholder="Descrição"
                                            autoFocus
                                            onChange={(e) => setDescription(e.target.value)}
                                        /> <br></br> <br></br>
                                        <button type="button" class="btn btn-primary"
                                            onClick={handleSubmit}
                                        >Adicionar</button>
                                    </form> :
                                        <form>
                                            {queryC} <br></br><br></br>
                                            <input
                                                placeholder="Descrição do cliente"
                                                autoFocus
                                                onChange={(e) => setDescription(e.target.value)}
                                            /> <br></br> <br></br>
                                            <button type="button" class="btn btn-primary"
                                                onClick={handleSubmitB}
                                            >Adicionar</button>
                                        </form>}
                                </div>
                            </Popup>
                        </>)}

                        
                        
                        {bar ?<div class="alert alert-info buttons" style={{ position: 'absolute', top: '10px', width: '100%', left: '20px' }}> <span><span style={{color: 'green', fontSize: '13px'}}>Adicionar localização para cliente:</span> <strong>{queryC}</strong></span> </div> : ''}
                       

             

                    <div className="buttons" style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        <button type="button" class="btn btn-info" onClick={() => window.location.href = '/'}>Home <HomeIcon /></button>
                    </div>
                </div>
            </ReactMapGL>
        </div>
    )
}

export default Location;
