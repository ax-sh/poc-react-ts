import type { DecoratorFunction } from "@storybook/csf";
import type { ReactRenderer } from "@storybook/react";
import type { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const mockedQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // suspense: true,
      staleTime: 0,
    },
  },
});

function WithReactQueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={mockedQueryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export const withReactQueryProvider: DecoratorFunction<ReactRenderer> = (
  Story,
) => {
  return (
    <WithReactQueryProvider>
      <div className={'h-dvh w-dvw'}>

      <Story />
      </div>
    </WithReactQueryProvider>
  );
};
