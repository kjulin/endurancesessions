import {z} from "zod";
import {ZodRepo} from "../foundation";

export const TrainingSession = z.object({
    id: z.string(),
    title: z.string(),
    date: z.date(),
    raw_data: z.unknown(),
});
export type TrainingSession = z.infer<typeof TrainingSession>;

export const TrainingSessionCreate = TrainingSession.pick({
    title: true,
    date: true,
    raw_data: true,
});

export const TrainingSessionUpdate = TrainingSession.pick({
    title: true,
    date: true,
    raw_data: true,
});

export class TrainingSessionRepo extends ZodRepo<TrainingSession> {
    config = {
        tableName: "sessions.sessions",
        idField: "id",
        entitySchema: TrainingSession,
        createSchema: TrainingSessionCreate,
        updateSchema: TrainingSessionUpdate,
    }
}

export const trainingSessionRepo = new TrainingSessionRepo();