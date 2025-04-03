import type {Preview, ReactRenderer} from '@storybook/react'
import {DecoratorFunction} from "@storybook/csf";
import {withReactQueryProvider} from "./decorators";
import { initialize, mswLoader } from 'msw-storybook-addon'

// Initialize MSW
initialize()
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
};

export const decorators: DecoratorFunction<ReactRenderer>[] = [
    // add react-query to storybook
    withReactQueryProvider,
]

export default preview;