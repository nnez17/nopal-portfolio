import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  try {
    const body = await request.json();

    const statusCheck = {
      id: uuidv4(),
      client_name: body.client_name,
      timestamp: new Date().toISOString(),
    };

    const db = await getDatabase();
    await db.collection("status_checks").insertOne(statusCheck);

    return NextResponse.json(statusCheck, { status: 201 });
  } catch (error) {
    console.error("Error creating status check:", error);
    return NextResponse.json(
      { error: "Failed to create status check" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await getDatabase();
    const statusChecks = await db
      .collection("status_checks")
      .find({}, { projection: { _id: 0 } })
      .limit(1000)
      .toArray();

    return NextResponse.json(statusChecks);
  } catch (error) {
    console.error("Error fetching status checks:", error);
    return NextResponse.json(
      { error: "Failed to fetch status checks" },
      { status: 500 }
    );
  }
}
