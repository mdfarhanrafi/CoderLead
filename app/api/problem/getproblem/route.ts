import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/db/connect"; // Import the database connection function
import ProblemModel from "@/models/Problem"; // Import the Problem model

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(req.url)

    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const difficulty = searchParams.get("difficulty")
    const category = searchParams.get("category")

    const query: any = {}
    if (difficulty && difficulty !== "all") query.difficulty = difficulty
    if (category && category !== "all") query.category = category

    const total = await ProblemModel.countDocuments(query)
    const problems = await ProblemModel.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select("title slug difficulty category tags stats")

    return NextResponse.json({
      problems,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    })
  } catch (error) {
    console.error("Error fetching problems:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
