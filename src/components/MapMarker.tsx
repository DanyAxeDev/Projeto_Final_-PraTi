"use client"

import { useState, useMemo, useRef, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from "react-cool-onclickoutside";

export default function MapMarker() {
    //carrega o script do GoogleMaps com a biblioteca places
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBks8gFvkvIxcffgrTTyExTCMpkSojdiEM',
        libraries: ['places'],
    })

    //checa se a api foi carregada e exibe mensagem de carregando
    if (!isLoaded) return (
        <div>Carregando...</div>
    )

    return <Map />
}

//carrega o mapa
function Map() {
    const center = useMemo(() => ({ lat: -15.0, lng: -50.0 }), [])
    const [selected, setSelected] = useState(null)
    const mapRef = useRef<google.maps.Map | null>(null)
    const onLoad = (map) => {
        mapRef.current = map
    }

    //zoom quando selecionado um local
    useEffect(() => {
        if (selected && mapRef.current) {
            const map = mapRef.current

            // Move o mapa até o local
            map.panTo(selected)

            // Aumenta o zoom de forma progressiva
            const currentZoom = map.getZoom() || 5
            const targetZoom = 15
            const newZoom = Math.min(currentZoom + 3, targetZoom)

            map.setZoom(newZoom);
        }
    }, [selected])

    return (
        <>
            <GoogleMap
                zoom={5}
                center={center}
                onLoad={onLoad}
                mapContainerClassName="map-container"
                mapContainerStyle={{ height: "90vh", width: "100%" }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: "10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 10,
                        width: "300px",
                    }}
                >
                    <PlacesAutocomplete setSelected={setSelected} />
                </div>

                {selected && <Marker position={selected} />}
            </GoogleMap>
        </>
    );
}

const PlacesAutocomplete = ({ setSelected }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete({ requestOptions: { componentRestrictions: { country: "br" },}, debounce: 300,
    })

    //limpa dropdrown quando usuário clica fora
    const ref = useOnclickOutside(() => {
        clearSuggestions()
    })

    //seleção de opção
    const handleSelect = async (address: string) => {
        setValue(address, false)
        clearSuggestions()

        const results = await getGeocode({ address })
        const { lat, lng } = await getLatLng(results[0])
        setSelected({ lat, lng })
    }

    return (
        <div ref={ref} className="suggestions-container">
            <input value={value} onChange={(e) => setValue(e.target.value)} disabled={!ready} placeholder="Escolha um local de encontro" className="suggestions-input"
                style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "16px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                }}
            />
            {status === "OK" && (
                <ul className="suggestions-dropdown"style={{
                        listStyleType: "none",
                        margin: 0,
                        padding: "4px",
                        background: "white",
                        border: "1px solid #ccc",
                        borderTop: "none",
                        maxHeight: "200px",
                        overflowY: "auto",
                        
                    }}>   
                    {/* mapeia sugestões e lista */}
                    {data.map(({ place_id, description }) => (
                        <li key={place_id} onClick={() => handleSelect(description)} style={{padding: "8px",cursor: "pointer",}}> 
                            {description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};