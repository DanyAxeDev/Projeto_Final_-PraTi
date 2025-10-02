type MapProps = {
  neighbourhood: string;
  city: string;
  state: string;
}

function Map({ neighbourhood, city, state }: MapProps) {
  // Se tiver bairro, cidade e estado: location recebe a string formatada
  const location = (neighbourhood && city && state) && `${neighbourhood.split(" ").join("+")},${city.split(" ").join("+")}+${state.toUpperCase()}`

  if (location)
    return (
      <iframe
        className="border-0 h-[230px] w-full md:size-[230px] lg:size-[300px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
          &q=${location}&language=pt-br`}>
      </iframe>
    )
}

export default Map
