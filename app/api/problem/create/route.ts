import { NextResponse,NextRequest } from "next/server";


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Received body:", body);

    // Here you would typically handle the creation of a problem
    // For example, save it to a database or perform some business logic

    // Simulating a successful response
    return NextResponse.json({ message: "Problem created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating problem:", error);
    return NextResponse.json({ error: "Failed to create problem" }, { status: 500 });
  }
}