export default function SpinningButton() {
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
