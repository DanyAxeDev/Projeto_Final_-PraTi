type FormStepHeadingProps = {
  step: number
  title: string
}

function FormStepHeading({ step, title }: FormStepHeadingProps) {
  return (
    <div className="flex items-center gap-3 mb-7">
      <span className="flex justify-center items-center bg-blue text-white font-bold w-8 h-8 rounded-full pb-[2px]">
        {step}
      </span>
      <h3 className="inline-block text-lg font-bold">
        {title}
      </h3>
    </div>
  )
}

export default FormStepHeading
