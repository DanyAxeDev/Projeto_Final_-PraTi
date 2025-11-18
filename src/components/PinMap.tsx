"use client"

import { useMemo, useRef } from "react";
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import notFound from "@/assets/imgs/not-found-cat.png"
import amor from "@/assets/icons/amor.png";

type LatLngLiteral = google.maps.LatLngLiteral;

type PinMapProps = {
    latitude?: number | null;
    longitude?: number | null;
};

const DEFAULT_CENTER: LatLngLiteral = { lat: -15, lng: -50 };

export default function PinMap({ latitude, longitude }: PinMapProps) {
    //carrega o script do GoogleMaps com a biblioteca places
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyBks8gFvkvIxcffgrTTyExTCMpkSojdiEM',
        libraries: ['places'],
    })

    const markerPosition = useMemo<LatLngLiteral | null>(() => {
        if (typeof latitude === "number" && typeof longitude === "number") {
            return { lat: latitude, lng: longitude };
        }
        return null;
    }, [latitude, longitude]);

    const center = useMemo<LatLngLiteral>(() => markerPosition ?? DEFAULT_CENTER, [markerPosition]);

    //checa se a api foi carregada e exibe mensagem de carregando
    if (!isLoaded) return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "100vw", height: "100vh" }}>
            <img src={notFound} style={{ width: "25em" }}></img>
            <p style={{ fontSize: "36px" }}>Carregando...</p>
        </div >
    )

    if (!markerPosition) {
        return (
            <div className="flex flex-col items-center justify-center text-center gap-2 p-6 h-[40vh] w-full bg-gray-100 rounded-md">
                <img src={amor} alt="Localização" className="w-10 h-10 opacity-70" />
                <p className="text-sm text-gray-600">
                    Localização não informada para este pet.
                </p>
            </div>
        );
    }

    return <Map center={center} markerPosition={markerPosition} />
}

//carrega o mapa
function Map({ center, markerPosition }: { center: LatLngLiteral; markerPosition: LatLngLiteral }) {
    const mapRef = useRef<google.maps.Map | null>(null)
    const onLoad = (map: google.maps.Map) => {
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
                mapContainerStyle={{ height: "40vh", width: "100%" }}
                options={{
                    mapId: '6c1220e1a6152c58d27c0920'
                }}
            >
                <Marker position={markerPosition} icon={{url:'/icons/amor.png', scaledSize: new google.maps.Size(40, 40)}} />
            </GoogleMap>
        </>
    );
}