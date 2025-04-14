import type { Decorator } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'

export const MswReactQueryDecorator: Decorator = (Story) => {
  // Create a unique query client for each story render
  // This ensures we have a fresh cache for each story
  const queryClient = React.useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          refetchOnWindowFocus: false,
          // Critical: set this to 0 to force re-fetch when MSW handlers change
          staleTime: 0,
          // Don't cache data between story renders
          // cacheTime: 0,
          // Important: don't use suspense in this scenario as it complicates the MSW integration
          // suspense: false,
        },
      },
    })
  }, []) // Recreate when story changes

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-dvh w-dvw">
        <Story />
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}
      </div>
    </QueryClientProvider>
  )
}
