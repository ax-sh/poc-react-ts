import type { DecoratorFunction } from '@storybook/csf'
import type { Preview, ReactRenderer } from '@storybook/react'

import { initialize, mswLoader } from 'msw-storybook-addon'

import { handlers } from './handlers.js'
import { MswReactQueryDecorator } from './msw-react-query-decorator.js'
import '../src/index.css' // replace with the name of your tailwind css file

// Initialize MSW
initialize({
  // Ignores asset related http requests, otherwise
  // it prints noisy warnings, hiding important ones.
  onUnhandledRequest(request, print) {
    try {
      const url = new URL(request.url)

      // Define patterns to ignore
      const ignoredPrefixes = [
        '/sb-common-assets',
        '/index.json',
        '/.storybook',
      ]
      const ignoredExtensions = ['.png', '.svg', '.css', '.yaml', '.tsx']

      // Check if URL should be ignored based on prefix or extension
      const shouldIgnore = ignoredPrefixes.some(prefix =>
        url.pathname.startsWith(prefix),
      )
      || ignoredExtensions.some(ext => url.pathname.endsWith(ext))

      if (shouldIgnore) {
        return
      }
    }
    catch {
      // URL parsing failed, continue to warning
    }

    print.warning()
  },
}, handlers)
const preview: Preview = {
  loaders: [mswLoader],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export const decorators: DecoratorFunction<ReactRenderer>[] = [
  // add react-query to storybook
  // withReactQueryProvider,
  MswReactQueryDecorator,
]

export default preview
