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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Equipment } from "@/services/equipment-service";
import { MuscleGroup } from "@/services/musclegroup-service";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  NewExerciseInput,
  createExercise,
  getAllExercise,
} from "@/services/exercise-service";

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
    muscleGroupId: z.string({
      required_error: "Please select a muscle.",
    }),
    equipmentId: z.string({
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
  muscleGroupId: "",
  equipmentId: "",
};

export function AddExerciseDialog({
  allMuscleGroups,
  allEquipment,
  ...props
}: Readonly<AddExerciseDialogProps>) {
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

  async function onSubmit(data: ExerciseFormValues) {
    console.log(data);
    form.reset();
    const newExercise: NewExerciseInput = {
      name: data.name,
      description: data.description,
      muscleGroupId: parseInt(data.muscleGroupId),
      equipmentId: parseInt(data.equipmentId),
    };

    try {
      // Call createExercise separately and wait for it to complete
      // await createExercise(newExercise);
      const response = await fetch("/api/exercises", {
        method: "POST",
        body: JSON.stringify(newExercise),
      });
      const data = await response.json();

      console.log("Exercise created successfully");
    } catch (error) {
      console.error("Error creating exercise");
    }

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
      <Dialog>
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
              name="muscleGroupId"
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
              name="equipmentId"
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
