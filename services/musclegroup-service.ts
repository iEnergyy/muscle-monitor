import { db } from "@/db/config";
import { muscleGroup } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type MuscleGroup = InferSelectModel<typeof muscleGroup>;

export const getAllMuscleGroups: MuscleGroup[] = await db
  .select()
  .from(muscleGroup);
