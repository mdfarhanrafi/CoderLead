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

export interface Problem{
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