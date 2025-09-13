import { useState } from "react"
import { IoMdHelpCircle } from "react-icons/io"
import { FaInfoCircle } from "react-icons/fa"

type Tooltip = {
  type: "help" | "info"
  tip: string
  label: string
}

function Tooltip({ type, tip, label }: Tooltip) {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)

  return (
    <div 
    className="relative" 
    tabIndex={0}
    aria-label={label}
    onFocus={() => setIsTooltipVisible(true)}
    onBlur={() => (setIsTooltipVisible(false))}
    onMouseEnter={() => setIsTooltipVisible(true)}
    onMouseLeave={() => setIsTooltipVisible(false)}
    >
      {type === "help" 
      ? 
        <IoMdHelpCircle aria-hidden="true" className="text-lg text-darkblue" /> 
      : 
        <FaInfoCircle aria-hidden="true" className="text-lg text-darkblue" />
      }

      <div className={`absolute bg-darkblue text-white font-semibold text-sm py-1 px-2 rounded-sm w-[140px] bottom-5 z-20 ${isTooltipVisible ? "visible" : "invisible"}`}>
        {tip}
      </div>
    </div>
  )
}

export default Tooltip
