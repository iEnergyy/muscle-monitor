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
import { useEffect, useState } from "react";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { clear } from "console";

interface AddExerciseDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  allMuscleGroups: MuscleGroup[];
  allEquipment: Equipment[];
}

const exerciseFormSchema = z
  .object({
    name: z.string({ required_error: "Please add a name." }),
    description: z.string({
      required_error: "Please write a description.",
    }),
    muscle: z.string({
      required_error: "Please select a muscle.",
    }),
    equipment: z.string({
      required_error: "Please select an equipment.",
    }),
  })
  .refine(
    (data) => {
      // Custom validator: Check if all fields are non-empty
      return Object.values(data).every((value) => value !== "");
    },
    {
      message: "All fields must be filled.",
    },
  );

type ExerciseFormValues = z.infer<typeof exerciseFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ExerciseFormValues> = {
  name: "",
  description: "",
  muscle: "",
  equipment: "",
};

export function AddExerciseDialog({
  allMuscleGroups,
  allEquipment,
  ...props
}: AddExerciseDialogProps) {
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseDescription, setExerciseDescription] = useState("");

  function clearInputs() {
    setExerciseName("");
    setExerciseDescription("");
  }

  function handleCancel() {
    form.reset();
  }

  const form = useForm<ExerciseFormValues>({
    resolver: zodResolver(exerciseFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { formState } = form; // Destructure formState from the useForm hook
  const isFormEmpty = Object.values(formState.dirtyFields).every(
    (isDirty) => !isDirty,
  );

  function onSubmit(data: ExerciseFormValues) {
    console.log(data);
    clearInputs();
    form.reset();

    toast({
      title: "You submitted the following values:",
      description: (
        <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </div>
      ),
    });
  }

  return (
    <Form {...form}>
      <Dialog onOpenChange={clearInputs}>
        <DialogTrigger asChild>
          <Button className="mr-2 rounded px-4 py-2 font-bold">
            Add Exercise
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add Exercise</DialogTitle>
              <DialogDescription>
                Make changes to add new exercises here. Click add when you are
                done.
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      placeholder="New exercise name"
                      className="col-span-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      id="description"
                      placeholder="Exercise description"
                      className="col-span-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="muscle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Muscle</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select a muscle" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Muscles</SelectLabel>
                        {allMuscleGroups.map((muscleGroup) => (
                          <SelectItem
                            key={muscleGroup.id}
                            value={muscleGroup.id.toString()}
                          >
                            {muscleGroup.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="equipment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Equipment</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select the equipment" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Equipment</SelectLabel>
                        {allEquipment.map((muscleGroup) => (
                          <SelectItem
                            key={muscleGroup.id}
                            value={muscleGroup.id.toString()}
                          >
                            {muscleGroup.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="p-2">
              <DialogClose asChild>
                <Button
                  type="submit"
                  disabled={!formState.isValid || isFormEmpty}
                  // onClick={clearInputs}
                >
                  Add
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
