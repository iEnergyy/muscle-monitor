import { NextResponse, NextRequest } from "next/server";
import {
  Exercise,
  NewExerciseInput,
  createExercise,
  getAllExercise,
} from "@/services/exercise-service";

export async function GET(request: NextRequest) {
  const allExercise: Exercise[] = getAllExercise;
  return NextResponse.json(allExercise);
}
export async function POST(request: NextRequest) {
  const newExercise: NewExerciseInput = await request.json();
  const createdExercise = createExercise(newExercise);
  return NextResponse.json(createdExercise);
}
