import { migrateDB } from "./db";
import { confRpcServer } from "./trpc";

(async () => {
    await migrateDB();

    const port = parseInt(process.env.PORT || "3333");
    const rpcServer = confRpcServer();

    console.log(`Running Sessions API on port ${port}`);
    rpcServer.listen(port);
})();
