

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Decorator } from '@storybook/react';
import {useMemo} from "react";


/**
 * Combined MSW and React Query decorator for Storybook
 * Addresses state synchronization issues between MSW and React Query
 */
export const MswReactQueryDecorator: Decorator = (Story, context) => {
    // Create a unique query client for each story render
    // This ensures we have a fresh cache for each story
    const queryClient = useMemo(() => new QueryClient({
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
    }), [context.id, context.args]); // Recreate when story changes

    return (
        <QueryClientProvider client={queryClient}>
            <div className={'h-dvh w-dvw'}>
            <Story />
            {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
            </div>
        </QueryClientProvider>
    );
};