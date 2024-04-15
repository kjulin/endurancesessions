import { inferAsyncReturnType, initTRPC } from "@trpc/server";

import * as trpcStandalone from "@trpc/server/adapters/standalone";

import cors from "cors";
import {confSessionApi} from "./sessions/api";

export async function createContext({
  req,
}: trpcStandalone.CreateHTTPContextOptions) {
  const resolveJwt = () => {
    const jwt = req.headers?.authorization;
    const split = jwt ? jwt.split(" ") : [];
    if (split.length !== 2 || split[0] !== "Bearer") return undefined;
    return split[1];
  };

  return {
    jwt: resolveJwt(),
  };
}

type RpcContext = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<RpcContext>().create();
export const rpcRouter = t.router;

export const baseProcedure = t.procedure;

export const appRouter = rpcRouter({
  ping: baseProcedure.query(async () => {
    return "pong!";
  }),
  sessions: confSessionApi()
});

export type AppRouter = typeof appRouter;

export const confRpcServer = () =>
  trpcStandalone.createHTTPServer({
    middleware: cors(),
    createContext,
    router: appRouter,
  });
