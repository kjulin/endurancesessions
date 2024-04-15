import {baseProcedure, rpcRouter} from "../trpc";
import {TrainingSession, TrainingSessionCreate, trainingSessionRepo, TrainingSessionUpdate} from "./db";
import {z} from "zod";
import {crudEndpoints} from "../foundation/rpc/crud-router";

export const confSessionApi = () => {
    return rpcRouter({
        ...crudEndpoints(trainingSessionRepo)
    })
}