import { Save } from 'lucide-react';
import { connectToDatabase } from "@/lib/db/connect";
import { NextResponse,NextRequest } from "next/server";
import Problem from "@/models/Problem";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()
    const body = await request.json();
   

    
   const createdProblem = await Problem.create(body);
  
    return NextResponse.json(
      { message: "Problem created successfully", problem: createdProblem },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating problem:", error);
    return NextResponse.json({ error: "Failed to create problem" }, { status: 500 });
  }
}