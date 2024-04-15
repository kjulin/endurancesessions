import {AppRouter} from "../../../api/src/trpc"

import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ComponentProps, useState} from "react";


export const api = createTRPCReact<AppRouter>();

export const RpcProvider = (props: ComponentProps<"div">) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
      api.createClient({
        links: [
          httpBatchLink({
            url: 'http://localhost:3333',
          }),
        ],
      }),
  );
  return (
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {props.children}
        </QueryClientProvider>
      </api.Provider>
  );
};


