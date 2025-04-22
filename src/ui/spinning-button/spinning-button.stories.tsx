import type { Meta, StoryObj } from '@storybook/react'
// import SpinningButton from './spinning-button'
import SpinningBorderButton from './spinning-button'

// Example usage
function ButtonExample() {
  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-gray-50">
      <h2 className="text-xl font-bold mb-4">Spinning Border Button Examples</h2>

      {/* Default button */}
      <SpinningBorderButton onClick={() => alert('Button clicked!')}>
        Click Me
      </SpinningBorderButton>

      {/* Custom styling */}
      <SpinningBorderButton
        width={200}
        height={60}
        borderColor="#FF5733"
        circleColor="#6A0DAD"
        textColor="#333333"
        animationDuration={2}
        borderRadius={8}
      >
        Custom Style
      </SpinningBorderButton>

      {/* Reversed animation */}
      <SpinningBorderButton
        borderColor="#4CAF50"
        reverseAnimation={true}
        borderWidth={2}
      >
        Reverse Spin
      </SpinningBorderButton>
    </div>
  )
}
const meta = {
  title: 'UI/SpinningButton',
  component: ButtonExample,
  tags: ['autodocs'],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof ButtonExample>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {},
  parameters: {},
}
export const Fullscreen: Story = {
  args: {},
  parameters: {
    layout: 'fullscreen',
  },
}
