import { useEffect, useState } from 'react'

export function SpinningButtonSimple() {
  return (
    <section className="h-dvh w-dvw bg-white rounded-lg shadow-md p-6">
      <div className="button-container relative w-[300px] h-[80px]">
        <style>
          {`
    @keyframes spin {
      0% {
        stroke-dashoffset: 0;
      }
      100% {
        stroke-dashoffset: 2;
      }
    }
    `}
        </style>

        <div className="svg-container absolute inset-0">
          <svg className="isolate h-full w-full overflow-visible">
            {/* // <!-- Base shape with light gray stroke --> */}
            <path
              d="M 140 0.5 L 267.5 0.5 A 12 12 0 0 1 279.5 12 L 279.5 12.5 L 279.5 67.5 A 12 12 0 0 1 267.5 79.5 L 268 79.5 L 12.5 79.5 A 12 12 0 0 1 0.5 68 L 0.5 68.5 L 0.5 12 L 0.5 0.5 L 12.5 0.5 Z"
              fill="white"
              stroke="#E6E7EA"
            >
            </path>

            {/* // <!-- Animated green border --> */}
            <path
              className="border-animated animate-[spin_3s_linear_infinite]"
              d="M 140 0.5 L 267.5 0.5 A 12 12 0 0 1 279.5 12 L 279.5 12.5 L 279.5 67.5 A 12 12 0 0 1 267.5 79.5 L 268 79.5 L 12.5 79.5 A 12 12 0 0 1 0.5 68 L 0.5 68.5 L 0.5 12 L 0.5 0.5 L 12.5 0.5 Z"
              fill="none"
              stroke="#0FC27B"
              pathLength="1"
              stroke-dashoffset="0px"
              stroke-dasharray="1.01px 1px"
            >
            </path>
          </svg>
        </div>

        <div className="button-content absolute inset-0 flex justify-center items-center cursor-pointer text-xl text-[#266DF0] z-20 font-medium">
          Click Me
        </div>
      </div>
    </section>
  )
}

interface SpinningBorderButtonProps {
  /** Text content of the button */
  children: React.ReactNode
  /** Width of the button */
  width?: number
  /** Height of the button */
  height?: number
  /** Base/background color of the button */
  baseColor?: string
  /** Color of the animated border */
  borderColor?: string
  /** Color of the indicator circle */
  circleColor?: string
  /** Color of the text/content */
  textColor?: string
  /** Duration of the spinning animation in seconds */
  animationDuration?: number
  /** Event handler for button click */
  onClick?: () => void
  /** Indicator circle size */
  circleSize?: number
  /** Border radius of the button corners */
  borderRadius?: number
  /** If true, reverses the animation direction */
  reverseAnimation?: boolean
  /** Thickness of the spinning border */
  borderWidth?: number
  /** Optional additional CSS classes */
  className?: string
}

export default function SpinningBorderButton({
  children,
  width = 280,
  height = 80,
  baseColor = '#E6E7EA',
  borderColor = '#0FC27B',
  circleColor = '#266DF0',
  textColor = '#266DF0',
  animationDuration = 1.5,
  onClick,
  circleSize = 5,
  borderRadius = 12,
  reverseAnimation = false,
  borderWidth = 1,
  className = '',
}: SpinningBorderButtonProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [dashOffset, setDashOffset] = useState(0)

  // Create the path for the rounded rectangle
  const generatePath = () => {
    const w = width
    const h = height
    const r = borderRadius

    return `M ${w / 2} 0.5 L ${w - r} 0.5 A ${r} ${r} 0 0 1 ${w - 0.5} ${r} L ${w - 0.5} ${h - r} A ${r} ${r} 0 0 1 ${w - r} ${h - 0.5} L ${r} ${h - 0.5} A ${r} ${r} 0 0 1 0.5 ${h - r} L 0.5 ${r} A ${r} ${r} 0 0 1 ${r} 0.5 L ${w / 2} 0.5`
  }

  // Animation effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDashOffset((prev) => {
        const step = 0.01
        return reverseAnimation ? prev - step : prev + step
      })
    }, 16) // ~60fps

    return () => clearInterval(intervalId)
  }, [reverseAnimation])

  return (
    <button
      type="button"
      className={`relative ${className}`}
      style={{ width, height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="absolute inset-0 cursor-pointer">
        <svg className="w-full h-full overflow-visible">
          {/* Base shape */}
          <path
            d={generatePath()}
            fill="white"
            stroke={baseColor}
            strokeWidth={borderWidth}
          />

          {/* Animated border */}
          <path
            d={generatePath()}
            fill="none"
            stroke={borderColor}
            strokeWidth={borderWidth}
            pathLength="1"
            strokeDasharray="1.01 1"
            strokeDashoffset={dashOffset}
            style={{
              transition: `stroke ${animationDuration * 0.2}s`,
            }}
          />

          {/* Circle indicator */}
          <circle
            cx={width / 2}
            cy={height - 0.5}
            r={circleSize}
            fill="white"
            stroke={isHovered ? borderColor : circleColor}
            strokeWidth={borderWidth}
            style={{
              transition: `stroke ${animationDuration * 0.2}s`,
            }}
          />
        </svg>
      </div>

      {/* Button content */}
      <div
        className="absolute inset-0 flex items-center justify-center font-medium"
        style={{ color: textColor, zIndex: 10 }}
      >
        {children}
      </div>
    </button>
  )
}
