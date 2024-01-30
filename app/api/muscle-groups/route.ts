import { NextResponse, NextRequest } from "next/server";

import {
  MuscleGroup,
  getAllMuscleGroups,
} from "@/services/musclegroup-service";

export async function GET(request: NextRequest) {
  const allMuscleGroups: MuscleGroup[] = getAllMuscleGroups;
  return NextResponse.json(allMuscleGroups);
}
