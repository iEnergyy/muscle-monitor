import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  primaryKey,
  int,
  varchar,
  text,
  index,
  date,
  tinyint,
  datetime,
  decimal,
  time,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const equipment = mysqlTable(
  "equipment",
  {
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 255 }),
    description: text("description"),
  },
  (table) => {
    return {
      equipmentId: primaryKey(table.id),
    };
  },
);

export const exercise = mysqlTable(
  "exercise",
  {
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 255 }),
    description: text("description"),
    muscleGroupId: int("muscle_group_id"),
    equipmentId: int("equipment_id"),
  },
  (table) => {
    return {
      muscleGroupId: index("muscle_group_id").on(table.muscleGroupId),
      equipmentId: index("equipment_id").on(table.equipmentId),
      exerciseId: primaryKey(table.id),
    };
  },
);

export const muscleGroup = mysqlTable(
  "muscle_group",
  {
    id: int("id").autoincrement().notNull(),
    name: varchar("name", { length: 255 }),
    description: text("description"),
    imageUrl: varchar("imageUrl", { length: 255 }),
  },
  (table) => {
    return {
      muscleGroupId: primaryKey(table.id),
    };
  },
);

export const routine = mysqlTable(
  "routine",
  {
    id: int("id").autoincrement().notNull(),
    userId: varchar("user_id", { length: 255 }),
    name: varchar("name", { length: 255 }),
    description: text("description"),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    startDate: date("start_date", { mode: "string" }),
    // you can use { mode: 'date' }, if you want to have Date as type for this column
    endDate: date("end_date", { mode: "string" }),
    active: tinyint("active"),
  },
  (table) => {
    return {
      userId: index("user_id").on(table.userId),
      routineId: primaryKey(table.id),
    };
  },
);

export const routineWorkout = mysqlTable(
  "routine_workout",
  {
    id: int("id").autoincrement().notNull(),
    routineId: int("routine_id"),
    workoutId: int("workout_id"),
  },
  (table) => {
    return {
      routineId: index("routine_id").on(table.routineId),
      workoutId: index("workout_id").on(table.workoutId),
      routineWorkoutId: primaryKey(table.id),
    };
  },
);

export const userProgress = mysqlTable(
  "user_progress",
  {
    id: int("id").autoincrement().notNull(),
    userId: varchar("user_id", { length: 255 }),
    exerciseId: int("exercise_id"),
  },
  (table) => {
    return {
      userId: index("user_id").on(table.userId),
      exerciseId: index("exercise_id").on(table.exerciseId),
      userProgressId: primaryKey(table.id),
    };
  },
);

export const users = mysqlTable(
  "users",
  {
    id: varchar("id", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }),
    firstName: varchar("first_name", { length: 255 }),
    lastName: varchar("last_name", { length: 255 }),
  },
  (table) => {
    return {
      usersId: primaryKey(table.id),
    };
  },
);

export const workout = mysqlTable(
  "workout",
  {
    id: int("id").autoincrement().notNull(),
    userId: varchar("user_id", { length: 255 }),
    name: text("name"),
    date: datetime("date", { mode: "string" }),
    notes: text("notes"),
  },
  (table) => {
    return {
      userId: index("user_id").on(table.userId),
      workoutId: primaryKey(table.id),
    };
  },
);

export const workoutExercise = mysqlTable(
  "workout_exercise",
  {
    id: int("id").autoincrement().notNull(),
    workoutId: int("workout_id"),
    exerciseId: int("exercise_id"),
    sets: int("sets"),
    repetitions: int("repetitions"),
    weight: decimal("weight", { precision: 10, scale: 0 }),
    duration: time("duration"),
    restTime: time("rest_time"),
  },
  (table) => {
    return {
      workoutId: index("workout_id").on(table.workoutId),
      exerciseId: index("exercise_id").on(table.exerciseId),
      workoutExerciseId: primaryKey(table.id),
    };
  },
);
