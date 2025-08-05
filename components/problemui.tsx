"use client"
import { ProblemDocument } from "@/models/Problem";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Play,
  Send,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Share2,
  Lightbulb,
  MessageSquare,
  Code,
  CheckCircle,
  XCircle,
} from "lucide-react"



export default function ProblemClientView({ problem }: { problem: ProblemDocument }) {
   
  // console.log("Problem data:", problem) 
  const [selectedLanguage, setSelectedLanguage] = useState("python")
  const [code, setCode] = useState(() => {
    // Initialize code based on problem's function signature or a default template
    if (problem.functionSignature) {
      return problem.functionSignature
    }
    // Fallback to a generic template if no specific signature is provided
    switch (selectedLanguage) {
      case "python":
        return `def ${problem.title.replace(/\s/g, "")}(${problem.inputFormat.split(" and ").join(", ")}):\n    # Write your solution here\n    pass`
      case "javascript":
        return `/**\n * @param {any} ${problem.inputFormat.split(" and ").join("\n * @param {any} ")}\n * @return {any}\n */\nvar ${problem.title.replace(/\s/g, "")} = function(${problem.inputFormat.split(" and ").join(", ")}) {\n    // Write your solution here\n};\n`
      case "java":
        return `class Solution {\n    public ${problem.outputFormat.replace("a floating number indicate median", "double")} ${problem.title.replace(/\s/g, "")}(${problem.inputFormat
          .split(" and ")
          .map((f) => `int[] ${f}`)
          .join(", ")}) {\n        // Write your solution here\n        return 0;\n    }\n}`
      case "cpp":
        return `class Solution {\npublic:\n    ${problem.outputFormat.replace("a floating number indicate median", "double")} ${problem.title.replace(/\s/g, "")}(${problem.inputFormat
          .split(" and ")
          .map((f) => `vector<int>& ${f}`)
          .join(", ")}) {\n        // Write your solution here\n        return 0;\n    }\n};\n`
      default:
        return ""
    }
  })
  const [showHints, setShowHints] = useState(false) // This state is not used in the current UI, but kept for potential future use
  const [testResults, setTestResults] = useState<any[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState("description")

  const handleRunCode = () => {
    setIsRunning(true)
    // Simulate running code against the problem's test cases
    setTimeout(() => {
      const simulatedResults = problem.testCases.map((tc) => ({
        input: tc.input,
        expected: tc.expectedOutput,
        actual: tc.expectedOutput, // For simulation, actual matches expected
        passed: true, // For simulation, all pass
      }))
      setTestResults(simulatedResults)
      setIsRunning(false)
    }, 2000)
  }

  const handleSubmit = () => {
    alert("Solution submitted! This would typically run against all test cases.")
  }

  const languageTemplates = {
    python: `def ${problem.title.replace(/\s/g, "")}(${problem.inputFormat.split(" and ").join(", ")}):\n    # Write your solution here\n    pass`,
    javascript: `/**\n * @param {any} ${problem.inputFormat.split(" and ").join("\n * @param {any} ")}\n * @return {any}\n */\nvar ${problem.title.replace(/\s/g, "")} = function(${problem.inputFormat.split(" and ").join(", ")}) {\n    // Write your solution here\n};\n`,
    java: `class Solution {\n    public ${problem.outputFormat.replace("a floating number indicate median", "double")} ${problem.title.replace(/\s/g, "")}(${problem.inputFormat
      .split(" and ")
      .map((f) => `int[] ${f}`)
      .join(", ")}) {\n        // Write your solution here\n        return 0;\n    }\n}`,
    cpp: `class Solution {\npublic:\n    ${problem.outputFormat.replace("a floating number indicate median", "double")} ${problem.title.replace(/\s/g, "")}(${problem.inputFormat
      .split(" and ")
      .map((f) => `vector<int>& ${f}`)
      .join(", ")}) {\n        // Write your solution here\n        return 0;\n    }\n};\n`,
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    setCode(languageTemplates[language as keyof typeof languageTemplates])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">{problem.title}</h1>
              <Badge
                variant={
                  problem.difficulty === "hard"
                    ? "destructive"
                    : problem.difficulty === "medium"
                      ? "secondary"
                      : "default"
                }
              >
                {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <ThumbsUp className="w-4 h-4 mr-1" /> 1.2k
              </Button>
              <Button variant="ghost" size="sm">
                <ThumbsDown className="w-4 h-4 mr-1" /> 89
              </Button>
              <Button variant="ghost" size="sm">
                <Bookmark className="w-4 h-4 mr-1" /> Save
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4 mr-1" /> Share
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Problem Description */}
          <div className="space-y-6">
            {/* Problem Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="hints">Hints</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
                <TabsTrigger value="solutions">Solutions</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      {problem.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Problem Description */}
                    <div className="prose max-w-none">
                      <p>{problem.description}</p>
                    </div>
                    <Separator />
                    {/* Examples */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Examples</h3>
                      {problem.examples.map((example, index) => (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2">Example {index + 1}:</h4>
                          <div className="space-y-2 font-mono text-sm">
                            <div>
                              <strong>Input:</strong> {example.input}
                            </div>
                            <div>
                              <strong>Output:</strong> {example.output}
                            </div>
                            {example.explanation && (
                              <div className="text-gray-600">
                                <strong>Explanation:</strong> {example.explanation}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator />
                    {/* Constraints */}
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">Constraints</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm font-mono">
                        {problem.constraints.map((constraint, index) => (
                          <li key={index}> {constraint.description} </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="hints" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" /> Hints
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {problem.hints.length > 0 ? (
                      <div className="space-y-3">
                        {problem.hints.map((hint, index) => (
                          <div key={index} className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                            <p className="text-sm">
                              <strong>Hint {index + 1}:</strong> {hint}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500">No hints available for this problem.</div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="discussion" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" /> Discussion (234)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {" "}
                            A{" "}
                          </div>
                          <span className="font-semibold">AlgoMaster</span>{" "}
                          <span className="text-sm text-gray-500">2 hours ago</span>
                        </div>
                        <p className="text-sm">
                          {" "}
                          Great problem! The key insight is to realize that we need to check if the combined frequency
                          of elements allows for equal distribution.{" "}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="w-3 h-3 mr-1" /> 12
                          </Button>
                          <Button variant="ghost" size="sm">
                            {" "}
                            Reply{" "}
                          </Button>
                        </div>
                      </div>
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {" "}
                            C{" "}
                          </div>
                          <span className="font-semibold">CodeNinja</span>{" "}
                          <span className="text-sm text-gray-500">5 hours ago</span>
                        </div>
                        <p className="text-sm">
                          {" "}
                          I'm getting TLE on large test cases. Any suggestions for optimization?{" "}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="w-3 h-3 mr-1" />8
                          </Button>
                          <Button variant="ghost" size="sm">
                            {" "}
                            Reply{" "}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="solutions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5" /> Solutions
                    </CardTitle>
                    <CardDescription>
                      {" "}
                      Premium feature - Unlock to see detailed solutions and explanations{" "}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Code className="w-8 h-8 text-yellow-600" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Premium Solutions Available</h3>
                      <p className="text-gray-600 mb-4">
                        {" "}
                        Get access to multiple solution approaches with detailed explanations{" "}
                      </p>
                      <Button>Upgrade to Premium</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          {/* Right Panel - Code Editor */}
          <div className="space-y-4">
            {/* Language Selector and Actions */}
            <div className="flex items-center justify-between">
              <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleRunCode} disabled={isRunning}>
                  <Play className="w-4 h-4 mr-2" /> {isRunning ? "Running..." : "Run"}
                </Button>
                <Button onClick={handleSubmit}>
                  <Send className="w-4 h-4 mr-2" /> Submit
                </Button>
              </div>
            </div>
            {/* Code Editor */}
            <Card>
              <CardContent className="p-0">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="min-h-[400px] font-mono text-sm border-0 resize-none focus:ring-0"
                  placeholder="Write your solution here..."
                />
              </CardContent>
            </Card>
            {/* Test Results */}
            {testResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Test Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {testResults.map((result, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                      {result.passed ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                      )}
                      <div className="flex-1 space-y-1">
                        <div className="text-sm font-mono">
                          <strong>Input:</strong> {result.input}
                        </div>
                        <div className="text-sm font-mono">
                          <strong>Expected:</strong> {result.expected}
                        </div>
                        <div className="text-sm font-mono">
                          <strong>Actual:</strong> {result.actual}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="text-center pt-2">
                    <Badge variant={testResults.every((r) => r.passed) ? "default" : "destructive"}>
                      {testResults.filter((r) => r.passed).length}/{testResults.length} Passed
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}
            {/* Custom Test Case */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Custom Test Case</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium">Input:</label>
                  <Textarea
                    placeholder={`Example: ${problem.examples[0]?.input || ""}`}
                    className="mt-1 font-mono text-sm"
                    rows={3}
                  />
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Play className="w-4 h-4 mr-2" /> Run Custom Test
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
