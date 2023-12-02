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
}: Readonly<ExerciseGalleryProps>) {
  const [selectedMuscleGroupId, setSelectedMuscleGroupId] = useState(1); //Default to Chest
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExercises = allExercises.filter(
    (exercise) =>
      exercise.muscleGroupId === selectedMuscleGroupId &&
      exercise.name!.toLowerCase().includes(searchQuery.toLowerCase()),
  );

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
            <IconSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="w-full appearance-none bg-white pl-8 shadow-none dark:bg-gray-900"
              placeholder="Search exercises..."
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                onKeyDown={() => handleMuscleGroupClick(muscleGroup.id)}
                tabIndex={muscleGroup.id}
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
            {filteredExercises
              .filter(
                (exercise) => exercise.muscleGroupId === selectedMuscleGroupId,
              )
              .map((exercise) => (
                <div key={exercise.id} className="rounded border p-4">
                  <h2 className="text-lg font-bold">{exercise.name}</h2>
                </div>
              ))}

            {filteredExercises.filter(
              (exercise) => exercise.muscleGroupId === selectedMuscleGroupId,
            ).length === 0 && (
              <p className="text-lg text-gray-600 dark:text-gray-400">
                No exercises available. Please add.
              </p>
            )}
          </div>
        </main>
      </div>
    </section>
  );
}

function IconSearch(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
