"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import ProblemClientView from "../../../components/problemui"
import type {ProblemDocument} from "@/models/Problem"
export default function ProblemPage() {
  const params = useParams()
  const [problem, setProblem] = useState<ProblemDocument | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const fetchProblem = async () => {
      if (!params.slug) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/problem/${params.slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setProblem(null);
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return;
        }
        
        const data = await response.json();
        console.log("API response:", data);
        setProblem(data);
        
      } catch (error) {
        console.error("Error fetching problem:", error);
        setError(error instanceof Error ? error.message : 'Failed to fetch problem');
      } finally {
        setLoading(false);
      }
    }
  useEffect(() => {
    fetchProblem();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <h2 className="text-xl font-semibold text-gray-700 mt-4">Loading problem...</h2>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600">Error</h1>
          <p className="text-gray-700 mt-2">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }



  
  if (!problem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold text-gray-700">Problem not found</h1>
      </div>
    )
  }

  return <ProblemClientView problem={problem} />
}
