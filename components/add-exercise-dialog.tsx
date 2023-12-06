"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from "@/db/config";
import { muscleGroup } from "@/db/schema";
import { Equipment } from "@/services/equipment-service";
import { Exercise } from "@/services/exercise-service";
import {
  MuscleGroup,
  getAllMuscleGroups,
} from "@/services/musclegroup-service";
import { useState } from "react";
4;

interface AddExerciseDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  allMuscleGroups: MuscleGroup[];
  allEquipment: Equipment[];
}

export function AddExerciseDialog({
  allMuscleGroups,
  allEquipment,
  ...props
}: AddExerciseDialogProps) {
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseDescription, setExerciseDescription] = useState("");

  const clearInputs = () => {
    setExerciseName("");
    setExerciseDescription("");
  };

  return (
    <Dialog onOpenChange={clearInputs}>
      <DialogTrigger asChild>
        <Button className="mr-2 rounded px-4 py-2 font-bold">
          Add Exercise
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Exercise</DialogTitle>
          <DialogDescription>
            Make changes to add new exercises here. Click add when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="New exercise name"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="exercise" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              placeholder="Exercise description"
              value={exerciseDescription}
              onChange={(e) => setExerciseDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="muscle" className="text-right">
              Muscle
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a muscle" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Muscles</SelectLabel>
                  {allMuscleGroups.map((muscleGroup) => (
                    <SelectItem key={muscleGroup.id} value={muscleGroup.name!}>
                      {muscleGroup.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="equipment" className="text-right">
              Equipment
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select the equipment" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Equipment</SelectLabel>
                  {allEquipment.map((muscleGroup) => (
                    <SelectItem key={muscleGroup.id} value={muscleGroup.name!}>
                      {muscleGroup.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={clearInputs}>
              Add
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" onClick={clearInputs} variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
