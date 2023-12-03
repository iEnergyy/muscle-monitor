import { db } from "@/db/config";
import { equipment, exercise } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export type Equipment = InferSelectModel<typeof equipment>;

export const getAllEquipment: Equipment[] = await db.select().from(equipment);
