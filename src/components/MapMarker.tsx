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
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "100vw", height: "100vh" }}>
            <img src="src\assets\imgs\not-found-cat.png" style={{ width: "25em" }}></img>
            <p style={{ fontSize: "36px" }}>Carregando...</p>
        </div >
    )

    return <Map />
}

//carrega o mapa
function Map() {
    const center = useMemo(() => ({ lat: -15.0, lng: -50.0 }), [])
    const [selected, setSelected] = useState<google.maps.LatLngLiteral | null>(null)
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

    //Centralizar no usuário

    //Centraliza o mapa quando um ponto é selecionado
    useEffect(() => {
        if (selected && mapRef.current) {
            const map = mapRef.current
            map.panTo(selected)
            map.setZoom(15)
        }
    }, [selected])

    //Função para centralizar no usuário
    const handleCenterOnUser = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userPosition = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                    setSelected(userPosition) // opcional: centraliza também
                    mapRef.current?.panTo(userPosition)
                    mapRef.current?.setZoom(15)
                },
                () => {
                    alert("Não foi possível obter sua localização.")
                }
            )
        } else {
            alert("Geolocalização não suportada neste navegador.")
        }
    }

    return (
        <>
            {/* renderização do mapa */}
            <GoogleMap
                zoom={5}
                center={center}
                onLoad={onLoad}
                mapContainerClassName="map-container"
                mapContainerStyle={{ height: "90vh", width: "100%" }}
                options={{
                    mapId: '6c1220e1a6152c58d27c0920'
                }}
            >
                {/* Botão para centralizar no usuário */}
                <button
                    onClick={handleCenterOnUser}
                    style={{
                        position: "absolute",
                        bottom: "168px",
                        right: "-10px",
                        height: "40px",
                        width: "40px",
                        padding: "0",
                        margin: "0",
                        transform: "translateX(-50%)",
                        zIndex: 10,
                        borderRadius: "5px",
                        background: "#ffffffff",
                        border: "1px solid #ccc",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                >
                    <img src="src\assets\icons\icon-heart-paw.png" />
                </button>

                {/* box da caixa de seleção */}
                <div style={{
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
    } = usePlacesAutocomplete({
        requestOptions: { componentRestrictions: { country: "br" }, }, debounce: 300,
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
            {/* caixa de texto */}
            <input value={value} onChange={(e) => setValue(e.target.value)} disabled={!ready} placeholder="Escolha um local de encontro" className="suggestions-input"
                style={{
                    width: "100%",
                    padding: "8px",
                    fontSize: "16px",
                    borderRadius: "4px",
                    backgroundColor: "#33333377"
                }}
            />
            {status === "OK" && (
                // lista dropdown
                <ul className="suggestions-dropdown" style={{
                    listStyleType: "none",
                    margin: 0,
                    padding: 0,
                    background: "#ffffff80",
                    maxHeight: "200px",
                    overflowY: "scroll", //clipar?
                }}>
                    {/* mapeia sugestões e lista */}
                    {data.map(({ place_id, description }) => (
                        <li key={place_id} onClick={() => handleSelect(description)} style={{ padding: "8px", cursor: "pointer", }}>
                            {description}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};