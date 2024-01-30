import { NextResponse, NextRequest } from "next/server";

import { Equipment, getAllEquipment } from "@/services/equipment-service";

export async function GET(request: NextRequest) {
  const allEquipment: Equipment[] = getAllEquipment;
  return NextResponse.json(allEquipment);
}
