import { db } from "@/db/config";
import { exercise } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type Exercise = InferSelectModel<typeof exercise>;

export const getAllExercise: Exercise[] = await db.select().from(exercise);
