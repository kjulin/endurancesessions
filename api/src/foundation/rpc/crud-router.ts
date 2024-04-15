import {ZodRepo} from "../db";
import {baseProcedure} from "../../trpc";
import {TrainingSession, TrainingSessionCreate, trainingSessionRepo, TrainingSessionUpdate} from "../../sessions/db";
import {z} from "zod";

export const crudEndpoints = <T extends ZodRepo<any>>(repo: T) => {
    return {
        list: baseProcedure
            .output(repo.config.entitySchema.array())
            .query(async () => {
                return repo.list({});
            }),
        find: baseProcedure
            .input(z.string())
            .output(repo.config.entitySchema)
            .query(async ({input}) => {
                return repo.findById(input);
            }),
        create: baseProcedure
            .input(repo.config.createSchema ?? z.unknown())
            .output(TrainingSession)
            .mutation(async ({input}) => {
                if (!repo.config.createSchema) {
                    throw new Error("Create not supported");
                }
                return repo.create(input);
            }),
        update: baseProcedure
            .input(z.object({id: z.string(), updates: repo.config.updateSchema ?? z.unknown()}))
            .output(TrainingSession)
            .mutation(async ({input}) => {
                if (!repo.config.updateSchema) {
                    throw new Error("Create not supported");
                }
                const {id, updates} = input;
                return repo.updateById(id, updates);
            }),
        delete: baseProcedure
            .input(z.string())
            .output(z.string())
            .mutation(async ({input}) => {
                return repo.deleteById(input);
            }),
    }
}