import type { Meta, StoryObj } from '@storybook/react'

import { FileUploader } from './file-uploader.tsx'

// function DragDropFile() {
//  return <div className="bg-red-500">Test DragDropFile</div>
// }
const meta = {
  title: 'UI/FileUploader',
  component: FileUploader,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
} satisfies Meta<typeof FileUploader>

export default meta
type Story = StoryObj<typeof meta>

export const Fullscreen: Story = {
  args: {},
  parameters: {
    layout: 'fullscreen',
  },
}
