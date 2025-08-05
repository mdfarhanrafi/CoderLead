import mongoose, { Schema, Document } from "mongoose";
import slugify from "slugify";
interface Example {
  input: string;
  output: string;
  explanation?: string;
}

interface Constraint {
  description: string;
}

interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface ProblemDocument extends Document {
  title: string;
  slug: string; // 👈 added here
  description: string;
  difficulty: string;
  category: string;
  tags: string[];
  examples: Example[];
  constraints: Constraint[];
  testCases: TestCase[];
  timeComplexity: string;
  spaceComplexity: string;
  hints: string[];
  followUp: string;
  inputFormat: string;
  outputFormat: string;
  functionSignature: string;
}

const ExampleSchema = new Schema<Example>(
  {
    input: String,
    output: String,
    explanation: String,
  },
  { _id: false }
);

const ConstraintSchema = new Schema<Constraint>(
  {
    description: String,
  },
  { _id: false }
);

const TestCaseSchema = new Schema<TestCase>(
  {
    input: String,
    expectedOutput: String,
    isHidden: Boolean,
  },
  { _id: false }
);

const ProblemSchema = new Schema<ProblemDocument>(
  {
    title: String,
    slug: { type: String, required: true, unique: true }, // 👈 added here
    description: String,
    difficulty: String,
    category: String,
    tags: [String],
    examples: [ExampleSchema],
    constraints: [ConstraintSchema],
    testCases: [TestCaseSchema],
    timeComplexity: String,
    spaceComplexity: String,
    hints: [String],
    followUp: String,
    inputFormat: String,
    outputFormat: String,
    functionSignature: String,
  },
  { timestamps: true }
);




export default mongoose.models.Problem || mongoose.model<ProblemDocument>("Problem", ProblemSchema);
