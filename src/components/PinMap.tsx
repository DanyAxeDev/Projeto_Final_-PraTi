"use client"

import { useMemo, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

//adicionar fetch para setar as coordenadas do pin
const pinLatLng = {lat: -22.538391118073292, lng: -44.789052588401674}

export default function PinMap() {
    //carrega o script do GoogleMaps com a biblioteca places
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBks8gFvkvIxcffgrTTyExTCMpkSojdiEM',
        libraries: ['places'],
    })

    //checa se a api foi carregada e exibe mensagem de carregando
    if (!isLoaded) return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "100vw", height: "100vh" }}>
            <img src="src\assets\imgs\not-found-cat.png" style={{ width: "25em" }}></img>
            <p style={{ fontSize: "36px" }}>Carregando...</p>
        </div >
    )

    return <Map />
}

//carrega o mapa
function Map() {
    const center = useMemo(() => (pinLatLng), [])
    const mapRef = useRef<google.maps.Map | null>(null)
    const onLoad = (map) => {
        mapRef.current = map
    }

    return (
        <>
            {/* renderização do mapa */}
            <GoogleMap
                zoom={15}
                center={center}
                onLoad={onLoad}
                mapContainerClassName="map-container"
                mapContainerStyle={{ height: "90vh", width: "100%" }}
                options={{
                    mapId: '6c1220e1a6152c58d27c0920'
                }}
            >
                <Marker position={pinLatLng} icon={{url:'/icons/amor.png', scaledSize: new google.maps.Size(40, 40)}} />
            </GoogleMap>
        </>
    );
}