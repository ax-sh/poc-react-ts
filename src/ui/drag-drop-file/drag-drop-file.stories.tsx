import type { Meta, StoryObj } from '@storybook/react'
import DragDropFile from './drag-drop-file'

// function DragDropFile() {
//  return <div className="bg-red-500">Test DragDropFile</div>
// }
const meta = {
  title: 'UI/DragDropFile',
  component: DragDropFile,
  tags: ['autodocs'],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof DragDropFile>

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
