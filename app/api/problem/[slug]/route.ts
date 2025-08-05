
import { NextRequest,NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db/connect";
import Problem from "@/models/Problem";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  console.log("Fetching problem with slug:", slug);

  try {
    await connectToDatabase();
    const problem = await Problem.findOne({ slug }).lean();
    if (!problem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }
    return NextResponse.json(problem);
  } catch (error) {
    console.error("Error fetching problem:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

