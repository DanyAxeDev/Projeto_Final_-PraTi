type NumberInfoProps = {
    number: string;
    info: string;
  }
  
  function NumberInfoItem({ number, info }: NumberInfoProps) {
    return (
      <div className="max-w-[150px] text-center sm:text-start">
        <span className="text-3xl font-tilt text-blue mb-2">{number}</span>
        <br/>
        <p className="font-lg font-semibold">{info}</p>
      </div>
    )
  }
  
  export default NumberInfoItem