/**
 * v0 by Vercel.
 * @see https://v0.dev/t/6WjoViU7zXi
 */
"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MuscleGroup } from "@/services/musclegroup-service";
import { Exercise } from "@/services/exercise-service";
import { useState } from "react";

interface ExerciseGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  allMuscleGroups: MuscleGroup[];
  allExercises: Exercise[];
}

export function ExerciseGallery({
  allMuscleGroups,
  allExercises,
  ...props
}: ExerciseGalleryProps) {
  const [selectedMuscleGroupId, setSelectedMuscleGroupId] = useState(1); //Default to Chest
  const handleMuscleGroupClick = (id: number) => {
    setSelectedMuscleGroupId(id);
  };

  return (
    <section className="flex h-screen flex-col">
      <nav className="flex h-16 w-full items-center justify-between bg-gray-200 px-4 dark:bg-gray-800">
        <h1 className="text-2xl font-semibold tracking-tight">
          Exercise Board
        </h1>
        <div className="flex items-center">
          <div className="relative mr-4">
            <svg
              className=" absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <Input
              className="w-full appearance-none bg-white pl-8 shadow-none dark:bg-gray-900"
              placeholder="Search exercises..."
              type="search"
            />
          </div>
          <div className="flex items-center">
            <Button className="mr-2 rounded px-4 py-2 font-bold">
              Add Exercise
            </Button>
            <Button className="rounded px-4 py-2 font-bold" variant="secondary">
              Delete Exercise
            </Button>
          </div>
        </div>
      </nav>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 overflow-auto border-r bg-gray-100 dark:border-gray-800 dark:bg-gray-900">
          <nav className="space-y-1 py-4">
            {allMuscleGroups.map((muscleGroup) => (
              <div
                key={muscleGroup.id}
                onClick={() => handleMuscleGroupClick(muscleGroup.id)}
                className={`block rounded px-4 py-2 ${
                  selectedMuscleGroupId === muscleGroup.id
                    ? "bg-gray-200 dark:bg-gray-800"
                    : "hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                {muscleGroup.name}
              </div>
            ))}
          </nav>
        </aside>
        <main className="flex-1 overflow-y-auto bg-white p-4 dark:bg-gray-900">
          <div className="grid grid-cols-3 gap-4">
            {allExercises
              .filter(
                (exercise) => exercise.muscleGroupId === selectedMuscleGroupId,
              )
              .map((exercise) => (
                <div key={exercise.id} className="rounded border p-4">
                  <h2 className="text-lg font-bold">{exercise.name}</h2>
                </div>
              ))}
          </div>
        </main>
      </div>
    </section>
  );
}