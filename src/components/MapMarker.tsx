"use client"

import { useState, useMemo, useRef, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from "react-cool-onclickoutside";
import HeartIcon from "src/assets/icons/icon-heart-paw.png"

type LatLngLiteral = google.maps.LatLngLiteral;

type MapMarkerProps = {
    onLocationChange?: (coords: LatLngLiteral | null) => void;
    initialLocation?: LatLngLiteral | null;
};

export default function MapMarker({ onLocationChange, initialLocation = null }: MapMarkerProps) {
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

    return <Map onLocationChange={onLocationChange} initialLocation={initialLocation} />
}

//carrega o mapa
function Map({ onLocationChange, initialLocation }: { onLocationChange?: (coords: LatLngLiteral | null) => void; initialLocation: LatLngLiteral | null; }) {
    const center = useMemo(() => ({ lat: -15.0, lng: -50.0 }), [])
    const [selected, setSelected] = useState<LatLngLiteral | null>(initialLocation)
    const mapRef = useRef<google.maps.Map | null>(null)
    const onLoad = (map: google.maps.Map) => {
        mapRef.current = map
    }

    useEffect(() => {
        setSelected(initialLocation)
    }, [initialLocation])

    useEffect(() => {
        if (onLocationChange) {
            onLocationChange(selected)
        }
    }, [selected, onLocationChange])

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
                mapContainerStyle={{ height: "40vh", width: "100%" }}
                options={{
                    mapTypeControl: false,
                    mapId: '6c1220e1a6152c58d27c0920'
                }}
            >
                {/* Botão para centralizar no usuário */}
                <button
                    onClick={handleCenterOnUser}
                    aria-label="centralizar no meu local."
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
                    <HeartIcon />
                </button>

                {/* box da caixa de seleção */}
                <div className="col-span-2"
                    style={{
                        position: "absolute",
                        top: "10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 10,
                        width: "48.41%",
                        height: "36px"
                    }}
                >
                    <PlacesAutocomplete setSelected={setSelected} />
                </div>

                {selected && <Marker position={selected} />}
            </GoogleMap>
        </>
    );
}

const PlacesAutocomplete = ({ setSelected }: { setSelected: (position: LatLngLiteral) => void }) => {
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
                    padding: "4px 12px",
                    fontSize: "16px",
                    borderRadius: "4px",
                    backgroundColor: "rgba(255, 255, 255, 0.5)"
                }}
            />
            {status === "OK" && (
                // lista dropdown
                <ul className="suggestions-dropdown" style={{
                    listStyleType: "none",
                    margin: 0,
                    padding: 0,
                    background: "rgba(255, 255, 255, 0.3)",
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