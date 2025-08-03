"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DataTablePagination } from "@/components/data-table-pagination"
import { Loader2 } from "lucide-react"

interface Problem {
  _id: string
  title: string
  slug: string
  difficulty: "easy" | "medium" | "hard"
  category: string
  tags: string[]
  stats: {
    acceptanceRate: number
  }
}

export default function ProblemsList() {
  const [problems, setProblems] = useState<Problem[]>([])
  const [loading, setLoading] = useState(true)
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [pageCount, setPageCount] = useState(0)
  const [totalProblems, setTotalProblems] = useState(0)
  const [difficultyFilter, setDifficultyFilter] = useState<string | undefined>(undefined)
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState("") // Not yet implemented in API

  const fetchProblems = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: (pageIndex + 1).toString(),
        limit: pageSize.toString(),
      })
      if (difficultyFilter) params.append("difficulty", difficultyFilter)
      if (categoryFilter) params.append("category", categoryFilter)
      // if (searchQuery) params.append("search", searchQuery); // Add this when API supports search

      const response = await fetch(`/api/problem?${params.toString()}`)
      const data = await response.json()

      if (response.ok) {
        setProblems(data.problems)
        setPageCount(data.totalPages)
        setTotalProblems(data.total)
      } else {
        console.error("Failed to fetch problems:", data.error)
        setProblems([])
        setPageCount(0)
        setTotalProblems(0)
      }
    } catch (error) {
      console.error("Network error fetching problems:", error)
      setProblems([])
      setPageCount(0)
      setTotalProblems(0)
    } finally {
      setLoading(false)
    }
  }, [pageIndex, pageSize, difficultyFilter, categoryFilter]) // Add searchQuery when implemented

  useEffect(() => {
    fetchProblems()
  }, [fetchProblems])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "hard":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">All Problems</h1>
      <p className="text-muted-foreground">Browse and solve coding challenges.</p>

      {/* Filters and Search */}
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder="Search problems..."
          className="max-w-sm flex-1"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          // Add onKeyPress or a search button to trigger fetch when API supports search
        />
        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="array">Array</SelectItem>
            <SelectItem value="linked-list">Linked List</SelectItem>
            <SelectItem value="tree">Tree</SelectItem>
            <SelectItem value="graph">Graph</SelectItem>
            <SelectItem value="dynamic-programming">Dynamic Programming</SelectItem>
            <SelectItem value="string">String</SelectItem>
            <SelectItem value="math">Math</SelectItem>
            {/* Add more categories from your Problem model enum */}
          </SelectContent>
        </Select>
        {(difficultyFilter || categoryFilter || searchQuery) && (
          <Button
            variant="outline"
            onClick={() => {
              setDifficultyFilter(undefined)
              setCategoryFilter(undefined)
              setSearchQuery("")
              setPageIndex(0) // Reset page when clearing filters
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Problem List ({totalProblems} problems)</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
              <span className="ml-2 text-gray-500">Loading problems...</span>
            </div>
          ) : problems.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">No problems found matching your criteria.</div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Status</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="w-[120px]">Difficulty</TableHead>
                    <TableHead className="w-[150px]">Category</TableHead>
                    <TableHead className="w-[120px] text-right">Acceptance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {problems.map((problem) => (
                    <TableRow key={problem._id}>
                      <TableCell>
                        {/* Placeholder for status - would depend on user's submission history */}
                        <Badge variant="secondary">?</Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        <Link href={`/problems/${problem.slug}`} className="hover:underline text-blue-600">
                          {problem.title}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className={`font-semibold ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell>{problem.category}</TableCell>
                      <TableCell className="text-right">{problem.stats.acceptanceRate}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination Controls */}
      {!loading && problems.length > 0 && (
        <DataTablePagination
          pageIndex={pageIndex}
          pageSize={pageSize}
          pageCount={pageCount}
          canPreviousPage={pageIndex > 0}
          canNextPage={pageIndex < pageCount - 1}
          setPageIndex={setPageIndex}
          setPageSize={setPageSize}
        />
      )}
    </div>
  )
}
