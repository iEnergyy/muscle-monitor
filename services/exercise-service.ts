import { db } from "@/db/config";
import { exercise } from "@/db/schema";
import { InferSelectModel, eq, sql } from "drizzle-orm";

export type Exercise = InferSelectModel<typeof exercise>;
export type NewExerciseInput = Omit<Exercise, "id">;

export const getAllExercise: Exercise[] = await db.select().from(exercise);

export async function createExercise(newExercise: NewExerciseInput) {
  try {
    // Check if an exercise with the same name already exists
    console.log(newExercise);
    const existingExercise = await db
      .select()
      .from(exercise)
      .where(eq(exercise.name, newExercise.name!));

    if (existingExercise.length > 0) {
      // Exercise with the same name already exists, handle it accordingly
      throw new Error(
        `Exercise with the name '${newExercise.name}' already exists.`,
      );
    }

    // No duplicate, proceed with insertion
    const insertExercise = await db.insert(exercise).values(newExercise);

    if (insertExercise.rowsAffected !== 1) {
      throw new Error("Failed to create Exercise");
    }

    // Success: Exercise created
    console.log("Exercise created successfully");
    return "Exercise created successfully";
  } catch (error) {
    // Handle any errors that occurred during the database operation
    console.error("Error creating exercise:", error);

    // Re-throw the error to propagate it up
    throw error;
  }
}
