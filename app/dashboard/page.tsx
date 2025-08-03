"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2, Save, Eye } from "lucide-react"
import axios from "axios"

interface Example {
  id: string
  input: string
  output: string
  explanation?: string
}

interface TestCase {
  id: string
  input: string
  expectedOutput: string
  isHidden: boolean
}

interface Constraint {
  id: string
  description: string
}

export default function ProblemCreator() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const [examples, setExamples] = useState<Example[]>([{ id: "1", input: "", output: "", explanation: "" }])

  const [constraints, setConstraints] = useState<Constraint[]>([{ id: "1", description: "" }])

  const [testCases, setTestCases] = useState<TestCase[]>([{ id: "1", input: "", expectedOutput: "", isHidden: false }])

  const [timeComplexity, setTimeComplexity] = useState("")
  const [spaceComplexity, setSpaceComplexity] = useState("")
  const [hints, setHints] = useState<string[]>([""])
  const [followUp, setFollowUp] = useState("")

  const [inputFormat, setInputFormat] = useState("")
  const [outputFormat, setOutputFormat] = useState("")
  const [functionSignature, setFunctionSignature] = useState("")

  const addExample = () => {
    const newExample: Example = {
      id: Date.now().toString(),
      input: "",
      output: "",
      explanation: "",
    }
    setExamples([...examples, newExample])
  }

  const removeExample = (id: string) => {
    setExamples(examples.filter((ex) => ex.id !== id))
  }

  const updateExample = (id: string, field: keyof Example, value: string) => {
    setExamples(examples.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex)))
  }

  const addConstraint = () => {
    const newConstraint: Constraint = {
      id: Date.now().toString(),
      description: "",
    }
    setConstraints([...constraints, newConstraint])
  }

  const removeConstraint = (id: string) => {
    setConstraints(constraints.filter((c) => c.id !== id))
  }

  const updateConstraint = (id: string, description: string) => {
    setConstraints(constraints.map((c) => (c.id === id ? { ...c, description } : c)))
  }

  const addTestCase = () => {
    const newTestCase: TestCase = {
      id: Date.now().toString(),
      input: "",
      expectedOutput: "",
      isHidden: false,
    }
    setTestCases([...testCases, newTestCase])
  }

  const removeTestCase = (id: string) => {
    setTestCases(testCases.filter((tc) => tc.id !== id))
  }

  const updateTestCase = (id: string, field: keyof TestCase, value: string | boolean) => {
    setTestCases(testCases.map((tc) => (tc.id === id ? { ...tc, [field]: value } : tc)))
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const addHint = () => {
    setHints([...hints, ""])
  }

  const updateHint = (index: number, value: string) => {
    const newHints = [...hints]
    newHints[index] = value
    setHints(newHints)
  }

  const removeHint = (index: number) => {
    setHints(hints.filter((_, i) => i !== index))
  }

  const handleSave = async() => {
    const problemData = {
      title,
      description,
      difficulty,
      category,
      tags,
      examples,
      constraints,
      testCases,
      timeComplexity,
      spaceComplexity,
      hints: hints.filter((h) => h.trim()),
      followUp,
      inputFormat,
      outputFormat,
      functionSignature,
    }
    try {
      const response = await axios.post("/api/problem/create", problemData)
      if (response.status === 201) {
        alert("Problem saved successfully!")
        // Reset form or redirect as needed
      } else {
        console.error("Failed to save problem:", response.data)
        alert("Failed to save problem. Please try again.")
      }
    } catch (error) {
      console.error("Error saving problem:", error)
      alert("An error occurred while saving the problem. Please try again.")
    }
  }

  // const handlePreview = () => {
  //   // Generate preview of the problem
  //   alert("Preview functionality would show how the problem appears to users")
  // }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Problem Creator</h1>
          <p className="text-muted-foreground">Create comprehensive coding problems for any platform</p>
        </div>
        <div className="flex gap-2">
          {/* <Button variant="outline" onClick={handlePreview}>
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button> */}
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Problem
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        {/* upporere tab part */}
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="constraints">Constraints</TabsTrigger>
          <TabsTrigger value="testing">Test Cases</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Problem Information</CardTitle>
              <CardDescription>Basic details about the coding problem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Problem Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Add Two Numbers"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="array">Array</SelectItem>
                      <SelectItem value="linked-list">Linked List</SelectItem>
                      <SelectItem value="tree">Tree</SelectItem>
                      <SelectItem value="graph">Graph</SelectItem>
                      <SelectItem value="dynamic-programming">Dynamic Programming</SelectItem>
                      <SelectItem value="string">String</SelectItem>
                      <SelectItem value="math">Math</SelectItem>
                      <SelectItem value="sorting">Sorting</SelectItem>
                      <SelectItem value="searching">Searching</SelectItem>
                      <SelectItem value="backtracking">Backtracking</SelectItem>
                      <SelectItem value="greedy">Greedy</SelectItem>
                      <SelectItem value="two-pointers">Two Pointers</SelectItem>
                      <SelectItem value="sliding-window">Sliding Window</SelectItem>
                      <SelectItem value="stack">Stack</SelectItem>
                      <SelectItem value="queue">Queue</SelectItem>
                      <SelectItem value="heap">Heap</SelectItem>
                      <SelectItem value="hash-table">Hash Table</SelectItem>
                      <SelectItem value="binary-search">Binary Search</SelectItem>
                      <SelectItem value="bit-manipulation">Bit Manipulation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addTag()}
                    />
                    <Button type="button" onClick={addTag}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                        {tag} ×
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Problem Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the problem in detail. Include what the function should do, input/output format, and any special conditions..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={8}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="input-format">Input Format</Label>
                  <Textarea
                    id="input-format"
                    placeholder="Describe the input format (e.g., 'Two linked lists l1 and l2')"
                    value={inputFormat}
                    onChange={(e) => setInputFormat(e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="output-format">Output Format</Label>
                  <Textarea
                    id="output-format"
                    placeholder="Describe the expected output format"
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="function-signature">Function Signature</Label>
                <Textarea
                  id="function-signature"
                  placeholder="def addTwoNumbers(l1: ListNode, l2: ListNode) -> ListNode:"
                  value={functionSignature}
                  onChange={(e) => setFunctionSignature(e.target.value)}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Examples</CardTitle>
              <CardDescription>Provide clear examples to help users understand the problem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {examples.map((example, index) => (
                <div key={example.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Example {index + 1}</h4>
                    {examples.length > 1 && (
                      <Button variant="ghost" size="sm" onClick={() => removeExample(example.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Input</Label>
                      <Textarea
                        placeholder="l1 = [2,4,3], l2 = [5,6,4]"
                        value={example.input}
                        onChange={(e) => updateExample(example.id, "input", e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Output</Label>
                      <Textarea
                        placeholder="[7,0,8]"
                        value={example.output}
                        onChange={(e) => updateExample(example.id, "output", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Explanation (Optional)</Label>
                    <Textarea
                      placeholder="Explain how the input leads to the output..."
                      value={example.explanation}
                      onChange={(e) => updateExample(example.id, "explanation", e.target.value)}
                      rows={2}
                    />
                  </div>
                </div>
              ))}

              <Button onClick={addExample} variant="outline" className="w-full bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Add Example
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="constraints" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Constraints</CardTitle>
              <CardDescription>Define the limits and constraints for the problem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {constraints.map((constraint, index) => (
                <div key={constraint.id} className="flex gap-2">
                  <Input
                    placeholder={`Constraint ${index + 1} (e.g., "1 <= n <= 100")`}
                    value={constraint.description}
                    onChange={(e) => updateConstraint(constraint.id, e.target.value)}
                  />
                  {constraints.length > 1 && (
                    <Button variant="ghost" size="sm" onClick={() => removeConstraint(constraint.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}

              <Button onClick={addConstraint} variant="outline" className="w-full bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Add Constraint
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Test Cases</CardTitle>
              <CardDescription>Create test cases to validate solutions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {testCases.map((testCase, index) => (
                <div key={testCase.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Test Case {index + 1}</h4>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={testCase.isHidden}
                          onChange={(e) => updateTestCase(testCase.id, "isHidden", e.target.checked)}
                        />
                        Hidden
                      </label>
                      {testCases.length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => removeTestCase(testCase.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Input</Label>
                      <Textarea
                        placeholder="Test input..."
                        value={testCase.input}
                        onChange={(e) => updateTestCase(testCase.id, "input", e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Expected Output</Label>
                      <Textarea
                        placeholder="Expected output..."
                        value={testCase.expectedOutput}
                        onChange={(e) => updateTestCase(testCase.id, "expectedOutput", e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button onClick={addTestCase} variant="outline" className="w-full bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Add Test Case
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>Additional information and hints for the problem</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="time-complexity">Time Complexity</Label>
                  <Input
                    id="time-complexity"
                    placeholder="O(n)"
                    value={timeComplexity}
                    onChange={(e) => setTimeComplexity(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="space-complexity">Space Complexity</Label>
                  <Input
                    id="space-complexity"
                    placeholder="O(1)"
                    value={spaceComplexity}
                    onChange={(e) => setSpaceComplexity(e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Hints</Label>
                {hints.map((hint, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Hint ${index + 1}`}
                      value={hint}
                      onChange={(e) => updateHint(index, e.target.value)}
                    />
                    {hints.length > 1 && (
                      <Button variant="ghost" size="sm" onClick={() => removeHint(index)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button onClick={addHint} variant="outline" className="w-full bg-transparent">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Hint
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="follow-up">Follow-up Questions</Label>
                <Textarea
                  id="follow-up"
                  placeholder="What if the input is very large? Can you solve it in O(1) space?"
                  value={followUp}
                  onChange={(e) => setFollowUp(e.target.value)}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
