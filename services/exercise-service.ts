import { db } from "@/db/config";
import { exercise } from "@/db/schema";
import { InferSelectModel, eq } from "drizzle-orm";

export type Exercise = InferSelectModel<typeof exercise>;

export const getAllExercise: Exercise[] = await db.select().from(exercise);

export async function createExercise(newExercise: Exercise) {
  // Check if an exercise with the same name already exists
  const existingExercise = await db
    .select()
    .from(exercise)
    .where(eq(exercise.name, newExercise.name!));

  if (existingExercise) {
    // Exercise with the same name already exists, handle it accordingly
    throw new Error(
      `Exercise with the name '${newExercise.name}' already exists.`,
    );
  }

  // No duplicate, proceed with insertion
  return db.insert(exercise).values(newExercise);
}
