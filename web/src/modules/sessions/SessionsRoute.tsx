import { TopBarRoute } from "../../foundation";
import { Button } from "@introist/react-foundation/v2";
import {api} from "../../rpc/RpcProvider";
import Example from "./Example";

export const SessionsRoute = () => {

    const {data: sessions} = api.sessions.list.useQuery();

    console.log(sessions)

  return (
    <TopBarRoute
      paths={[{ key: "sessions", title: "Sessions" }]}
      actions={
        <Button variant="outlined" startIcon="plus">
          Add session
        </Button>
      }
    >
        <h1 className="text-2xl font-bold font-sans">
            Hello world!
        </h1>
        <Example />
        <div>Sessions: {JSON.stringify(sessions)}</div>
    </TopBarRoute>
  );
};
