import type { Meta, StoryObj } from '@storybook/react'
import { delay, http, HttpResponse } from 'msw'
import Demo from './demo'

const meta = {
  title: 'UI/Demo',
  component: Demo,
  tags: ['autodocs'],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [],
} satisfies Meta<typeof Demo>

export default meta
type Story = StoryObj<typeof meta>

const handlers = {
  success: [
    http.get('/api/cards', async () => {
      await delay('real')
      return HttpResponse.json({
        cards: [
          { id: '1', title: 'Card 1', description: 'Description 1' },
          { id: '2', title: 'Card 2', description: 'Description 2' },
        ],
      })
    }),
  ],
  empty: [
    http.get('/api/cards', async () => {
      return HttpResponse.json({ cards: [] })
    }),
  ],
  loading: [
    http.get('/api/cards', async () => {
      await delay('infinite')
      return HttpResponse.json({ status: 'loading' })
    }),
  ],
  serverError: [
    http.get('/api/cards', () => {
      return HttpResponse.error()
      // return res(ctx.status(500));
    }),
  ],
}

export const Default: Story = {
  parameters: {
    msw: handlers.success,
  },
}

export const Empty: Story = {
  parameters: {
    msw: handlers.empty,
  },
}

export const Loading: Story = {
  parameters: {
    msw: handlers.loading,
  },
}

export const ServerError: Story = {
  parameters: {
    msw: handlers.serverError,
  },
}
